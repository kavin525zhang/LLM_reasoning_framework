from typing import List, Union

from pydantic import BaseModel


class EmbeddingRequest(BaseModel):
    text: Union[str, List[str]] = ""
    type: str = "bge"
    norm: bool = True
    is_query: bool = False


class ReRankerRequest(BaseModel):
    pairs: List[List[str]] = [["", ""]]
    type: str = "bge"


class IdRequest(BaseModel):
    query: Union[str, List[str]] = ""
    type: str = "mbert"
