# SGLang Detail
github: https://github.com/sgl-project/sglang

# 环境准备
sgl-kernel=0.0.2.post11
sglang=0.4.1.post4
torchao=0.11.0
torch=2.4.0
python=3.12.0
flashinfer=0.1.6+cu121torch2.4

# 运行命令
## 单节点
python -m sglang.launch_server --model /mnt/disk2/yr/Qwen2.5-72B-Instruct --host 172.17.124.33 --port 9528 --tp 4

## 多节点
python3 -m sglang.launch_server
 --model-path /root/.cache/huggingface/deepseek
 --tp 32 --dist-init-addr xxxx --nnodes 4 
 --node-rank 0 --trust-remote-code --host 0.0.0.0 --port 4000 
 
 * --model-path /root/.cache/huggingface/deepseek 路径名称
 * --tp  需要被模型头整除 模型头数量可以在模型文件config.json中查看  张量并行
 * --dist-init-addr  主节点地址
 * --nnodes 4 有几个节点
 * --node-rank 第几个节点  从0开始
 * --host 0.0.0.0 --port 4000  模型访问端口

# 参考资料
[SGLang安装教程](https://blog.csdn.net/weixin_39806242/article/details/145320296)
[MCP-Chinese](https://github.com/liaokongVFX/MCP-Chinese-Getting-Started-Guide)
