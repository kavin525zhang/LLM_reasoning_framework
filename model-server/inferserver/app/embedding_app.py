import traceback

from fastapi import FastAPI, HTTPException
from fastapi.middleware.gzip import GZipMiddleware

from inferserver.utils.schema import EmbeddingRequest, ReRankerRequest
from inferserver.utils.tools import get_logger, config_loader, cut_text
from inferserver.utils.utils import init_embedding_model

embedding_app = FastAPI()
embedding_app.add_middleware(GZipMiddleware, minimum_size=5000)
config = config_loader("configs/common.json")
embedding_models = init_embedding_model(config["service"]["embedding_model"])
flag_embedding_models = init_embedding_model(config["service"]["embedding_model"], flag=True)
log = get_logger(config["basic"]["log_level"])


@embedding_app.post("/")
def main(embedding_request: EmbeddingRequest):
    embed_type = embedding_request.type
    if embed_type not in embedding_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")

    req_text = embedding_request.text
    if req_text == "":
        raise HTTPException(status_code=400, detail="Empty text.")

    normalization = embedding_request.norm

    instruction = config["service"]["embedding_model"][embed_type]["instruction"]
    text_list = req_text if isinstance(req_text, list) else [req_text]
    text_list = cut_text(text_list, config["service"]["embedding_model"][embed_type]["max_length"])

    if len(text_list) == 0:
        raise HTTPException(status_code=400, detail="Empty query.")

    if embedding_request.is_query:
        text_list = [instruction + i for i in text_list]
    # log.info(f"New embedding query: {text_list}")

    try:
        this_model = embedding_models[embed_type]
        return this_model["model"].generate(text_list, normalization=normalization)
    except Exception as e:
        log.error(f"Input: {text_list}, Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=503, detail=f"Exception: {e}")
    
@embedding_app.post("/scores")
def main(rerank_request: ReRankerRequest):
    embed_type = rerank_request.type
    if embed_type not in embedding_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")

    req_pairs = rerank_request.pairs
    if req_pairs == [["", ""]]:
        raise HTTPException(status_code=400, detail="Empty paris.")
    # log.info(f"New rerank query: {req_pairs}")

    try:
        this_model = flag_embedding_models[embed_type]
        return this_model["model"].compute_score(req_pairs)
    except Exception as e:
        log.error(f"Input: {req_pairs}, Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=503, detail=f"Exception: {e}")
