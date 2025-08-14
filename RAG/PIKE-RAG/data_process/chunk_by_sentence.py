# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

from collections import Counter
from typing import List

import jsonlines
import spacy
from tqdm import tqdm

nlp = spacy.load("en_core_web_lg")


def chunk_by_sent(chunk: str) -> List[str]:
    doc = nlp(chunk)
    sents = [sent.text for sent in doc.sents]
    return sents


def process_jsonl_file(name: str, input_path: str, output_path: str) -> Counter:
    with jsonlines.open(input_path, "r") as reader:
        data = [item for item in reader]

    num_counter = []
    with jsonlines.open(output_path, "w") as writer:
        for item in tqdm(data, desc=name):
            item["sentences"] = chunk_by_sent(item["content"])
            writer.write(item)
            num_counter.append(len(item["sentences"]))
    return Counter(num_counter)


if __name__ == "__main__":
    names = ["hotpotqa", "two_wiki", "musique"]
    inputs = [
        "data/hotpotqa/dev_500_retrieval_contexts_as_chunks.jsonl",
        "data/two_wiki/dev_500_retrieval_contexts_as_chunks.jsonl",
        "data/musique/dev_500_retrieval_contexts_as_chunks.jsonl",
    ]

    outputs = [
        "data/hotpotqa/dev_500_retrieval_contexts_as_chunks_with_sentences.jsonl",
        "data/two_wiki/dev_500_retrieval_contexts_as_chunks_with_sentences.jsonl",
        "data/musique/dev_500_retrieval_contexts_as_chunks_with_sentences.jsonl",
    ]

    for name, input, output in zip(names, inputs, outputs):
        counter = process_jsonl_file(name, input, output)
        print(name)
        print(counter)
        print()

"""
hotpotqa
Counter({3: 1073, 4: 951, 2: 878, 5: 669, 6: 496, 1: 316, 7: 221, 8: 154, 9: 66, 10: 43, 11: 20, 12: 17, 13: 17, 14: 8, 15: 7, 16: 5, 18: 4, 23: 1, 17: 1, 37: 1, 20: 1, 33: 1})

two_wiki
Counter({1: 1148, 2: 876, 3: 478, 4: 260, 5: 164, 6: 121, 7: 85, 8: 56, 9: 43, 10: 31, 11: 27, 12: 21, 13: 16, 15: 15, 14: 13, 16: 10, 17: 9, 18: 9, 19: 9, 21: 6, 20: 4, 24: 3, 26: 2, 22: 2, 28: 1, 27: 1})

musique
Counter({2: 1721, 3: 1600, 4: 1211, 5: 795, 1: 717, 6: 452, 7: 250, 8: 147, 9: 95, 10: 55, 11: 31, 13: 15, 12: 15, 14: 6, 15: 5, 16: 1, 27: 1, 17: 1, 18: 1, 22: 1})
"""
