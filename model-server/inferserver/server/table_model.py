import asyncio
import threading
from typing import List
from pathlib import Path

import numpy as np
from PIL.Image import Image
from rapid_table import RapidTable, RapidTableInput
from rapid_table.main import root_dir as rapid_table_root_dir

from inferserver.app.ocr_app import ocr_models
from inferserver.utils.tools import get_logger, config_loader

while len(ocr_models) < 1:
    asyncio.run(asyncio.sleep(1))

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])
ocr_model = ocr_models[list(ocr_models.keys())[0]]["model"]


class TableModelService:

    def __init__(self, device: str) -> None:
        log.info(f"Start init TableOCR engine")
        self.lock = threading.Lock()
        self.engine = RapidTable(
            RapidTableInput(
                model_type="slanet_plus",
                model_path=Path(rapid_table_root_dir) / Path("models/slanet-plus.onnx"),
                use_cuda=device.startswith("cuda"),
                device=device,
            )
        )
        log.info(f"Init TableOCR engine done.")

    def generate(self, query: List[Image]) -> List[str]:
        # OCR
        ocr_results = ocr_model.generate(query)
        # OCR Table
        pre_query = [np.array(i) for i in query]
        ret = []
        for ocr_result, np_img in zip(ocr_results, pre_query):
            if ocr_result is None:
                ret.append("")
                continue
            with self.lock:
                output = self.engine(np_img, ocr_result)
                ret.append(output.pred_html)
        if len(ret) == 0:
            ret.append(None)
        return ret
