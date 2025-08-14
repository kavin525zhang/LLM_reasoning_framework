# Examples Introduction

## Pre-Prepared Workflow Scripts

There are 4 pre-prepared scripts under *examples/* folder that can be easily reused with only modification to *yaml config* files. They are:

### Document Chunking

It runs context-aware document chunking. A *yaml config* file is required, you can create a chunking yaml config refer to existing example *examples/biology/configs/chunking.yml*.

```sh
python examples/chunking.py PATH-TO-YAML-CONFIG
```

### Tagging

It can be used to tag domain-specific tags, or to add atomic-questions to chunks, or other similar tasks with specific prompt/protocol provided in *yaml config* file. You can create a tagging yaml config file refer to existing example like *examples/hotpotqa/configs/tagging.yml*.

```sh
python examples/tagging.py PATH-TO-YAML-CONFIG
```

### QA Workflow

It runs a complete pipeline for QA testing, from data-loading, to answer evaluation. If you want to test different algorithms, adjust the answer flow in Workflow and config it in *yaml file*. You can create a qa yaml config file refer to existing example like *examples/hotpotqa/configs/zero_shot_cot.yml*, *examples/hotpotqa/configs/atomic_decompose.yml*, ...

```sh
python examples/qa.py PATH-TO-YAML-CONFIG
```

### Evaluation Workflow

Once you process existing QA data in the format as we used, you can evaluate it with the evaluation pipeline. Modify the *examples/evaluate.yml* file or create a new one referring to it.

```sh
python examples/evaluate.py PATH-TO-YAML-CONFIG
```

*Return to the main [README](https://github.com/microsoft/PIKE-RAG/blob/main/README.md)*
