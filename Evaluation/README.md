# RAG 评测

## RAGChecker
github: https://github.com/amazon-science/RAGChecker/tree/main    
安装命令： pip install ragchecker

命令行方式：agchecker-cli --input_path=examples/checking_inputs.json --output_path=output.json --metrics all_metrics --extractor_api_base http://172.18.140.13:8003/v1 --extractor_name hosted_vllm/llama2 --checker_api_base http://172.18.140.13:8003/v1 --checker_name hosted_vllm/llama2

python API方式：    
```python
from ragchecker import RAGChecker
evaluator = RAGChecker(extractor_name="llama3-70b", checker_name="llama3-70b")
results = evaluator.evaluate(rag_data, metrics=["hallucination", "faithfulness"])
```
* gt_answer 是什么意思？ 真实答案

## RAGAS