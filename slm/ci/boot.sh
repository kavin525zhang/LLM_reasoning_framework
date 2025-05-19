#!/bin/bash

cd /app || exit
python main.py >> /var/log/model-server-console.log
