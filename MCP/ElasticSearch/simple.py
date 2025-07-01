import sys
import asyncio

from mcp.client.stdio import stdio_client
from mcp import ClientSession, StdioServerParameters

# 设置服务器连接参数
server_params = StdioServerParameters(
    command="python",
    args=[sys.argv[1]]
)

async def run():
    # 建立服务器连接
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # 初始化连接
            await session.initialize()

            # 列出可用工具
            tools = await session.list_tools()
            print("Tools:", tools)

            # 调用工具
            indices = await session.call_tool("list_indices")
            print("Indices:", indices)

if __name__ == "__main__":
    asyncio.run(run())