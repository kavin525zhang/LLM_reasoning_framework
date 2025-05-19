import json
import logging

from rich.logging import RichHandler


def config_loader(config_path: str) -> dict:
    return json.loads(open(config_path, "rb").read())


def get_logger(log_level: str) -> logging.Logger:
    # Logging config
    logging.basicConfig(
        level=log_level, format="%(message)s", datefmt="[%X]", handlers=[RichHandler()]
    )
    return logging.getLogger("rich")
