# Copyright 2023 The Qwen team, Alibaba Group. All rights reserved.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""An agent implemented by assistant with qwen3"""
import os  # noqa

from qwen_agent.agents import Assistant
from qwen_agent.gui import WebUI
from qwen_agent.utils.output_beautify import typewriter_print


def init_agent_service():
    llm_cfg = {
        'model': '/infinity/models/qwen2.5/Qwen2.5-72B-Instruct',
        'model_server': 'http://172.17.124.31:8024/v1',  # base_url, also known as api_base
        'api_key': 'EMPTY'
    }
    tools = [
        {
            'mcpServers': {  # You can specify the MCP configuration file
                "DataSource": {
                    "command": "fastmcp",
                    "args": [
                        "run",
                        "/mnt/disk2/kavin/Qwen-Agent/examples/recall_service.py"
                    ],
                    "disabled": True,
                    "alwaysAllow": []
                }
            }
        }
    ]
    bot = Assistant(llm=llm_cfg,
                    function_list=tools,
                    name='Qwen3 Tool-calling Demo',
                    description="I'm a demo using the Qwen3 tool calling. Welcome to add and play with your own tools!")

    return bot


def test(query: str = '星环科技最近有哪些项目落地'):
    # Define the agent
    bot = init_agent_service()

    # Chat
    messages = [{'role': 'user', 'content': query}]
    response_plain_text = ''
    for response in bot.run(messages=messages):
        response_plain_text = typewriter_print(response, response_plain_text)


def app_tui():
    # Define the agent
    bot = init_agent_service()

    # Chat
    messages = []
    while True:
        query = input('user question: ')
        messages.append({'role': 'user', 'content': query})
        response = []
        response_plain_text = ''
        for response in bot.run(messages=messages):
            response_plain_text = typewriter_print(response, response_plain_text)
        messages.extend(response)


def app_gui():
    # Define the agent
    bot = init_agent_service()
    chatbot_config = {
        'prompt.suggestions': [
            'What time is it?',
            'https://github.com/orgs/QwenLM/repositories Extract markdown content of this page, then draw a bar chart to display the number of stars.'
        ]
    }
    WebUI(
        bot,
        chatbot_config=chatbot_config,
    ).run()


if __name__ == '__main__':
    # test()
    # app_tui()
    test()
