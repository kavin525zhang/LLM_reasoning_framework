from argparse import ArgumentParser
import os


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--type', '-t', type=str, default="huggingface") # huggingface or modelscope
    parser.add_argument('--name', '-n', type=str, default="MonkeyOCR") # MonkeyOCR or MonkeyOCR-pro-1.2B
    args = parser.parse_args()
    script_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_dir = os.path.join(script_dir, "model_weight")
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
    pp_dir = os.path.join(model_dir, "Structure/PP-DocLayout_plus-L")
    if not os.path.exists(pp_dir):
        os.makedirs(pp_dir)
    if args.type == "huggingface":
        from huggingface_hub import snapshot_download
        # snapshot_download(repo_id="echo840/"+args.name, local_dir=model_dir, local_dir_use_symlinks=False, resume_download=True)
        snapshot_download(repo_id="PaddlePaddle/PP-DocLayout_plus-L", local_dir=pp_dir, local_dir_use_symlinks=False, resume_download=True)
    elif args.type == "modelscope":
        from modelscope import snapshot_download
        snapshot_download(repo_id = 'l1731396519/'+args.name,local_dir=model_dir)
        snapshot_download(repo_id="PaddlePaddle/PP-DocLayout_plus-L", local_dir=pp_dir)
