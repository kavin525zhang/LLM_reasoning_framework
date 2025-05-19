# model server - ONNXRuntime 专用版

本分支专用于 ONNXRuntime 环境推理 SLM，已 drop 掉大模型相关支持，如需部署大模型请切换至 master 分支。  

## ONNX 模型取扱注意

目前所有 SLM 均已支持 ONNX 推理，推理速度为默认 HF 的 4~6 倍（O4 优化 fp16 下，使用 int8 性能 x2）。

需注意：

- 目前在一个 model-server 实例中启动多个 ONNX 模型可能存在推理失败的问题。
- ONNXRuntime 1.16.3 仅能在 CUDA 11.8 环境运行，对于 CUDA 12.x 请使用 ONNXRuntime 1.17+（性能不变，但存在 ABI 兼容问题） 

### 使用方式

0. 准备环境：

```
pip3 install torch torchvision torchaudio xformers --index-url https://download.pytorch.org/whl/cu118
pip3 install -r requirements.txt
pip install "optimum[onnxruntime-gpu]"
# 以下为可选安装，仅当出现 CUDA 11 相关依赖时安装，通常相关依赖会在 torch 安装时一并携入
conda install -c "nvidia/label/cuda-11.8.0" cuda-toolkit
```

1. 转换模型（输入为 HF 的模型名，输出文件夹名称需以 `-onnx` 结尾）：

```shell
optimum-cli export onnx -m BAAI/bge-reranker-large --optimize O4 bge-reranker-large-o4-onnx --device cuda
```

2. 修改配置文件，将 ONNX 模型文件夹填入配置文件块中的 `model_path`  
3. 运行 `main.py`

### 注意事项

1. OCR 模型依赖修改版 RapidOCR-ONNXRuntime；
2. Table 模型依赖修改版 RapidTable。

## 第三方兼容 API

### Xinference

在配置文件`config.json`中进行如下配置，即可开启 Xinference 兼容 API。
```json
{
    ...
    "integration": {
        "xinference": true
    }
}
```

当看到以下日志时，说明 API 开启成功。
```sh
INFO    Xinference integration enabled at: '/xinference'
```


在Dify等第三方平台添加 Xinference API 时，将 BASE_URL 设定为`http://IP:PORT/xinference`即可。