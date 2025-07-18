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

"""A multi-agent cooperation example implemented by router and assistant"""

import os
from typing import Optional

from qwen_agent.agents import Assistant, ReActChat, Router
from qwen_agent.gui import WebUI

ROOT_RESOURCE = os.path.join(os.path.dirname(__file__), 'resource')


def init_agent_service():
    # settings
    llm_cfg_qa = {
        "model": "/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct",
        "model_server": "http://172.17.124.12:8024/v1",  # base_url, also known as api_base
        "api_key": "EMPTY"
    }
    llm_cfg_cs = {
        "model": "/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct",
        "model_server": "http://172.17.124.12:8024/v1",  # base_url, also known as api_base
        "api_key": "EMPTY"
    }
    # tools = ['image_gen', 'code_interpreter']
    tools = [
        {
            'mcpServers': {  # You can specify the MCP configuration file
                "DataSource": {
                    "command": "fastmcp",
                    "args": [
                        "run",
                        "/home/transwarp/Documents/workspace/private/LLM_reasoning_framework/Agent/Qwen-Agent/examples/recall_service.py"
                    ],
                    "disabled": True,
                    "alwaysAllow": []
                }
            }
        }
    ]

    # Define a vl agent
    bot_vl = Assistant(llm=llm_cfg_cs, name='客服助手', description='用于用户询问公司产品文档、官网，或是内部培训材料。')

    # Define a tool agent
    bot_tool = ReActChat(
        llm=llm_cfg_qa,
        name='通用问答',
        description='结合公司年报、财联社新闻和网络检索，用于用户提问通识性知识、垂类领域问题以及最新新闻资讯等',
        function_list=tools,
    )

    # Define a router (simultaneously serving as a text agent)
    bot = Router(
        llm=llm_cfg_qa,
        agents=[bot_vl, bot_tool],
    )
    return bot


def test(query: str = 'hello'):
    # Define the agent
    bot = init_agent_service()

    # Chat
    messages = []

    messages.append({'role': 'user', 'content': query})
   
    content = ""
    for response in bot.run(messages):
        content = response
        #print('bot response:', response)

    print(content)


def app_tui():
    # Define the agent
    bot = init_agent_service()

    # Chat
    messages = []
    while True:
        query = input('user question: ')
        # Image example: https://dashscope.oss-cn-beijing.aliyuncs.com/images/dog_and_girl.jpeg
        image = input('image url (press enter if no image): ')
        # File example: resource/poem.pdf
        file = input('file url (press enter if no file): ').strip()
        if not query:
            print('user question cannot be empty！')
            continue
        if not image and not file:
            messages.append({'role': 'user', 'content': query})
        else:
            messages.append({'role': 'user', 'content': [{'text': query}]})
            if image:
                messages[-1]['content'].append({'image': image})
            if file:
                messages[-1]['content'].append({'file': file})

        response = []
        for response in bot.run(messages):
            print('bot response:', response)
        messages.extend(response)


def app_gui():
    bot = init_agent_service()
    chatbot_config = {
        'verbose': True,
    }
    WebUI(bot, chatbot_config=chatbot_config).run()


if __name__ == '__main__':
    test(query="利用客服助手回答星环科技发布的kundb与市面上mysql有什么优势")
    # app_tui()
    # app_gui()
