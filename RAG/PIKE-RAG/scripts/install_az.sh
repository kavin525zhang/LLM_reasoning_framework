#!/usr/bin/env bash

pip install azure-storage-blob azure-identity azure-keyvault
wget https://aka.ms/InstallAzureCLIDeb
sudo bash InstallAzureCLIDeb
rm InstallAzureCLIDeb
