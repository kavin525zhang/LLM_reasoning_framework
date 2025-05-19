FROM nvidia/cuda:11.8.0-devel-ubuntu22.04

COPY /ci/libs/get-pip.py /tmp/get-pip.py
COPY requirements.txt /tmp/requirements.txt
RUN apt-get update && apt-get install -y python3.10 && \
    ln -s /usr/bin/python3.10 /bin/python && \
    python /tmp/get-pip.py
RUN pip install --no-cache-dir -r /tmp/requirements.txt -i https://pypi.mirrors.ustc.edu.cn/simple/

WORKDIR /app
COPY . /app
COPY /ci/boot.sh /app
RUN chmod 750 /app/boot.sh && ln -s /app/boot.sh /bin/boot.sh
CMD ["sh", "/bin/boot.sh"]
EXPOSE 8003
