# NextGen PDF Parser
次世代 PDF 解析套件

## 依赖环境准备

### 运行时环境

以下部分已经包含在 docker 镜像 `infinity:nextgen-pdf-parser` 中，可直接使用
```shell
# 安装基础依赖
pip install -U "magic-pdf[full]"==0.8.1 --extra-index-url https://wheels.myhloli.com
# 删除无用的 AGPLv2 组件
pip uninstall magic-pdf ultralytics
```

上述镜像还未 push 到 hub 中，现已打好了 tar 包供直接使用, tar 包位置如下：
```
服务器IP：172.18.144.43
/mnt/disk1/lzk/nextgen-pdf-parser/deployment_source/nextgen-pdf-parser-0925-cu118+cu121.tar.gz

步骤：
cd /mnt/disk1/lzk/nextgen-pdf-parser/deployment_source
docker load -i nextgen-pdf-parser-0925-cu118+cu121.tar.gz
```

### 编译环境

```shell
# 启动镜像
docker compose -f docker-compose.build.yml up -d
# 进入容器
# 安装 Python 环境，参考 https://wiki.transwarp.io/pages/viewpage.action?pageId=106094661
sed -i 's/http:\/\/archive.ubuntu.com/https:\/\/mirror.sjtu.edu.cn/g' /etc/apt/sources.list
apt update
apt install python3 python3-pip python3-dev
pip config set global.index-url https://mirrors.ustc.edu.cn/pypi/web/simple
# 安装依赖
pip install nuitka
```

## 编译

### 编译步骤

1. 克隆最新的 magic-pdf 的 pack 分支：https://gitlab.transwarp.io/wuyaproject/magic-pdf/-/tree/pack
2. 将其中的 `magic_pdf` 目录拷贝到此项目根目录
3. 在编译环境中启动 `compile.sh` 脚本

## 部署
**_先根据 [运行时环境](#运行时环境) 准备好镜像_**

编译结束后的全部产物位于 `sdist` 目录中，一并产生的 `dist` 目录为缓存目录用于加速下一次编译，可以删除。  
创建一个新目录，例如 `deploy`，构建以下目录结构：
```shell
deploy
├── docker-compose.yml  # 从根目录拷贝
├── models              # 模型文件
│   ├── Layout
│   ├── MFD
│   ├── MFR
│   ├── README.md
│   └── TabRec
└── sdist               # 编译产物
    ├── config.py       # 服务配置文件，初次启动必须修改
    ├── core_worker
    ├── entrypoint.sh
    ├── layout_worker
    ├── mf_worker
    ├── ocr_worker
    ├── parser_worker
    ├── resources
    │   ├── fasttext-langdetect
    │   └── model_config  # 内部模型服务配置，初次启动必须修改
    ├── server.py
    └── tmp             # 空目录，用于存放临时文件 
```

**_修改 `deploy` 目录下 `sdist/config.py`_**

根据里面的注释和实机 CPU 与 GPU 情况修改其中配置

_**修改 `sdist/resources/model_config/model_configs.yaml` 当中的 `external_api`**_

各个服务的 IP 和 port 要改为适当的配置。其中 IP 就是部署的物理机地址，
除了 `latex_api`， 其余 port 和 `config.py` 中配置的端口一致。
```
external_api:
  ocr_url: http://172.18.144.43:5000/ocr-worker
  latex_api: http://172.18.144.43:9218
  enable_latex_api: True
  model_api: http://172.18.144.43:5000
  parse_page_api: http://172.18.144.43:5000/core-worker
```
## 启动
### 中文公式服务
参考 43 服务器 /mnt/disk1/dzg/tex-proxy

### nextgen-pdf-parser
进入 `deploy`目录，执行以下命令启动服务：
```shell
docker compose up -d
```

## 升级 MFR 模型

目前使用的 MFR 为 UniMERNet `0.1.6`，最新版本为 `0.2.1`。  
新版本相比当前版本大幅降低了显存资源开销（50%~80%），并保持了相对不错的准确率。  
以下是在不重新编译 mf_worker 的情况下更新模型的步骤：

### 修改模型
1. 下载新版本模型，也可以在 144.43 的 `/mnt/disk1/dzg/PDF-Extract-Kit/models/MFR` 找到
2. 修改模型目录名称，例如 `unimernet_tiny`->`UniMERNet`
3. 修改权重文件扩展名：`pytorch_model.pth`->`pytorch_model.bin`
4. 修改配置文件名称，例如 ：`unimernet_tiny.yaml`->`demo.yaml`
5. 修改配置文件 `demo.yaml` 中定义的路径，例如 ：`pretrained: './models/unimernet_base/pytorch_model.pth'`->`pretrained: './models/UniMERNet/pytorch_model.bin'`

### 部署：
1. 进入镜像，更新 UniMERNet：`pip install unimernet -U`
2. (可选) 保存镜像：`docker commit [container id] [tag]`
3. 拷贝模型目录，替换 `./models/MFR/UniMERNet` 为新版本
4. 使用 `./models/MFR/UniMERNet/demo.yaml` 替换 `./sdist/resources/model_config/UniMERNet/demo.yaml`
5. 重启服务，完成更新
