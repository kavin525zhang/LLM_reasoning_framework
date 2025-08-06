import json
import threading
from typing import List, Any

import numpy as np
from transformers import AutoModelForSequenceClassification, AutoTokenizer

from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])
try:
    from optimum.onnxruntime import ORTModelForSequenceClassification
except ImportError:
    log.warning("Loading optimum[onnxruntime-gpu] failed and the ONNX model cannot be used. "
                "Please use \"pip install \"optimum[onnxruntime-gpu]\"\" to install dependencies.")


class MdIdModelService:

    def __init__(self,
                 id_model_path: str,
                 batch_size: int,
                 device_id: str) -> None:
        log.info(f"Start init id model {id_model_path}")
        self.lock = threading.Lock()
        self.device_id = device_id
        self.batch_size = batch_size
        self.tokenizer = AutoTokenizer.from_pretrained(id_model_path, add_prefix_space=True)
        self.logit_map = self.init_logit_map(id_model_path)
        label_cnt = len(self.logit_map.keys())
        if id_model_path.endswith("-onnx"):
            self.model = ORTModelForSequenceClassification.from_pretrained(id_model_path,
                                                                           num_labels=label_cnt,
                                                                           use_io_binding=True)
            self.model.to(device_id)
            self.model.use_io_binding = False
        else:
            self.model = AutoModelForSequenceClassification.from_pretrained(id_model_path,
                                                                            num_labels=label_cnt).to(device_id)
            self.model.eval()
        log.info(f"Init id model {id_model_path} done.")

    @staticmethod
    def init_logit_map(model_path: str):
        label_config = json.loads(open(f"{model_path}/config.json", "rb").read())["label2id"]
        return {
            v: k
            for k, v in label_config.items()
        }

    def generate(self, query: List[str]) -> list[dict[str, Any]]:
        dialog_cls = []
        prompt = "判断最后一个问题的类别（参考额外信息可回答、参考额外信息及前文问题可回答、可直接回答）：\n"
        query_with_prompt = [prompt + i for i in query]
        for i in range(0, len(query_with_prompt), self.batch_size):
            encoded_input = self.tokenizer(query_with_prompt[i:min(i + self.batch_size, len(query))],
                                           padding=True, truncation=True, max_length=512, return_tensors='np')
            cls = self.model(**encoded_input).logits
            cls = 1.0 / (1.0 + np.exp(-cls))
            dialog_cls.extend(cls)

        return [
            {"label": self.logit_map[i.argmax().item()], "score": i.max().item()}
            for i in dialog_cls
        ]
