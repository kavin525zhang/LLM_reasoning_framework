#!/usr/bin/env python3
"""Minimal FFmpeg executor for Docker container"""

import subprocess
import sys
import json
import os
from pathlib import Path

def main():
    if len(sys.argv) < 2:
        print("Usage: ffmpeg_executor.py <command_json> OR <direct_args...>", file=sys.stderr)
        sys.exit(1)

    try:
        if len(sys.argv) == 2 and (sys.argv[1].startswith('{') or sys.argv[1].startswith('[')):
            cmd_data = json.loads(sys.argv[1])
            cmd = cmd_data['command']
            working_dir = cmd_data.get('working_dir', '/workspace')
        else:
            cmd = sys.argv[1:]
            working_dir = '/workspace'

        Path(working_dir).mkdir(parents=True, exist_ok=True)
        os.chdir(working_dir)

        # FIXED: Create output directory
        Path("/workspace/output").mkdir(parents=True, exist_ok=True)

        print(f"Executing: {' '.join(cmd)}")
        print(f"Working directory: {working_dir}")

        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.stdout:
            print("STDOUT:", result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)

        if result.returncode != 0:
            print(f"FFmpeg failed with return code {result.returncode}", file=sys.stderr)
            print(f"Full error: {result.stderr}", file=sys.stderr)
            sys.exit(result.returncode)

        print("Command completed successfully")

    except json.JSONDecodeError as e:
        print(f"Invalid JSON in command argument: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()