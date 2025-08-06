from typing import List
import threading

from transformers import AutoModelForSequenceClassification, AutoTokenizer

from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])

try:
    from optimum.onnxruntime import ORTModelForSequenceClassification
except ImportError:
    log.warning("Loading optimum[onnxruntime-gpu] failed and the ONNX model cannot be used. "
                "Please use \"pip install \"optimum[onnxruntime-gpu]\"\" to install dependencies.")


class ReRankerModelService:

    def __init__(self,
                 re_ranker_model_path: str,
                 batch_size: int,
                 device_id: str) -> None:
        log.info(f"Start init re-ranker model {re_ranker_model_path}")
        self.lock = threading.Lock()
        self.batch_size = batch_size
        self.device_id = device_id
        self.tokenizer = AutoTokenizer.from_pretrained(re_ranker_model_path)
        if re_ranker_model_path.endswith("-onnx"):
            self.model = ORTModelForSequenceClassification.from_pretrained(re_ranker_model_path,
                                                                           use_io_binding=True)
            self.model.to(device_id)
            self.model.use_io_binding=False
            self.is_ort = True
        else:
            self.model = AutoModelForSequenceClassification.from_pretrained(re_ranker_model_path).to(device_id)
            self.model.eval()
            self.is_ort = False
        log.info(f"Init re-ranker model {re_ranker_model_path} done.")

    def generate(self, query: List[List[str]]) -> List[float]:
        scores = []
        for i in range(0, len(query), self.batch_size):
            slice_tokens = self.tokenizer(query[i:min(i + self.batch_size, len(query))],
                                          padding=True,
                                          truncation=True,
                                          return_tensors="np" if self.is_ort else "pt",
                                          max_length=512)
            if not self.is_ort:
                slice_tokens = slice_tokens.to(self.device_id)
            with self.lock:
                slice_score = self.model(**slice_tokens, return_dict=True).logits.flatten().tolist()
            scores.extend(slice_score)

        return scores
