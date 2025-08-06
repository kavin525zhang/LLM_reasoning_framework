import threading
from typing import List
from pathlib import Path

from PIL.Image import Image
from rapidocr import RapidOCR
from rapidocr.inference_engine.base import InferSession

from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])


class OcrModelService:

    def __init__(self,
                 batch_size: int,
                 device: str) -> None:
        log.info(f"Start init OCR engine")
        self.lock = threading.Lock()
        self.engine = RapidOCR(params={
            "EngineConfig.onnxrunime.use_cuda": device.startswith("cuda"),
            "EngineConfig.onnxrunime.gpu_id": 0,
            "Rec.rec_batch_num": 6,
        })
        log.info(f"Init OCR engine done.")

    def generate(self, query: List[Image]) -> List[dict]:
        ret = []
        for i in query:
            with self.lock:
                result = self.engine(i)
                result = [
                    [box.tolist(), text, score]
                    for box, text, score in zip(result.boxes, result.txts, result.scores)
                ] if result.boxes.any() else None

                if not result:
                    continue
                for j in range(len(result)):
                    result[j][2] = float(result[j][2])
            ret.append(result)
        if len(ret) == 0:
            ret.append(None)
        return ret
