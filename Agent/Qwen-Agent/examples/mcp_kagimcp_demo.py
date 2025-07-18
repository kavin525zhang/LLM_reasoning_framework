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
            "kagi": {
                "command": "uvx",
                "args": ["kagimcp"],
                "env": {
                    "KAGI_API_KEY": "hGtoKfGgA1GmpPfnYzxRoWVu3lf37U2NItuTh6aLc2Y.-PFXhlvAD_kDM-LE3q47AIP27bvXO2QsY_xyoDQ1jk0"
                }
            }
        }
    }]

    system = """
        你是一个智能助理，可以根据用户提供数据和要求绘制图形
        """

    bot = Assistant(
        llm=llm_cfg,
        name='智能助理',
        description='具备绘制各种图形的能力',
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