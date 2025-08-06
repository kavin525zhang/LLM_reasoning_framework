import traceback

from fastapi import FastAPI, HTTPException
from fastapi.middleware.gzip import GZipMiddleware

from inferserver.utils.schema import IdRequest
from inferserver.utils.tools import config_loader, get_logger
from inferserver.utils.utils import init_mdid_model

mdid_app = FastAPI()
mdid_app.add_middleware(GZipMiddleware, minimum_size=5000)
config = config_loader("configs/common.json")
mdid_models = init_mdid_model(config["service"]["mdid_model"])
log = get_logger(config["basic"]["log_level"])


@mdid_app.post("/")
def main(id_request: IdRequest):
    mdid_type = id_request.type
    if mdid_type not in mdid_models:
        raise HTTPException(status_code=402, detail="Unsupported model.")

    query = id_request.query
    if query == "":
        raise HTTPException(status_code=400, detail={
            "message": f"intent detect failed! empty query.",
            "result": -1
        })
    query_list = query if isinstance(query, list) else [query]
    # log.info(f"New id query: {query_list}")

    try:
        this_model = mdid_models[mdid_type]
        return this_model["model"].generate(query_list)
    except Exception as e:
        log.error(f"Input: {query_list}, Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=503, detail=f"Exception: {e}")
