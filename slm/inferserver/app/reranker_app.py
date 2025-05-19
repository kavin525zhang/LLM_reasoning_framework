import traceback

from fastapi import FastAPI, HTTPException
from fastapi.middleware.gzip import GZipMiddleware

from inferserver.utils.schema import ReRankerRequest
from inferserver.utils.tools import get_logger, config_loader
from inferserver.utils.utils import init_rerank_model

reranker_app = FastAPI()
reranker_app.add_middleware(GZipMiddleware, minimum_size=5000)
config = config_loader("configs/common.json")
rerank_models = init_rerank_model(config["service"]["rerank_model"])
log = get_logger(config["basic"]["log_level"])


@reranker_app.post("/")
def main(rerank_request: ReRankerRequest):
    rerank_type = rerank_request.type
    if rerank_type not in rerank_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")

    req_pairs = rerank_request.pairs
    if req_pairs == [["", ""]]:
        raise HTTPException(status_code=400, detail="Empty paris.")
    # log.info(f"New rerank query: {req_pairs}")

    try:
        this_model = rerank_models[rerank_type]
        return this_model["model"].generate(req_pairs)
    except Exception as e:
        log.error(f"Input: {req_pairs}, Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=503, detail=f"Exception: {e}")
