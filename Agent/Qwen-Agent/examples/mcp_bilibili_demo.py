from qwen_agent.agents import Assistant, Router
from qwen_agent.utils.output_beautify import typewriter_print
def init_agent_service():
    llm_cfg = {
        "model": "/mnt/disk2/yr/Qwen2.5-72B-Instruct",
        "model_server": "http://172.17.124.33:9528/v1", 
        "api_key": "EMPTY",
        'generate_cfg': {
            'top_p': 0.8
        }
    }

    tools_bilibili = [{
        "mcpServers": {
            "bilibili-search": {
                "command": "npx",
                "args": ["bilibili-mcp"],
                "description": "B站视频搜索 MCP 服务，可以在AI应用中搜索B站视频内容。"
            }
        }
    }]

    system = """
        你是一个智能助理，根据用户的需求做出相应的处理
        """

    bot_bilibili = Assistant(
        llm=llm_cfg,
        name='B站助理',
        description='B站视频搜索 MCP 服务，可以在AI应用中搜索B站视频内容。',
        system_message=system,
        function_list=tools_bilibili,
    )

    tools_browser = [{
        "mcpServers": {
            "browser": {
                "command": "npx",
                "args": ["@agent-infra/mcp-server-browser@latest"],
                # "description": "B站视频搜索 MCP 服务，可以在AI应用中搜索B站视频内容。"
            }
        }
    }]

    bot_browser = Assistant(
        llm=llm_cfg,
        name='搜索助理',
        description='可通过浏览器访问可访问性数据',
        system_message=system,
        function_list=tools_browser
    )

    bot = Router(
        llm=llm_cfg,
        agents=[bot_bilibili, bot_browser]
    )

    return bot


def run_query(query=None):
    # 定义数据库助手
    bot = init_agent_service()

    from qwen_agent.gui import WebUI

    chatbot_config = {
        'prompt.suggestions': [
            "Who was time's 2024 person of the year?",
            "summarize this video: https://www.youtube.com/watch?v=jNQXAC9IVRw"
        ]
    }
    WebUI(
        bot,
        chatbot_config=chatbot_config,
    ).run()

if __name__ == '__main__':
    run_query()