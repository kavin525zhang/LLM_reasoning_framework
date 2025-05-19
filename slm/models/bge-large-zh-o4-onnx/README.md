# 如何获取 `bge-large-zh-o4-onnx` 模型

## 方式一

从我们的服务器上将`bge-large-zh-o4-onnx`模型目录中的所有内容拷贝至本目录中

## 方式二

手动从HF下载`bge-large-zh`模型，通过`optimum-cli`转化为onnx模型：

```shell
optimum-cli export onnx -m BAAI/bge-large-zh --optimize O4 bge-large-zh-o4-onnx --device cuda
```