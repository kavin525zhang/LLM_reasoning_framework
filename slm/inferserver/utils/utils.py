from typing import Any

from inferserver.server.embedding_model import EmbeddingModelService, EmbeddingOrtModelService
from inferserver.server.reranker_model import ReRankerModelService
from inferserver.server.mdid_model import MdIdModelService
from inferserver.server.ocr_model import OcrModelService


def init_embedding_model(config: dict) -> dict[Any, Any]:
    res = {}
    for model_name, model_config in config.items():
        service_class = EmbeddingModelService
        if model_config["model_path"].endswith("-onnx"):
            service_class = EmbeddingOrtModelService
        res[model_name] = {
            "model": service_class(model_config["model_path"],
                                   model_config.get("batch_size", 32),
                                   model_config["device"])
        }
    return res


def init_rerank_model(config: dict) -> dict[Any, Any]:
    res = {}
    for model_name, model_config in config.items():
        res[model_name] = {
            "model": ReRankerModelService(model_config["model_path"],
                                          model_config.get("batch_size", 32),
                                          model_config["device"])
        }
    return res


def init_mdid_model(config: dict) -> dict[Any, Any]:
    res = {}
    for model_name, model_config in config.items():
        res[model_name] = {
            "model": MdIdModelService(model_config["model_path"],
                                      model_config.get("batch_size", 32),
                                      model_config["device"])
        }
    return res


def init_ocr_model(config: dict) -> dict[Any, Any]:
    res = {}
    for model_name, model_config in config.items():
        res[model_name] = {
            "model": OcrModelService(model_config.get("batch_size", 8),
                                     model_config["device"])
        }
    return res
