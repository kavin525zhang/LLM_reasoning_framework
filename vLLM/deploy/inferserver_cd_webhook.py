import logging
import asyncio
from rich.logging import RichHandler
import uvicorn
from fastapi import FastAPI, Request, HTTPException

SERVER_PORT = 18003
ACCESS_TOKEN = "8b93cba3-9b07-40f9-bbf4-102214390b6e"
SERVICE_NAME = "inferserver"

logging.basicConfig(
    level="INFO", format="%(message)s", datefmt="[%X]", handlers=[RichHandler()]
)
log = logging.getLogger("rich")

app = FastAPI()


@app.post("/push_hook")
async def push_hook(request: Request):
    if request.headers.get("X-Gitlab-Token", "") != ACCESS_TOKEN:
        raise HTTPException(status_code=401)
    if request.headers.get("X-Gitlab-Event", "") != "Push Hook":
        raise HTTPException(status_code=406)

    request_json = await request.json()
    log.info(request_json)

    proc = await asyncio.create_subprocess_shell(
        f"systemctl restart {SERVICE_NAME}",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE)
    stdout, stderr = await proc.communicate()

    return {
        "stdout": stdout.decode(),
        "stderr": stderr.decode()
    }


uvicorn.run(app, host="0.0.0.0", port=SERVER_PORT, workers=1)
