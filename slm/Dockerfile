FROM nvidia/cuda:12.2.2-devel-ubuntu22.04
ENV LANG C.UTF-8
ENV LC_CTYPE=C.UTF-8
ENV TZ=Asia/Shanghai
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

# Update package list and install prerequisites
RUN apt-get update && apt-get install -y \
    software-properties-common wget libgl1 libglib2.0-0 libsm6 libxrender1 libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Add deadsnakes PPA for Python 3.12
RUN add-apt-repository ppa:deadsnakes/ppa

# Install Python 3.12, pip, and development packages
RUN apt-get update && apt-get install -y \
    python3.12 \
    python3.12-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pip for Python 3.12
RUN wget https://bootstrap.pypa.io/get-pip.py && \
    python3.12 get-pip.py && \
    rm get-pip.py

# Set Python 3.12 as default python3
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt -i https://mirrors.bfsu.edu.cn/pypi/web/simple

COPY deps/*.whl /tmp/wheels/
RUN pip install /tmp/wheels/rapidocr-*.whl -i https://mirrors.bfsu.edu.cn/pypi/web/simple
RUN pip install /tmp/wheels/rapid_table-*.whl --no-deps

COPY models /models

COPY inferserver /app/inferserver
COPY configs /app/configs
COPY main.py /app
WORKDIR /app

CMD ["python3", "main.py"]