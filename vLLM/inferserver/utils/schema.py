from typing import List, Union

from pydantic import BaseModel


class LargeLanguageModelRequest(BaseModel):
    query: Union[str, List[str]] = ""
    model_type: str = "llama2"
    model_params: dict = {}
    raw: bool = True
    stream: bool = False
