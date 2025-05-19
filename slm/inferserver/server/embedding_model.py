from typing import List, Tuple, Union
import threading

import numpy as np
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer

from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])

try:
    from optimum.onnxruntime import ORTModelForFeatureExtraction
except ImportError:
    log.warning("Loading optimum[onnxruntime-gpu] failed and the ONNX model cannot be used. "
                "Please use \"pip install \"optimum[onnxruntime-gpu]\"\" to install dependencies.")

import torch

class EmbeddingModelService:

    def __init__(self,
                 embedding_model_path: str,
                 batch_size: int,
                 device_id: str) -> None:
        log.info(f"Start init embedding model {embedding_model_path}")
        self.lock = threading.Lock()
        self.tokenizer = AutoTokenizer.from_pretrained(embedding_model_path)
        self.model = SentenceTransformer(embedding_model_path, device=device_id)
        self.batch_size = batch_size
        log.info(f"Init embedding model {embedding_model_path} done.")

    def generate(self, query: List[str], normalization: bool = True, return_tokens_used=False) -> Union[List[List[float]], Tuple[List[List[float]], int]]:
        with self.lock:
            data_embeddings = self.model.encode(query,
                                                batch_size=self.batch_size,
                                                show_progress_bar=False,
                                                normalize_embeddings=normalization).tolist()
        assert len(query) == len(data_embeddings), \
            f"文本和向量数据不对应, 文本{len(query)}, 向量{len(data_embeddings)}"

        if return_tokens_used:
            encoded_input = self.tokenizer(query, padding=True, truncation=True, return_tensors='pt')
            tokens_used = len(encoded_input["input_ids"].reshape(-1))
            return data_embeddings, tokens_used
        else:
            return data_embeddings


class EmbeddingOrtModelService:

    def __init__(self,
                 embedding_model_path: str,
                 batch_size: int,
                 device_id: str) -> None:
        log.info(f"Start init embedding model {embedding_model_path}")
        self.lock = threading.Lock()
        self.batch_size = batch_size
        self.tokenizer = AutoTokenizer.from_pretrained(embedding_model_path)
        self.model = ORTModelForFeatureExtraction.from_pretrained(
            embedding_model_path, use_io_binding=True)
        self.model.to(device_id)
        self.model.use_io_binding = False
        log.info(f"Init embedding model {embedding_model_path} done.")

    def generate(self, query: List[str], normalization: bool = True, return_tokens_used=False) -> Union[List[List[float]], Tuple[List[List[float]], int]]:
        data_embeddings = []
        if return_tokens_used:
            tokens_used = 0
        for i in range(0, len(query), self.batch_size):
            encoded_input = self.tokenizer(query[i:min(i + self.batch_size, len(query))],
                                           padding=True, truncation=True, max_length=512, return_tensors='np')
            with self.lock:
                vectors = self.model(**encoded_input)[0][:, 0]
            data_embeddings.extend(vectors)
            if return_tokens_used:
                tokens_used += len(encoded_input["input_ids"].reshape(-1))

        assert len(query) == len(data_embeddings), \
            f"文本和向量数据不对应, 文本{len(query)}, 向量{len(data_embeddings)}"

        data_embeddings = np.array(data_embeddings)
        if normalization:
            data_embeddings = data_embeddings / np.linalg.norm(data_embeddings, axis=1, keepdims=True)

        if return_tokens_used:
            return data_embeddings.tolist(), tokens_used
        return data_embeddings.tolist()
