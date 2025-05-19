import os

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse

from inferserver.utils.lunar import Lunar
from inferserver.utils.schema import LargeLanguageModelRequest
from inferserver.utils.tools import get_logger, config_loader
from inferserver.utils.utils import init_language_model

os.environ["VLLM_NO_USAGE_STATS"] = "1"

language_app = FastAPI()
config = config_loader("configs/common.json")
language_models = init_language_model(config["service"]["language_model"])
log = get_logger(config["basic"]["log_level"])


@language_app.post("/")
async def main(llm_request: LargeLanguageModelRequest):
    model_type = llm_request.model_type
    if model_type not in language_models:
        raise HTTPException(status_code=402, detail={
            "message": f"llm chat failed! unsupported model.",
            "llm_results": ""
        })

    raw_prompt = llm_request.query
    if raw_prompt == "":
        raise HTTPException(status_code=400, detail={
            "message": f"llm chat failed! empty prompt.",
            "llm_results": ""
        })

    prompt_pairs = raw_prompt if isinstance(raw_prompt, list) else [raw_prompt]
    prompt = ""
    if llm_request.raw and len(prompt_pairs) == 1:
        prompt = prompt_pairs[0]
    else:
        user_template = config["service"]["language_model"][model_type]["template"]["user"]
        ai_template = config["service"]["language_model"][model_type]["template"]["ai"]
        ai_sep = config["service"]["language_model"][model_type]["template"].get("sep", "")
        sys_inst = config["service"]["language_model"][model_type]["template"].get("sys", "")
        # Apply current datetime to system prompt
        if "{}" in sys_inst:
            sys_inst = sys_inst.format(Lunar())
        max_input_length = round(config["service"]["language_model"][model_type]["max_length"] * 0.8)
        this_prompt = ai_template.format("")
        for idx, text in enumerate(prompt_pairs[::-1]):
            if idx % 2 == 0:
                # 如果是最后一条，则需要加上系统指令
                v = user_template.format(text if idx == len(prompt_pairs) - 1 else text)
                # 如果是第一条输入超长，则应用前截断，且因为变成了最后一条所以也要加系统指令
                if len(this_prompt) >= (max_input_length - len(v)) and idx == 0:
                    exist_length = len(this_prompt) + len(user_template) + len(sys_inst)
                    v = user_template.format(text[-(max_input_length - exist_length):])
                this_prompt = v + this_prompt
            else:
                this_prompt = ai_template.format(text) + ai_sep + this_prompt
                continue
            if len(this_prompt) + len(prompt) <= max_input_length:
                prompt = this_prompt + prompt
                this_prompt = ""
            else:
                break
        prompt = sys_inst + prompt

    log.info(f"New LM query: {prompt}")

    model_params = llm_request.model_params
    try:
        if llm_request.stream:
            return StreamingResponse(
                language_models[model_type].generate_stream(prompt, model_params),
                media_type="text/event-stream"
            )
        return await language_models[model_type].generate(prompt, model_params)
    except Exception as e:
        raise HTTPException(status_code=503, detail={
            "message": f"llm chat failed! detail: {e}",
            "llm_results": ""
        })
