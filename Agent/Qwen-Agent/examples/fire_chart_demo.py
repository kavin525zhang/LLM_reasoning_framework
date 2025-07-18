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
            "mcp-server-chart": {
                "command": "npx",
                "args": ["-y", "@antv/mcp-server-chart"]
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
            "公司四个季度的营收分别是100, 500, 230, 1000, 请绘制成柱状图",
        ]
    }
    WebUI(
        bot,
        chatbot_config=chatbot_config,
    ).run()

if __name__ == '__main__':
    run_query()