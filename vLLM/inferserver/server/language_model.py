import json
from typing import Mapping, Any, AsyncGenerator, Dict, Optional

import torch
from transformers import AutoModelForCausalLM
from transformers import AutoTokenizer
from vllm.engine.arg_utils import AsyncEngineArgs
from vllm.engine.async_llm_engine import AsyncLLMEngine
from vllm.sampling_params import SamplingParams
from vllm.utils import random_uuid

from inferserver.utils.tools import get_logger, config_loader

config = config_loader("configs/common.json")
log = get_logger(config["basic"]["log_level"])


class LLaMaModelService:

    def __init__(self, model_path: str, device_id: str) -> None:
        self.device = torch.device(device_id)
        log.info(f"Start init language model {model_path}")
        self.tokenizer = AutoTokenizer.from_pretrained(model_path, legacy=False, use_fast=False)
        self.model = AutoModelForCausalLM.from_pretrained(model_path, torch_dtype=torch.float16)
        self.model.to(self.device)
        log.info(f"Init language model {model_path} done.")

    async def generate(self, query: str, model_params: Dict[str, Any]) -> dict:
        # upward compatible
        if "max_tokens" in model_params:
            model_params["max_new_tokens"] = model_params.pop("max_tokens")
        generate_params = dict(
            inputs=None,
            max_new_tokens=model_params.get("max_new_tokens", 512),
            top_p=model_params.get("top_p", 0.7),
            top_k=model_params.get("top_k", 40),
            temperature=model_params.get("temperature", 0.95),
            do_sample=model_params.get("do_sample", True),
            repetition_penalty=model_params.get("repetition_penalty", 1.0)
        )
        tokens = self.tokenizer(query, return_tensors="pt").input_ids.to(self.device)
        generate_params["inputs"] = tokens

        generate_ids = self.model.generate(**generate_params)
        return {
            "message": "llm chat success!",
            "llm_results": self.tokenizer.decode(generate_ids[0][len(tokens[0]):], skip_special_tokens=True),
            "finish_reason": "stop"
        }

    async def generate_stream(self, query: str, model_params: Mapping[str, Any]):
        raise NotImplementedError("HF models do not support stream generation yet.")


class VllmModelService:

    def __init__(self,
                 model_path: str,
                 model_length: Optional[int] = None,
                 vram_ratio: float = 0.95,
                 tensor_parallel_size: int = 1,
                 pipeline_parallel_size: int = 1,
                 quantization: Optional[str] = None,
                 num_scheduler_steps: Optional[int] = 1,
                 enforce_fp16: bool = False,
                 enable_prefix_caching: bool = True,
                 enable_fp8_kv_cache: bool = True) -> None:
        log.info(f"Start init vLLM language model {model_path}")
        self.engine = AsyncLLMEngine.from_engine_args(AsyncEngineArgs(
            model=model_path,
            seed=42,
            max_model_len=model_length,
            dtype="half" if enforce_fp16 else "auto",
            gpu_memory_utilization=vram_ratio,
            disable_log_requests=True,
            tensor_parallel_size=tensor_parallel_size,
            pipeline_parallel_size=pipeline_parallel_size,
            # 牺牲一定显存提高整体速度
            enforce_eager=False,
            use_v2_block_manager=True,
            swap_space=1,
            tokenizer_pool_size=4,
            num_scheduler_steps=num_scheduler_steps,
            quantization=quantization,
            enable_prefix_caching=enable_prefix_caching,
            kv_cache_dtype="fp8" if enable_fp8_kv_cache else "auto"
        ))
        log.info(f"Init vLLM language model {model_path} done.")

    @staticmethod
    def get_generator(model_params: Dict[str, Any]):
        request_id = random_uuid()
        # upward compatible
        if "max_new_tokens" in model_params:
            model_params["max_tokens"] = model_params.pop("max_new_tokens")
        try:
            infer_params = SamplingParams(**model_params)
        except TypeError:
            infer_params = SamplingParams()
        infer_params.max_tokens = model_params.get("max_tokens", 512)
        infer_params.top_p = model_params.get("top_p", 0.7)
        infer_params.top_k = int(model_params.get("top_k", 40))
        infer_params.top_k = 50 if infer_params.top_k == 0 else infer_params.top_k
        infer_params.temperature = model_params.get("temperature", 0.95)
        infer_params.presence_penalty = model_params.get("presence_penalty", 0.5)
        infer_params.frequency_penalty = model_params.get("frequency_penalty", 0.5)
        log.debug(infer_params)
        return infer_params, request_id

    async def generate(self, query: str, model_params: Dict[str, Any]) -> dict:
        infer_params, request_id = self.get_generator(model_params)
        results_generator = self.engine.generate(query, infer_params, request_id)

        final_output = None
        async for request_output in results_generator:
            final_output = request_output

        assert final_output is not None
        return {
            "message": "llm chat success!",
            "llm_results": final_output.outputs[0].text,
            "finish_reason": final_output.outputs[0].finish_reason
        }

    async def generate_stream(self, query: str, model_params: Mapping[str, Any]) -> AsyncGenerator:
        infer_params, request_id = self.get_generator(model_params)
        results_generator = self.engine.generate(query, infer_params, request_id)
        last_output = ""

        async for request_output in results_generator:
            for output in request_output.outputs:
                data = json.dumps({
                    "llm_results": output.text[len(last_output):],
                    "finish_reason": output.finish_reason
                }, ensure_ascii=False)
                last_output = output.text
                yield f"{data}\n"
        yield "[DONE]\n"
