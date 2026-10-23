"""Section 1 demo: a two-turn conversation over one persistent messages[],
against the Anthropic API. Offline checks live in test.py.

    uv run python sections/01-agent-loop/src/demo.py    (needs ANTHROPIC_API_KEY; see root README)
"""
import os

#from anthropic import Anthropic
import openai
from dotenv import load_dotenv
from pathlib import Path
import shutil
import tempfile
import subprocess
import time

from hooks import PRE_TOOL_USE, Hooks
from loop import Session, run_turn
from permissions import BYPASS, DEFAULT, ACCEPT_EDITS
from planning import todo_tool, exit_plan_mode_tool
from skills import catalog_prompt, load_skills, read_tool, write_tool
from memory import Store, log_run, search_tool
from tools import Registry, Tool
from subagents import agent_tool
from tasks import task_tools, TaskStore
from background import Runtime, backgroundable

load_dotenv(override=True)

SYSTEM_PROMPT = "You are a tiny agent. Use the provided tools to answer. Be brief."
MODEL = os.environ.get("VLLM_MODEL", "llama2")
BUNDLED = Path(__file__).resolve().parent / "skills"   # Claude Code scans .claude/skills
SEEDS = [
    ("style-tabs", "feedback", "User prefers tabs not spaces for indentation.", "Indent with tabs."),
    ("deploy-fri", "project", "Never deploy on Fridays.", "Releases wait for Monday.")
]

def demo():
    if not os.environ.get("VLLM_BASE_URL"):
        print("12 tasks: set ANTHROPIC_API_KEY to run the live demo (offline checks: test.py)")
        return

    client = openai.OpenAI(base_url=os.environ.get("VLLM_BASE_URL"),
                           api_key=os.environ.get("VLLM_API_KEY"))

    def model(messages, registry):                          # the injected model; swap it, keep run_turn()
        return client.chat.completions.create(model=MODEL,
                                              messages=messages,
                                              tools=registry.schemas(),
                                              tool_choice="auto" if registry.schemas() else None,
                                              max_tokens=1024)

    runtime = Runtime()
    session = Session(mode=DEFAULT, allow_rules={"Bash"})

    def sh(a):  # a plain shell tool for the child
        return subprocess.run(a["command"], shell=True, capture_output=True, text=True, timeout=120).stdout.strip()

    bash = Tool("Bash", sh, description="Run a shell command.",
                input_schema={"type": "object", "properties": {"command": {"type": "string"}},
                              "required": ["command"]})

    # the child subagent's own toolset: it runs shell inline, and has no Agent tool, so it can't recurse
    child = Registry()
    child.register(bash)

    reg = Registry()
    # backgroundable wraps the WHOLE agent: one call runs a full sub-loop off the main loop
    reg.register(backgroundable(agent_tool(model, child, session), runtime))   

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "Launch a background subagent to count the files in /etc with shell. Just tell me you started it, do not wait for it."}
    ] 

    answer = run_turn(messages, 
                        model, 
                        reg, 
                        session,
                        runtime=runtime)

    print("13 background -> turn 1:", answer)

    for _ in range(60):                                    # let the whole subagent run its own loop off-loop
        if runtime.state(1) != "running":
            break
        time.sleep(0.5)

    messages.append({"role": "user", "content": "Did the background subagent finish? What did it find?"})
    print("13 background -> turn 2:", run_turn(messages, model, reg, session, runtime=runtime))


if __name__ == "__main__":
    demo()
