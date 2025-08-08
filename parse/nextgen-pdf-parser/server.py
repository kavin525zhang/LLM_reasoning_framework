import shutil
import threading
from contextlib import asynccontextmanager
from multiprocessing.managers import SyncManager, DictProxy

import uvicorn
from fastapi import FastAPI, UploadFile
from starlette.middleware.gzip import GZipMiddleware
from starlette.responses import FileResponse

from dots_ocr.model.inference import inference_with_vllm
from dots_ocr.utils import dict_promptmode_to_prompt
from dots_ocr.utils.consts import MIN_PIXELS, MAX_PIXELS
from dots_ocr.utils.image_utils import fetch_image
from dots_ocr.utils.layout_utils import pre_process_bboxes, post_process_output

import sys
import uuid
from loguru import logger

from PIL import Image
import numpy as np
import os
import json

save_dir = "./tmp"

prompt_name = "prompt_layout_all_en"
model_url = "http://172.17.124.33:18090/v1"
temperature = 0.1
top_p = 1.0
dpi = 200
max_completion_tokens = 16384
num_workers = 64

import multiprocessing
import fitz
import time
import xxhash
import struct
from multiprocessing import shared_memory, Queue

SHARED_MEM_POOL_SIZE = num_workers + 16

# 4500x4500 pixels * 3 (RGB) = 60,750,000 bytes ≈ 60 MB
MAX_IMAGE_BYTES = 4500 * 4500 * 3

# 头部结构:  4个整数 (请求uuid,页码, 宽, 高, 实际图片数据长度)
#  '16s' for 16 bytes id , ,'i' is 4 bytes for integer. Total 16+ 4*4= 32 bytes.
HEADER_FORMAT = "16sIIII"
HEADER_SIZE = struct.calcsize(HEADER_FORMAT)

# 每个共享内存块的总大小
SHARED_MEM_BLOCK_SIZE = HEADER_SIZE + MAX_IMAGE_BYTES

# 启动时清理泄露的共享内存， 以 ocr_shm_ 开头的共享内存块 都需要被清理

SHM_PREFIX = "ocr_shm_"
# 在 Linux 和其他 POSIX 系统上，共享内存通常位于此目录
SHM_DIRECTORY = "/dev/shm"

# 全局状态，将在 startup 事件中初始化

manager: SyncManager = None
task_queue: Queue = None
free_queue: Queue = None
results_map: DictProxy = None  # 用于路由结果
worker_processes = []
shm_pool = []


def cleanup_stale_shm_by_prefix():
    """
    通过扫描 /dev/shm 目录，清理所有以特定前缀开头的、
    可能由旧进程残留下的共享内存块。
    这个函数应该在程序启动时调用。
    """
    logger.info("Performing startup cleanup for stale shared memory...")

    # 检查 /dev/shm 目录是否存在
    if not os.path.isdir(SHM_DIRECTORY):
        logger.warning(f"Warning: Shared memory directory '{SHM_DIRECTORY}' not found. "
                       "Cleanup skipped. This is normal on non-POSIX systems.", file=sys.stderr)
        return
    # 遍历目录中的所有文件
    try:
        for filename in os.listdir(SHM_DIRECTORY):
            if filename.startswith(SHM_PREFIX):
                shm_name = filename
                logger.info(f"Found stale shared memory: {shm_name}. Attempting to clean up.")
                try:
                    # 获取一个现有共享内存的实例，然后立即 unlink 它
                    # 注意：这里我们不需要知道它的大小
                    temp_shm = shared_memory.SharedMemory(name=shm_name)
                    temp_shm.unlink()  # 请求系统删除这个共享内存块
                    temp_shm.close()  # 关闭我们的句柄
                    logger.info(f"Successfully unlinked {shm_name}.")
                except FileNotFoundError:
                    # 这是可能的竞争条件：另一个进程可能在你找到它和尝试 unlink 之间已经删除了它
                    logger.info(f"Shared memory {shm_name} was already removed by another process.")
                except Exception as e:
                    # 捕获其他可能的错误，例如权限问题
                    logger.error(f"Error cleaning up {shm_name}: {e}", file=sys.stderr)
    except OSError as e:
        logger.error(f"Error accessing directory {SHM_DIRECTORY}: {e}", file=sys.stderr)


def fitz_page_to_image_data(page, target_dpi=200):
    """
    Converts a fitz.Page to raw image data (samples, width, height).
    This is more efficient as it avoids creating a PIL Image object in the producer.
    """
    mat = fitz.Matrix(target_dpi / 72, target_dpi / 72)
    pm = page.get_pixmap(matrix=mat, alpha=False)

    # 如果图像过大，回退到默认DPI
    if pm.width > 4500 or pm.height > 4500:
        mat = fitz.Matrix(1, 1)  # use fitz default dpi
        pm = page.get_pixmap(matrix=mat, alpha=False)

    return pm.samples, pm.width, pm.height


def get_prompt(prompt_mode, bbox=None, origin_image=None, image=None, min_pixels=None, max_pixels=None):
    prompt = dict_promptmode_to_prompt[prompt_mode]
    if prompt_mode == 'prompt_grounding_ocr':
        assert bbox is not None
        bboxes = [bbox]
        bbox = pre_process_bboxes(origin_image, bboxes, input_width=image.width, input_height=image.height,
                                  min_pixels=min_pixels, max_pixels=max_pixels)[0]
        prompt = prompt + str(bbox)
    return prompt


def worker(worker_id, task_queue, results_map, free_queue):
    logger.info(f"[worker {worker_id}] Started")
    while True:
        try:
            # 1. 从task_queue获取一个任务
            shm_name = task_queue.get()
            # 2. 检查是否为结束信号
            if shm_name is None:
                break
            # 3. 连接到共享内存
            shm = shared_memory.SharedMemory(name=shm_name)
            # 4. 读取并解包头部
            header_bytes = shm.buf[:HEADER_SIZE]
            request_id_bytes, page_idx, width, height, image_size = struct.unpack(HEADER_FORMAT, header_bytes)

            request_id = request_id_bytes.decode('ascii').strip('\x00')
            result_queue = results_map[request_id]
            res_dir = f"{save_dir}/{request_id}"

            # 5. 读取图片数据并重建PIL Image对象
            image_bytes = shm.buf[HEADER_SIZE: HEADER_SIZE + image_size]
            origin_image = Image.frombytes("RGB", (width, height), bytes(image_bytes))

            logger.info(f"[worker {worker_id}] Processing page {page_idx} of req: {request_id}")

            # 预处理
            image = fetch_image(origin_image, min_pixels=MIN_PIXELS, max_pixels=MAX_PIXELS)
            prompt = get_prompt(prompt_name)

            response = inference_with_vllm(image, prompt, model_url=model_url,
                                           model_name="model",
                                           max_completion_tokens=max_completion_tokens,
                                           temperature=temperature, top_p=top_p)

            del image_bytes, header_bytes

            cells, filled = post_process_output(
                response,
                prompt_name,
                origin_image,
                image,
                min_pixels=MIN_PIXELS,
                max_pixels=MAX_PIXELS,
            )

            content_list = []

            if filled:
                # 再请求一次 vllm ，重新生成
                task_queue.put(shm_name)
            else:
                captions = [cell for cell in cells if cell['category'] == 'Caption']

                # find_caption for image or table
                def find_caption(idx):
                    if idx + 1 < len(cells) and cells[idx + 1]['category'] == 'Caption':
                        return cells[idx + 1]['text']
                    elif len(captions) >= 1:  # find nearest caption
                        cap_idx = np.argmin(
                            np.sum(np.power(np.array([cell['bbox'][:2] for cell in captions]) - (x1, y1), 2), 1))
                        return captions[cap_idx]['text']
                    else:  # caption  not found
                        return ""

                for idx, cell in enumerate(cells):
                    x1, y1, x2, y2 = cell['bbox']
                    if cell['category'] == 'Picture':
                        image_crop = image.crop((x1, y1, x2, y2))
                        img_hash = xxhash.xxh64(image_crop.tobytes()).hexdigest()
                        img_path = f"images/{img_hash}.jpg"
                        image_crop.save(os.path.join(res_dir, img_path))
                        img_content = {"type": "image", "page_idx": page_idx, "img_path": img_path,
                                       'img_caption': find_caption(idx)}
                        content_list.append(img_content)
                    elif cell['category'] == 'Table':
                        image_crop = image.crop((x1, y1, x2, y2))
                        img_hash = xxhash.xxh64(image_crop.tobytes()).hexdigest()
                        img_path = f"images/{img_hash}.jpg"
                        image_crop.save(os.path.join(res_dir, img_path))
                        tbl_content = {"type": "table", "page_idx": page_idx, "img_path": img_path,
                                       "table_caption": find_caption(idx), "table_body": cell["text"]}
                        content_list.append(tbl_content)

                    elif cell['category'] == 'Formula':
                        content_list.append(
                            {"type": "equation", "text": cell['text'], "text_format": "latex", "page_idx": page_idx})
                    elif cell['category'] == 'Text' or cell['category'] == 'List-item':
                        content_list.append(
                            {"type": "text", "text": cell['text'], "page_idx": page_idx})
                    elif cell['category'] == 'Title':
                        content_list.append(
                            {"type": "text", "text_level": 1, "text": cell['text'], "page_idx": page_idx})
                    elif cell['category'] == 'Section-header':
                        content_list.append(
                            {"type": "text", "text_level": 2, "text": cell['text'], "page_idx": page_idx})
                    elif cell['category'] == 'Caption' or cell['category'] == 'Page-footer' or cell[
                        'category'] == 'Page-header':
                        # skip
                        pass

                result_queue.put(content_list)
                free_queue.put(shm_name)
            shm.close()
        except Exception as e:
            # 任务异常推出,重新release task
            if 'shm_name' in locals() and shm_name is not None:
                task_queue.put(shm_name)

            logger.warning(f"[worker {worker_id}] An error occurred: {e}, retrying...")
            # 7. 关闭共享内存连接
            if 'shm' in locals() and shm:
                shm.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    cleanup_stale_shm_by_prefix()
    global manager, task_queue, free_queue, results_map, shm_pool, worker_processes
    # 初始化多进程管理器和队列
    manager = multiprocessing.Manager()
    task_queue = manager.Queue()
    free_queue = manager.Queue()
    results_map = manager.dict()

    # 创建共享内存池
    logger.info(f"Creating a pool of {SHARED_MEM_POOL_SIZE} shared memory blocks...")
    for i in range(SHARED_MEM_POOL_SIZE):
        try:
            shm = shared_memory.SharedMemory(create=True, size=SHARED_MEM_BLOCK_SIZE,
                                             name=f"{SHM_PREFIX}{uuid.uuid4().hex}")
            shm_pool.append(shm)
            free_queue.put(shm.name)
        except Exception as e:
            logger.error(f"Failed to create shared memory block {i}: {e}", file=sys.stderr)
    logger.info(f"Shared memory pool created with {free_queue.qsize()} blocks.")

    # 创建并启动工作进程
    logger.info(f"Starting {num_workers} worker processes...")
    worker_processes = [
        multiprocessing.Process(
            target=worker,
            args=(i, task_queue, results_map, free_queue)
        )
        for i in range(num_workers)
    ]
    for w in worker_processes:
        w.start()
    # 清理和创建结果目录
    os.makedirs(save_dir, exist_ok=True)
    logger.info("--- Server Ready ---")

    yield  # 应用在此处运行

    # --- 在 yield 之后是关闭逻辑 (等同于 @app.on_event("shutdown")) ---
    logger.info("--- Server Shutting Down (via lifespan) ---")
    logger.info("Sending stop signals to workers...")
    for _ in worker_processes:
        task_queue.put(None)

    logger.info("Waiting for workers to terminate...")
    for w in worker_processes:
        w.join(timeout=5)
        if w.is_alive():
            logger.info(f"Worker {w.pid} did not terminate, forcing termination.")
            w.terminate()

    logger.info("Cleaning up shared memory pool...")
    for shm in shm_pool:
        try:
            shm.close()
            shm.unlink()
        except Exception as e:
            logger.error(f"Error cleaning up shm {shm.name}: {e}", file=sys.stderr)

    if manager:
        logger.info("Shutting down multiprocessing manager...")
        manager.shutdown()
        # 等待管理器进程完全关闭
        # 这在某些情况下可以防止关闭时的资源泄漏警告
        time.sleep(1)
    logger.info("--- Shutdown Complete ---")


app = FastAPI(title="next-gen pdf parser service", lifespan=lifespan)
app.add_middleware(GZipMiddleware, minimum_size=5000)

mutex = threading.Lock()

request_event = {}


@app.post("/worker")
def parser_server(file: UploadFile, debug: bool = False):
    global request_event, mutex
    requested_file = file.file.read()
    request_id = xxhash.xxh64(requested_file).hexdigest()
    pdf_path = f"{save_dir}/{request_id}.pdf"
    zip_path = f"{save_dir}/{request_id}.zip"

    if os.path.exists(zip_path):
        logger.info(f"Request {request_id}: Found cached ZIP file. Returning directly.")
        return FileResponse(path=zip_path, filename=f"{request_id}.zip", media_type='application/octet-stream')
    is_first_request = False
    with mutex:
        if request_id in request_event:
            event = request_event[request_id]
        else:
            event = threading.Event()
            request_event[request_id] = event
            is_first_request = True

    if not is_first_request:
        logger.info(f"Request {request_id}: Another request is processing this file. Waiting for completion...")
        event.wait()
        return FileResponse(path=zip_path, filename=f"{request_id}.zip", media_type='application/octet-stream')
    else:
        try:
            request_res_dir = os.path.join(save_dir, request_id)
            with mutex:
                if not os.path.exists(pdf_path):
                    with open(pdf_path, "wb") as f:
                        f.write(requested_file)

            os.makedirs(os.path.join(request_res_dir, "images"), exist_ok=True)

            results_map[request_id] = manager.Queue()

            with fitz.open(pdf_path) as doc:
                request_id_bytes = request_id.encode('ascii')
                pdf_page_num = doc.page_count
                for page_num in range(pdf_page_num):
                    # 1. 从free_queue获取一个可用的共享内存块名称
                    shm_name = free_queue.get()
                    # 2. 连接到这个共享内存块
                    shm = shared_memory.SharedMemory(name=shm_name)
                    # 3. 生成图片数据
                    page = doc.load_page(page_num)
                    image_bytes, width, height = fitz_page_to_image_data(page)
                    image_size = len(image_bytes)
                    logger.info(
                        f"[request {request_id}] Processing Page {page_num + 1}/{len(doc)}, Image size: {width}x{height}")
                    # 4. 打包头部并写入共享内存
                    header = struct.pack(HEADER_FORMAT, request_id_bytes, page_num, width, height, image_size)
                    shm.buf[:HEADER_SIZE] = header
                    # 5. 写入实际的图片字节数据
                    shm.buf[HEADER_SIZE: HEADER_SIZE + image_size] = image_bytes
                    # 6. 将任务（共享内存块名称）放入task_queue
                    task_queue.put(shm_name)
                    shm.close()

                content_list = []

                # 合并各个 worker 返回的结果
                for _ in range(pdf_page_num):
                    tmp_content_list = results_map[request_id].get()
                    content_list.extend(tmp_content_list)
                content_list.sort(key=lambda x: x["page_idx"])
                with open(os.path.join(request_res_dir, "content_list.json"), "w", encoding="utf-8") as f:
                    f.write(json.dumps(content_list, ensure_ascii=False))

            shutil.make_archive(f"{save_dir}/{request_id}", 'zip', request_res_dir)
            shutil.rmtree(request_res_dir)

            del results_map[request_id]
            return FileResponse(path=f"{save_dir}/{request_id}.zip",
                                filename=f"{request_id}.zip",
                                media_type='application/octet-stream')
        finally:
            # 通知其他等待的请求，并清理状态
            with mutex:
                if request_id in request_event:
                    request_event[request_id].set()
                    time.sleep(0.1)
                    del request_event[request_id]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9001, workers=1)
