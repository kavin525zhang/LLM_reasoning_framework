from typing import Any

from inferserver.server.language_model import VllmModelService, LLaMaModelService


def init_language_model(config: dict) -> dict[Any, Any]:
    lm_map = {
        "vllm": VllmModelService,
        "hf_llama2": LLaMaModelService
    }
    res = {}
    for model_name, model_config in config.items():
        model = lm_map[model_config["type"]]
        if model is VllmModelService:
            res[model_name] = model(
                model_path=model_config["model_path"],
                model_length=model_config.get("max_length", None),
                vram_ratio=model_config["vram_ratio"],
                tensor_parallel_size=model_config["parallel_rank"],
                pipeline_parallel_size=model_config.get("pipeline_parallel_rank", 1),
                quantization=model_config.get("quantization", None),
                num_scheduler_steps=model_config.get("scheduler_steps", 1),
                enforce_fp16=model_config.get("enforce_fp16", False),
                enable_prefix_caching=model_config.get("enable_prefix_caching", True),
                enable_fp8_kv_cache=model_config.get("fp8_kv_cache", True)
            )
        else:
            res[model_name] = model(
                model_config["model_path"],
                model_config["device"]
            )
    return res
