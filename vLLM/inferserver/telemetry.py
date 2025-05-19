from typing import Dict, Any

from starlette.background import BackgroundTasks
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint, DispatchFunction
from starlette.requests import Request
from starlette.responses import Response
from starlette.types import ASGIApp

from inferserver.utils.tools import config_loader, get_logger

from dbutils.pooled_db import PooledDB
import mysql.connector

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])

telemetry_conf = config["telemetry"]

instance_id = telemetry_conf.get("instance_id", None)
if not instance_id:
    raise ValueError('To enable telemetry, instance_id must not be empty.'
                     'Please set it at config["telemetry"]["instance_id"]')

model_id = telemetry_conf.get("model_id", None)
if not model_id:
    raise ValueError('To enable telemetry, model_id must not be empty.'
                     ' Please set it at config["telemetry"]["model_id"]')


class TelemetryMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        response = await call_next(request)
        response.headers["X-Infinity-Model-ID"] = model_id
        response.headers["X-Infinity-Model-INSTANCE-ID"] = instance_id
        return response
