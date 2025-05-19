import argparse
import re
from contextlib import asynccontextmanager

import torch
import uvicorn
from fastapi import FastAPI
from starlette.routing import Mount

from inferserver.utils.tools import config_loader, get_logger
from inferserver.app.language_app import language_app
from inferserver.app.openai_app import openai_app
from prometheus_client import make_asgi_app


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield
    torch.cuda.empty_cache()


app = FastAPI(lifespan=lifespan)
app.mount("/llm_chat", language_app)
app.mount("/openai", openai_app)
route = Mount("/metrics", make_asgi_app())
route.path_regex = re.compile('^/metrics(?P<path>.*)$')
app.routes.append(route)


@app.get("/")
async def root():
    return "Infinity model server (beta 0.4.0)"


if __name__ == "__main__":
    config = config_loader("configs/common.json")
    log = get_logger(config["basic"]["log_level"])

    if telemetry_conf := config.get("telemetry", {}):
        if telemetry_conf.get("enable", False):
            from inferserver.telemetry import TelemetryMiddleware, instance_id, model_id

            language_app.add_middleware(TelemetryMiddleware)
            openai_app.add_middleware(TelemetryMiddleware)

            log.info(f"Telemetry enabled, instance id: {instance_id}, model id: {model_id}")

    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-p", "--port", help="listen port",
                            type=int, default=config["basic"]["port"])
    args = arg_parser.parse_args()

    uvicorn.run(app, host="0.0.0.0", port=args.port, workers=1)
