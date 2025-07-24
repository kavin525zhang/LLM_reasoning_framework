from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai.embeddings import OpenAIEmbeddings

# 初始化语义分块器
text_splitter = SemanticChunker(OpenAIEmbeddings())

# 将文档分割为语义相关的分块
docs = text_splitter.create_documents([document])
print(docs[0].page_content)