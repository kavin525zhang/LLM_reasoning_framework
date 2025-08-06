import math
import random
import uuid
from typing import List, Literal, Dict, Any

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from inferserver.app.embedding_app import embedding_models
from inferserver.app.reranker_app import rerank_models
from inferserver.utils.tools import config_loader, cut_text

xinference_app = FastAPI()
config = config_loader("configs/common.json")

model_dict = {
    "bge-embedding": {
        "id": "bge-embedding",
        "object": "model",
        "created": 0,
        "owned_by": "transwarp",
        "model_name": "bge-embedding",
        "model_type": "embedding",
        "address": "0.0.0.0:8004",
        "accelerators": [
            "0"
        ],
        "dimensions": 1024,
        "max_tokens": 2048,
        "language": [
            "en",
            "zh" 
        ],
        "model_revision": "029c4bfff6b0c5cfcd20b40c17ed52ec55202748",
        "replica": 1,
    },
    "bge-reranker": {
        "id": "bge-reranker",
        "object": "model",
        "created": 0,
        "owned_by": "transwarp",
        "model_name": "bge-reranker",
        "model_type": "rerank",
        "address": "0.0.0.0:8004",
        "accelerators": [
            "0"
        ],
        "type": "normal",
        "language": [
            "en",
            "zh"
        ],
        "model_revision": "27c9168d479987529781de8474dff94d69beca11",
        "replica": 1
    },
}

@xinference_app.get("/v1/models")
def list_models():
    response = {"object": "list", "data": model_dict.values()}
    return JSONResponse(content=response)


@xinference_app.get("/v1/models/{model_uid}")
def get_model(model_uid: str):
    model_info = model_dict[model_uid]
    return JSONResponse(content=model_info)


class EmbeddingsRequest(BaseModel):
    input: str | List[str]
    model: str
    encoding_format: Literal["float", "base64"] = "float"


class EmbeddingsResponse(BaseModel):
    object: str
    model: str
    data: List[Dict[str, Any]]
    usage: Dict[str, Any]


@xinference_app.post("/v1/embeddings")
def embeddings(request: EmbeddingsRequest) -> EmbeddingsResponse:
    model_name = "bge"
    model_conf = config["service"]["embedding_model"][model_name]

    text_list = request.input if isinstance(request.input, List) else [request.input]
    text_list = cut_text(text_list, model_conf["max_length"])
    model = embedding_models[model_name]
    embeds, tokens_used = model["model"].generate(text_list, normalization=True, return_tokens_used=True)

    data = []
    for i, embed in enumerate(embeds):
        data.append({
            "index": i,
            "object": "embedding",
            "embedding": embed,
        })
    token_usage = {
        "prompt_tokens": tokens_used,
        "total_tokens": tokens_used,
    }
    return EmbeddingsResponse(object="list", model=model_name, data=data, usage=token_usage)


class RerankRequest(BaseModel):
    model: str
    query: str
    documents: List[str]


class RerankResponse(BaseModel):
    id: str
    results: List[Dict[str, Any]]


@xinference_app.post("/v1/rerank")
def rerank(request: RerankRequest) -> RerankResponse:
    model_name = "bge"
    pairs = []
    for doc in request.documents:
        pairs.append([request.query, doc])

    model = rerank_models[model_name]
    scores = model["model"].generate(pairs)
    # Normalization
    scores = list(map(_sigmoid, scores))

    results = []
    for i, (score, doc) in enumerate(zip(scores, request.documents)):
        results.append({
            "index": i,
            "relevance_score": score,
            "document": doc
        })
    return RerankResponse(id=str(uuid.uuid4()), results=results)


def _sigmoid(x):
    return 1 / (1 + math.exp(-x))
