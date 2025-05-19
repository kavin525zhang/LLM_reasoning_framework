import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse, StreamingResponse, Response
from vllm.entrypoints.openai.protocol import *
from vllm.entrypoints.openai.serving_chat import OpenAIServingChat
from vllm.entrypoints.openai.serving_completion import OpenAIServingCompletion
from vllm.entrypoints.openai.serving_models import BaseModelPath, OpenAIServingModels

from inferserver.app.language_app import language_models
from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
logger = get_logger(config["basic"]["log_level"])

while len(language_models) < 1:
    asyncio.run(asyncio.sleep(1))

model_name = list(language_models.keys())[0]
engine = language_models[model_name].engine
model_config = asyncio.run(engine.get_model_config())
served_model = OpenAIServingModels(
    engine_client=engine,
    model_config=model_config,
    base_model_paths=[BaseModelPath(name=model_name, model_path="")]
)
response_role = "assistant"

openai_serving_chat = OpenAIServingChat(engine, model_config, served_model, response_role,
                                        request_logger = None, chat_template = None,
                                        chat_template_content_format="auto")
openai_serving_completion = OpenAIServingCompletion(engine, model_config, served_model,
                                                    request_logger = None)

openai_app = FastAPI()
openai_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@openai_app.get("/health")
async def health() -> Response:
    """Health check."""
    return Response(status_code=200)


@openai_app.get("/v1/models")
async def show_available_models():
    models = await served_model.show_available_models()
    return JSONResponse(content=models.model_dump())


@openai_app.post("/v1/chat/completions")
async def create_chat_completion(request: ChatCompletionRequest,
                                 raw_request: Request):
    generator = await openai_serving_chat.create_chat_completion(
        request, raw_request)
    if isinstance(generator, ErrorResponse):
        return JSONResponse(content=generator.model_dump(),
                            status_code=generator.code)
    if request.stream:
        return StreamingResponse(content=generator,
                                 media_type="text/event-stream")
    else:
        return JSONResponse(content=generator.model_dump())


@openai_app.post("/v1/completions")
async def create_completion(request: CompletionRequest, raw_request: Request):
    generator = await openai_serving_completion.create_completion(
        request, raw_request)
    if isinstance(generator, ErrorResponse):
        return JSONResponse(content=generator.model_dump(),
                            status_code=generator.code)
    if request.stream:
        return StreamingResponse(content=generator,
                                 media_type="text/event-stream")
    else:
        return JSONResponse(content=generator.model_dump())
