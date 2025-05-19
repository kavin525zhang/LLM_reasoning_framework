import copy
import json
from typing import Optional

import requests

# api = "http://172.18.144.44:8003/openai/v1/chat/completions"
# api = "http://127.0.0.1:8003/openai/v1/chat/completions"
api = "http://172.17.120.200:8003/openai/v1/chat/completions"
tools = [
    {
        "type": "function",
        "function": {
            "name": "calc_month_by_month",
            "description": "Calc sale increase rate month by month.",
            "parameters": {
                "type": "object",
                "properties": {
                    "last_month_sale": {
                        "type": "number",
                        "description": "last month sale amount"
                    },
                    "this_month_sale": {
                        "type": "number",
                        "description": "this month sale amount"
                    }
                },
                "required": ["code"],
                "additionalProperties": False
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calc_year_by_year",
            "description": "Calc sale increase rate year by year.",
            "parameters": {
                "type": "object",
                "properties": {
                    "last_year_sale": {
                        "type": "number",
                        "description": "last year sale amount"
                    },
                    "this_year_sale": {
                        "type": "number",
                        "description": "this year sale amount"
                    }
                },
                "required": ["code"],
                "additionalProperties": False
            }
        }
    }
]
payload = {
    "model": "llama2",
    "messages": [
        {
            "role": "user",
            "content": "上个月销售额是五万八千快，去年这个月是四万八千块，这个月是六万三千块，帮我计算环比增长额。"
        }
    ],
    "tools": [],
    "tool_choice": {
        "type": "function",
        "function": {
            "name": "calc_month_by_month"
        }
    },
    "temperature": 0.5,
    "max_tokens": 1280,
    "stream": False
}


def qwen_system_prompt_preprocessor(req: dict, lang: str = "zh", c_tool: Optional[None | str] = None):
    sys_template_map = {
        "nr": "You are a helpful assistant.",
        "zh": "You are a helpful assistant.\n\n# 工具\n\n## 你拥有如下工具：{}",
        "en": "You are a helpful assistant.\n\n# Tools\n\n## You have access to the following tools:{}"
    }
    tool_template_map = {
        "zh": "\n\n### {}\n\n{}: {} 输入参数：{} 此工具的输入应为JSON对象。",
        "en": "\n\n### {}\n\n{}: {} Parameters: {} Format the arguments as a JSON object."
    }

    if c_tool == "do_nothing":
        req["messages"] = [{
            "role": "system",
            "content": sys_template_map["nr"]
        }] + req["messages"]
        return req

    sys_template = sys_template_map[lang]
    tool_template = tool_template_map[lang]
    # 输入 None = 选择所有 tool
    used_tools = copy.deepcopy(tools)
    # 输入 str 选择对应名称 tool
    if c_tool is not None:
        used_tools = [i for i in used_tools if i["function"]["name"] == c_tool]
    # 二度匹配验证
    if len(used_tools) == 0:
        req["messages"] = [{
            "role": "system",
            "content": sys_template_map["nr"]
        }] + req["messages"]
        return req

    # 构造 Qwen2 专用 System prompt
    tools_prompt = "".join([
        tool_template.format(tool["function"]["name"], tool["function"]["name"], tool["function"]["description"],
                             json.dumps(tool["function"]["parameters"], ensure_ascii=False))
        for tool in tools
    ])
    sys_prompt = sys_template.format(tools_prompt)
    req["messages"] = [{
        "role": "system",
        "content": sys_prompt
    }] + req["messages"]
    # 添加 tools 相关 key-value
    req["tools"] = used_tools
    # 有这个字段才会触发约束解码
    req["tool_choice"] = {
        "type": "function",
        "function": {
            "name": c_tool
        }
    }
    return req


def function_calling_postprocessor(req, eval_result, c_tool):
    pre_req = qwen_system_prompt_preprocessor(req, c_tool=c_tool)
    pre_req["messages"].append({
        "role": "tool",
        "content": eval_result
    })
    # 不需要激活约束解码，只需要 system prompt
    del pre_req["tool_choice"]
    return pre_req


def function_choice_preprocessor(req):
    pre_req = qwen_system_prompt_preprocessor(req)
    pre_req["guided_choice"] = [
                                   tool["function"]["name"]
                                   for tool in req["tools"]
                               ] + ["do_nothing"]
    pre_req["messages"][-1]["content"] = "请根据这个问题选择合适的执行工具，如果不需要工具则返回“do_nothing”：{}".format(
        req["messages"][-1]["content"])
    del pre_req["tools"]
    del pre_req["tool_choice"]
    return pre_req


def calc_month_by_month(last_month_sale, this_month_sale):
    return 100 * (this_month_sale - last_month_sale) / last_month_sale


if __name__ == "__main__":
    # 0. 判断是否需要使用工具（这时候需要传递所有工具描述给 LLM）
    choice = requests.post(api, json=function_choice_preprocessor(copy.deepcopy(payload))).json()
    choice_tool = choice["choices"][0]["message"]["content"]
    print(f"模型判断选择工具：{choice_tool}")
    # print(json.dumps(choice, indent=2, ensure_ascii=False))

    # 1. 构造工具 payload 请求 LLM 解析工具实参（只传递选中的工具）
    result = requests.post(api, json=qwen_system_prompt_preprocessor(copy.deepcopy(payload), c_tool=choice_tool)).json()
    tool_args = json.loads(result["choices"][0]["message"]["tool_calls"][0]["function"]["arguments"])
    print(f"模型抽取工具实参：{tool_args}")
    # print(json.dumps(result, indent=2, ensure_ascii=False))

    # 2. 根据返回实参调用工具得到结果
    calc_result = calc_month_by_month(tool_args.get('last_month_sale'), tool_args.get('this_month_sale'))
    calc_result = f"工具 {choice_tool} 计算结果：{calc_result:.2f} %"
    print(calc_result)

    # 3. 工具结果拼回会话完成完善回答（prompt 的 role=tool 已经渲染成功，但可能不生效）
    result = requests.post(api, json=function_calling_postprocessor(copy.deepcopy(payload),
                                                                    calc_result,
                                                                    c_tool=choice_tool)).json()
    final_result = result["choices"][0]["message"]["content"]
    print(f"模型最终回答：{final_result}")
    # print(json.dumps(result, indent=2, ensure_ascii=False))
