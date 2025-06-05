import json
import asyncio
import os
from typing import Optional
from contextlib import AsyncExitStack

from openai import OpenAI
from dotenv import load_dotenv

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from langchain_core.utils.function_calling import convert_to_openai_function


load_dotenv()

class MCPClient:
    def __init__(self):
        self.session: Optional[ClientSession] = None
        self.exit_stack = AsyncExitStack()
        self.client = OpenAI(base_url="http://172.17.124.33:9528/v1",
                             api_key="None",
                             timeout=120)

    async def connect_to_server(self):
        server_params = StdioServerParameters(
            command='fastmcp',
            args=['run', './MCP/calculator_stdio.py'],
            env=None
        )

        stdio_transport = await self.exit_stack.enter_async_context(
            stdio_client(server_params))
        stdio, write = stdio_transport
        self.session = await self.exit_stack.enter_async_context(
            ClientSession(stdio, write))

        await self.session.initialize()

    async def process_query(self, query: str) -> str:
        # 这里需要通过 system prompt 来约束一下大语言模型，
        # 否则会出现不调用工具，自己乱回答的情况
        system_prompt = (
            "你是一个擅长解析问题的助手，你可以根据问题解析出解决这个问题要用哪一类工具，具体有以下几种工具："
            "add、 subtract、 multiply、divide，"
            "其中add用于加法、 subtract用于减法、multiply用于乘法、divide用于除法。"
            "再返回结果时你只需要返回工具名即可。"
        )
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]

        # 获取所有 mcp 服务器 工具列表信息
        response = await self.session.list_tools()
        # 生成 function call 的描述信息
        available_tools = [{
            "type": "function",
            "function": {
                "name": tool.name,
                "description": tool.description,
                "parameters": tool.inputSchema
            }
        } for tool in response.tools]

        # 请求 deepseek，function call 的描述信息通过 tools 参数传入
        print("available_tools:{}".format(available_tools))
        # print("available_tools:{}".format(available_tools))
        response = self.client.chat.completions.create(
            # model="/infinity/models/qwen2.5/Qwen2.5-72B-Instruct",
            model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
            messages=messages,
            # stream=True,
            tools=available_tools,
            tool_choice="auto",
            # max_tokens=4096,
            # temperature=0
        )
        print("response:{}".format(response))
        # 处理返回的内容
        content = response.choices[0]
        print("content.finish_reason:{}".format(content.finish_reason))
        if content.finish_reason == "tool_calls":
            # 如何是需要使用工具，就解析工具
            tool_call = content.message.tool_calls[0]
            tool_name = tool_call.function.name
            tool_args = json.loads(tool_call.function.arguments)

            # 执行工具
            result = await self.session.call_tool(tool_name, tool_args)
            print(f"\n\n[Calling tool {tool_name} with args {tool_args}]\n\n")
            print("result:{}".format(result))
			
            # 将 deepseek 返回的调用哪个工具数据和工具执行完成后的数据都存入messages中
            # messages.append(content.message.model_dump())
            messages.append({'content': "", 'refusal': "", 'role': 'user', 'audio': "", 'function_call': "", 'tool_calls': [{'id': '0', 'function': {'arguments': '{"a": 10, "b": 20}', 'name': 'add'}, 'type': 'function'}], 'reasoning_content': ""})
            messages.append({
                "role": "tool",
                "content": result.content[0].text,
                "tool_call_id": tool_call.id,
            })

            # 将上面的结果再返回给 deepseek 用于生产最终的结果
            response = self.client.chat.completions.create(
                #model="/infinity/models/qwen2.5/Qwen2.5-72B-Instruct",
                model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
                messages=messages
            )
            return response.choices[0].message.content

        return content.message.content
    
    async def chat_loop(self):
        while True:
            try:
                query = input("\nQuery: ").strip()

                if query.lower() == 'quit':
                    break

                response = await self.process_query(query)
                print("111111111\n" + response)

            except Exception as e:
                import traceback
                traceback.print_exc()

    async def cleanup(self):
        """Clean up resources"""
        await self.exit_stack.aclose()

async def main():
    client = MCPClient()
    try:
        await client.connect_to_server()
        await client.chat_loop()
    finally:
        await client.cleanup()


if __name__ == "__main__":
    import sys
    asyncio.run(main())


 # 10 / 20 =    
#  中国的首都是哪里？
# 结合Calculator的工具，计算10和20的和