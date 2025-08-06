import io
import traceback
from typing import List

from PIL import Image
from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.gzip import GZipMiddleware

from inferserver.utils.tools import config_loader, get_logger
from inferserver.utils.utils import init_ocr_model

ocr_app = FastAPI()
ocr_app.add_middleware(GZipMiddleware, minimum_size=5000)
config = config_loader("configs/common.json")
ocr_models = init_ocr_model(config["service"]["ocr_model"])
log = get_logger(config["basic"]["log_level"])


@ocr_app.post("/")
def main(files: List[UploadFile]):
    if not "rapid_ocr" in ocr_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")
    this_model = ocr_models["rapid_ocr"]["model"]

    images = []
    for file in files:
        contents = file.file.read()
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        images.append(image)

    try:
        return this_model.generate(images)
    except Exception as e:
        log.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=503, detail=f"Exception: {e}")
