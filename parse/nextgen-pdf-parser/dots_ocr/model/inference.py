import json

import requests
from dots_ocr.utils.image_utils import PILimage_to_base64
import os


def inference_with_vllm(
        image,
        prompt,
        model_url,
        temperature=0.1,
        top_p=0.9,
        max_completion_tokens=32768,
        model_name='model',
):
    # 构建请求头
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('API_KEY', '0')}"  # 确保你的 vLLM 服务需要/处理这个 key
    }
    url = f"{model_url}/chat/completions"

    # 构建与 OpenAI 库一致的 payload
    payload = {
        "model": model_name,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": PILimage_to_base64(image)},
                    },
                    {"type": "text", "text": f"<|img|><|imgpad|><|endofimg|>{prompt}"}
                ],
            }
        ],
        "max_tokens": max_completion_tokens,  # 注意，在 OpenAI API 中，这个参数叫 max_tokens
        "temperature": temperature,
        "top_p": top_p,
    }

    try:
        # 使用 requests.post 发送请求
        response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=180)  # 设置一个超时时间
        response.raise_for_status()  # 如果状态码不是 2xx，则抛出异常

        response_data = response.json()
        return response_data["choices"][0]["message"]["content"]

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        # 如果可能，打印响应内容以获取更多信息
        if e.response is not None:
            print(f"Response status code: {e.response.status_code}")
            print(f"Response text: {e.response.text}")
        return None
