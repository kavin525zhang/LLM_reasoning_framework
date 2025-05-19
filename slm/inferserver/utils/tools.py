import json
import logging
from typing import List

from rich.logging import RichHandler


def config_loader(config_path: str) -> dict:
    return json.loads(open(config_path).read())


def get_logger(log_level: str) -> logging.Logger:
    # Logging config
    logging.basicConfig(
        level=log_level, format="%(message)s", datefmt="[%X]", handlers=[RichHandler()]
    )
    return logging.getLogger("rich")


def cut_text(text_list: List[str], max_len: int) -> List[str]:
    return [i[:max_len] for i in text_list]
