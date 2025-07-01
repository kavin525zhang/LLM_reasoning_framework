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

from qwen_agent.agents import DialogueRetrievalAgent
from qwen_agent.gui import WebUI


def test():
    # Define the agent
    bot = DialogueRetrievalAgent(llm={
        'model': '/infinity/models/qwen2.5/Qwen2.5-72B-Instruct',
        'model_server': 'http://172.17.124.31:8024/v1',  # base_url, also known as api_base
        'api_key': 'EMPTY'})

    # Chat
    long_text = '，'.join(['小明的爸爸不是李磊'] * 1000 + ['小明的爸爸叫大头'] + ['小明的爸爸不是李磊'] * 1000)
    messages = [{'role': 'user', 'content': f'小明是谁的儿子？\n{long_text}'}]

    for response in bot.run(messages):
        print('bot response:', response)


def app_tui():
    bot = DialogueRetrievalAgent(llm={'model': 'qwen-max'})

    # Chat
    messages = []
    while True:
        query = input('user question: ')
        messages.append({'role': 'user', 'content': query})
        response = []
        for response in bot.run(messages=messages):
            print('bot response:', response)
        messages.extend(response)


def app_gui():
    # Define the agent
    bot = DialogueRetrievalAgent(llm={
        # 'model': '/infinity/models/qwen2.5/Qwen2.5-72B-Instruct',
        'model': '/mnt/nas_infinith/gyj/models/qwen2.5/Qwen2.5-72B-Instruct',
        'model_server': 'http://172.17.124.12:8024/v1',  # base_url, also known as api_base
        'api_key': 'EMPTY'
    })

    WebUI(bot).run()


if __name__ == '__main__':
    # test()
    # app_tui()
    app_gui()
