# RAG
## 基于语言模型的分块：精准捕捉文本结构
做法就是文本分块后，再结合全文和分块对每个分块生成上下文的总结性信息，最终与分块重新组合再一起，具体查看[chunk_split_by_llm.py](examples/chunk_split_by_llm.py)  
## 利用元数据：为检索增添更多上下文
## 语义分块：让信息更有意义

## RAGFlow
### 镜像准备
|  REPOSITORY  |  TAG  |  SIZE  |
|  ----  |  ----  |  ----  |
|  infiniflow/ragflow  |  v0.23.1  |  7.77GB  |
|  valkey/valkey  |  8  |  111MB  |
|  infiniflow/sandbox-executor-manager  |  latest  |  472MB  |
|  infiniflow/infinity  |  v0.6.4  |  836MB  |
|  quay.io/minio/minio  |  RELEASE.2025-06-13T11-33-47Z  |  175MB  |
|  opensearchproject/opensearch  |  2.19.1  |  1.45GB  |
|  mysql  |  8.0.39  |  573MB  |
|  kibana  |  8.11.3  |  1.03GB  |
|  elasticsearch  |  8.11.3  |  1.41GB  |




## 参考资料  
* [LightRAG](https://github.com/HKUDS/LightRAG)
* [GraphRAG](https://github.com/microsoft/graphrag)
* [E-2GraphRAG](https://github.com/YiboZhao624/E-2GraphRAG)
* [Retrieval-Augmented Generation (RAG): From Theory to LangChain Implementation](https://towardsdatascience.com/retrieval-augmented-generation-rag-from-theory-to-langchain-implementation-4e9bd5f6a4f2/)
* [RAG进阶技术！这十种方法你一定要知道](https://www.51cto.com/aigc/4926.html)
* [chunk分块实践篇](https://juejin.cn/post/7507192967069876265)
* [PIKE-RAG](https://github.com/microsoft/PIKE-RAG)
* [Soda](https://github.com/Liuziyu77/Soda/)
* [ragflow](https://github.com/infiniflow/ragflow)
