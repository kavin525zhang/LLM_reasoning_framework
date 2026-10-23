"""Permission gate (section 3): the allow / ask / deny decision between a
model's tool request and execution. Introduced in section 3, then carried
forward unchanged. Modes mirror Claude Code's types/permissions.ts.
"""
from __future__ import annotations

DEFAULT, ACCEPT_EDITS, PLAN, BYPASS = "defaults", "acceptEdits", "plan", "bypassPermissions"

def decide(tool, mode: str, allow_rules: set) -> str:
    """Return 'allow', 'ask', or 'deny' for running `tool` under `mode`."""
    # 放行
    if mode == BYPASS:
        return "allow"

    if mode == PLAN:
        if tool.is_read_only:
            return "allow"
        if tool.name == "ExitPlanMode":
            return "ask"
        return "deny"

    if tool.is_read_only or tool.name in allow_rules:
        return "allow"

    if mode == ACCEPT_EDITS and tool.is_edit:
        return "allow"

    return "ask"