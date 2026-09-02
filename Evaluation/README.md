# RAG 评测

## RAGChecker
github: https://github.com/amazon-science/RAGChecker/tree/main    
安装命令： pip install ragchecker

命令行方式：ragchecker-cli --input_path=examples/checking_inputs.json --output_path=output.json --metrics all_metrics

python API方式：    
```python
from ragchecker import RAGChecker
evaluator = RAGChecker(extractor_name="llama3-70b", checker_name="llama3-70b")
results = evaluator.evaluate(rag_data, metrics=["hallucination", "faithfulness"])
```


## RAGAS