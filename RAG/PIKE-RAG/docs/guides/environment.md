# Environment Setup

## Clone This Repository

```sh
git clone https://github.com/microsoft/PIKE-RAG.git
```

## Set Up Python Environment

Create a Python environment for this repo, and install the basic package requirements:

```sh
pip install -r requirements.txt
pip install -r examples/requirements.txt
```

## Set Up the `PYTHONPATH` Before Running

In Windows,

```powershell
$Env:PYTHONPATH=PATH-TO-THIS-REPO

# If you exactly under this repository directory, you can do it by
$Env:PYTHONPATH=$PWD
```

In Linux / Mac OS,

```sh
export PYTHONPATH=PATH-TO-THIS-REPO

# If you are exactly under the repository directory, you can do it by
export PYTHONPATH=$PWD
```

*Return to the main [README](https://github.com/microsoft/PIKE-RAG/blob/main/README.md)*
