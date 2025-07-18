from qwen_agent.agents import Assistant
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

    tools = [{
        "mcpServers": {
            "star": {
                "command": "uvx",
                "args": ["mcp-star-demo==0.1.1"]
            }
        }
    }]

    system = """
        你是一个智能助理，根据用户需求完成相关任务
        """

    bot = Assistant(
        llm=llm_cfg,
        name='智能助理',
        description='根据用户需求完成相关任务',
        system_message=system,
        function_list=tools,
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