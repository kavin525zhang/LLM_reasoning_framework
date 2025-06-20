# E²GraphRAG: Streamlining Graph-based RAG for High Efficiency and Effectiveness

E²GraphRAG is a lightweight and modular framework designed to enhance both **efficiency** and **effectiveness** in Graph-based Retrieval-Augmented Generation (RAG). It streamlines the pipeline from document parsing to answer generation via structured graph reasoning.

## 📁 Project Structure

```
.
├── README.md
├── requirements.txt
├── main.py
├── build_tree.py
├── dataloader.py
├── extract_graph.py
├── GlobalConfig.py
├── process_utils.py
├── prompt_dict.py
├── query.py
└── utils.py
```

## 📦 Datasets

We use data from:

- [📚 NovelQA](https://huggingface.co/datasets/NovelQA/NovelQA)
  Partly open-source, to obtain the full dataset, please *access via a request to the original authors.*
- [🔁 InfiniteBench](https://github.com/OpenBMB/InfiniteBench)
  *Fully open-source and publicly available.*

You can find how to obtain the data in the `./data/README.md`.

> **Note:** After obtaining the datasets, specify the data path when initializing the `Dataloader` class.

## 🚀 Getting Started

### 1. Install Dependencies

Ensure your environment is set up by installing the required packages:

```bash
pip install -r requirements.txt
```

### 2. Run the Pipeline

The entire pipeline—tree construction, graph extraction, and answer generation—is executed via `main.py`.

Step-by-step:

1. Create a config file

> Prepare a YAML configuration file to define key parameters.

> 👉 Example: `./configs/example_config.yaml`

2. Run the pipeline

> ```
> bash
> python main.py --config <path_to_config_file>
> ```

## 📬 Contact & Citation

If you use this code or find it helpful in your research, please consider citing our work. For questions or dataset access (NovelQA), please contact the original authors.
