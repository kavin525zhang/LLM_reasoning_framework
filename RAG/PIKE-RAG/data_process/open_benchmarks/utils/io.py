# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

import os
import json
from typing import Any, List

import aiofiles
import jsonlines


def dump_bytes_to_file(obj: bytes, filepath: str) -> None:
    with open(filepath, "wb") as writer:
        writer.write(obj)
    return


async def async_dump_bytes_to_file(data: bytes, filepath: str) -> None:
    async with aiofiles.open(filepath, 'wb') as f:
        await f.write(data)
    return


def dump_texts_to_file(texts: str, filepath: str) -> None:
    with open(filepath, "w", encoding="utf-8") as writer:
        writer.write(texts)
    return


def load_from_json_file(filepath: str) -> Any:
    object = None
    if os.path.exists(filepath):
        with open(filepath, "r") as fin:
            object = json.load(fin)
    return object


def dump_to_json_file(filepath: str, object: Any) -> None:
    with open(filepath, "w") as fout:
        json.dump(object, fout)
    return


def load_from_jsonlines(filepath: str) -> List:
    with jsonlines.open(filepath, "r") as reader:
        data = [d for d in reader]
    return data


def dump_to_jsonlines(filepath: str, objs: Any) -> None:
    with jsonlines.open(filepath, "w") as writer:
        writer.write_all(objs)
    return
