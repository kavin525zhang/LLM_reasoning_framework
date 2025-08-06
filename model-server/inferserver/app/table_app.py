import io
import traceback
from typing import List, Any

from PIL import Image
from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.gzip import GZipMiddleware

from inferserver.server.table_model import TableModelService
from inferserver.utils.tools import config_loader, get_logger

def init_table_model(config: dict) -> dict[Any, Any]:
    res = {}
    for model_name, model_config in config.items():
        res[model_name] = {
            "model": TableModelService(model_config["device"])
        }
    return res

table_app = FastAPI()
table_app.add_middleware(GZipMiddleware, minimum_size=5000)
config = config_loader("configs/common.json")
table_models = init_table_model(config["service"]["table_model"])
log = get_logger(config["basic"]["log_level"])


@table_app.post("/")
def main(files: List[UploadFile]):
    if not "rapid_table" in table_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")
    this_model = table_models["rapid_table"]["model"]

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
