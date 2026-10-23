"""Agent loop (section 1): the core while-loop, and the conversation around it.

Two nested loops. The inner loop is one user turn: call the model, and while it
asks for a tool, run the tool, feed the result back as a `tool_result`, and call
again; stop when it does not. The outer loop is the conversation: the SAME
`messages[]` persists, and each new user turn is appended to it, so the model
sees every prior message exactly on the next call. `run_turn` is the inner loop;
the caller owns `messages` and drives the outer one (see demo.py).

The loop speaks the Anthropic Messages format directly (content blocks,
`tool_use`, `tool_result`), so `model` is just a thin call to
client.messages.create. Swap that one function and run_turn is unchanged.
Sections 2 to 11 carry this file forward and evolve it.
"""
from __future__ import annotations

from dataclasses import dataclass, field
import json

import context
import permissions
from hooks import Hooks
from tools import Registry, run_tool
import background


@dataclass
class Session:
    """Mutable harness state that outlives a turn."""
    mode: str = permissions.DEFAULT
    allow_rules: set = field(default_factory=set)
    todos: list = field(default_factory=list)

def run_turn(messages, 
             model, 
             registry: Registry,
             session: Session,
             hooks: Hooks | None = None,
             approver=None,
             summarizer=None,
             memory=None,
             runtime=None,
             max_steps=20):
    hooks = hooks or Hooks()
    approver = approver or (lambda name, args: False)

    background.drain_into(messages, runtime)  # 13 · fold in any background completions

    if memory is not None:
        user_text = messages[-1]["content"]  # the new user turn (already appended)
        recalled = memory.recall(user_text)  # 9 · inject relevant memories (read-only)
        if recalled:
            messages[-1]["content"] = f"<system-reminder>\n{recalled}\n</system-reminder>\n\n{user_text}"
    
    for _ in range(max_steps):                  # ponytail: max_steps is the no-infinite-loop backstop
        messages = context.manage(messages, summarizer=summarizer)
        print("messages:", messages)
        response = model(messages, registry)              # one model call -> an Anthropic Message
        assistant_msg = response.choices[0].message
        print("assistant_msg:{}".format(assistant_msg))

        messages.append(assistant_msg.model_dump(exclude_unset=True))

        if not assistant_msg.tool_calls:
            if memory is not None:
                memory.write(messages)
            return assistant_msg.content or ""
        
        # 处理工具调用
        results = [_dispatch(b, registry, session, hooks, approver)
                   for b in assistant_msg.tool_calls]
        messages.extend(results)

    raise RuntimeError("hit max_steps without end_turn")  # the no-stop-condition failure mode


def _dispatch(tool_call, 
              registry,
              session,
              hooks, 
              approver):
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    tool = registry.get(name)
    res = lambda content: {"role": "tool", "tool_use_id": tool_call.id, "content": content}
    if tool is None:
        return res(f"error: no tool {name!r}")

    blocked, args, msg = hooks.fire_pre(name, args)
    if blocked:
        return res(msg)

    decision = permissions.decide(tool, session.mode, session.allow_rules)
    if decision == "deny":
        return res(f"{name} not allowed in {session.mode} mode")
    if decision == "ask" and not approver(name, args):
        return res(f"{name} denied by user")

    out = res(run_tool(tool, args))
    hooks.fire_post(name, args, out)
    return out


def final_text(response):
    """The model's last words: concatenate its text blocks."""
    return "".join(b.text for b in response.content if b.type == "text")
