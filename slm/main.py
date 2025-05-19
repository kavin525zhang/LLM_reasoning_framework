import argparse
from contextlib import asynccontextmanager

import torch
import uvicorn
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    torch.cuda.empty_cache()


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return "Infinity model server (beta 0.3.0)"


if __name__ == "__main__":
    from inferserver.utils.tools import config_loader, get_logger
    
    config = config_loader("configs/common.json")
    log = get_logger(config["basic"]["log_level"])
    
    if services := config.get("service", None):
        if services.get("embedding_model", None):
            from inferserver.app.embedding_app import embedding_app
            app.mount("/embedding", embedding_app)
            log.info("Embedding service enabled at: '/embedding'")
        if services.get("rerank_model", None):
            from inferserver.app.reranker_app import reranker_app
            app.mount("/rerank", reranker_app)
            log.info("Rerank service enabled at: '/rerank'")
        if services.get("mdid_model", None):
            from inferserver.app.mdid_app import mdid_app
            app.mount("/id", mdid_app)
            log.info("MDID service enabled at: '/id'")
        if services.get("ocr_model", None):
            from inferserver.app.ocr_app import ocr_app
            app.mount("/ocr", ocr_app)
            log.info("OCR service enabled at: '/ocr'")
        if services.get("table_model", None):
            from inferserver.app.table_app import table_app
            app.mount("/table", table_app)
            log.info("Table OCR service enabled at: '/table'")
    
    if integrations := config.get("integration", None):
        if integrations.get("xinference", False):
            from inferserver.app.xinference_app import xinference_app
            app.mount("/xinference", xinference_app)
            log.info("Xinference integration enabled at: '/xinference'")

    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-p", "--port", help="listen port",
                            type=int, default=config["basic"]["port"])
    args = arg_parser.parse_args()

    uvicorn.run(app, host="0.0.0.0", port=args.port, workers=1)
