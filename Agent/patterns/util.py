from openai import OpenAI
import os
import re

client = OpenAI(base_url="http://172.17.124.12:8024/v1",
                api_key="EMPTY",
                timeout=120)

def llm_call(prompt: str, system_prompt: str = "", model="/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct") -> str:
    """
    Calls the model with the given prompt and returns the response.

    Args:
        prompt (str): The user prompt to send to the model.
        system_prompt (str, optional): The system prompt to send to the model. Defaults to "".
        model (str, optional): The model to use for the call. Defaults to "claude-3-5-sonnet-20241022".

    Returns:
        str: The response from the language model.
    """
    messages = [{"role": "user", "content": prompt}]
    response = client.chat.completions.create(
        model=model,
        max_tokens=4096,
        messages=messages,
        temperature=0.1
    )
    return response.choices[0].message.content

def extract_xml(text: str, tag: str) -> str:
    """
    Extracts the content of the specified XML tag from the given text. Used for parsing structured responses 

    Args:
        text (str): The text containing the XML.
        tag (str): The XML tag to extract content from.

    Returns:
        str: The content of the specified XML tag, or an empty string if the tag is not found.
    """
    match = re.search(f'<{tag}>(.*?)</{tag}>', text, re.DOTALL)
    return match.group(1) if match else ""