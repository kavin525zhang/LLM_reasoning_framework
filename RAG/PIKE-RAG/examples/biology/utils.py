# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

import pickle
from typing import List, Literal, Tuple

from datasets import load_dataset, Dataset
from tqdm import tqdm

from langchain_core.documents import Document

from pikerag.utils.walker import list_files_recursively
from pikerag.workflows.common import MultipleChoiceQaData


def load_testing_suite(path: str="cais/mmlu", name: str="college_biology") -> List[MultipleChoiceQaData]:
    dataset: Dataset = load_dataset(path, name)["test"]
    testing_suite: List[dict] = []
    for qa in dataset:
        testing_suite.append(
            MultipleChoiceQaData(
                question=qa["question"],
                metadata={
                    "subject": qa["subject"],
                },
                options={
                    chr(ord('A') + i): choice
                    for i, choice in enumerate(qa["choices"])
                },
                answer_mask_labels=[chr(ord('A') + qa["answer"])],
            )
        )
    return testing_suite


def load_ids_and_chunks(chunk_file_dir: str) -> Tuple[Literal[None], List[Document]]:
    chunks: List[Document] = []
    chunk_idx: int = 0
    for doc_name, doc_path in tqdm(
        list_files_recursively(directory=chunk_file_dir, extensions=["pkl"]),
        desc="Loading Files",
    ):
        with open(doc_path, "rb") as fin:
            chunks_in_file: List[Document] = pickle.load(fin)

        for doc in chunks_in_file:
            doc.metadata.update(
                {
                    "filename": doc_name,
                    "chunk_idx": chunk_idx,
                }
            )
            chunk_idx += 1

        chunks.extend(chunks_in_file)

    return None, chunks
