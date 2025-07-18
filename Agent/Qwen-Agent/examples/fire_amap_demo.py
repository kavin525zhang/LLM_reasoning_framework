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
            "firecrawl-mcp": {
                "command": "npx",
                "args": ["-y", "firecrawl-mcp"],
                "env": {
                    "FIRECRAWL_API_KEY": "fc-240c33fff0db4ccaa7e3fe9229f0c851"
                },
            },
        },

    },
    ]

    system = """
        你是一个规划师和数据分析师,可以提取网页信息进行数据分析
        """

    bot = Assistant(
        llm=llm_cfg,
        name='智能助理',
        description='具备查询高德地图、提取网页信息、数据分析的能力',
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
            # "https://github.com/orgs/QwenLM/repositories 提取这一页的Markdown 文档，然后绘制一个柱状图展示每个项目的收藏量",
            "https://baijiahao.baidu.com/s?id=1837617358440439706 总结这一页的主要内容"
        ]
    }
    WebUI(
        bot,
        chatbot_config=chatbot_config,
    ).run()

if __name__ == '__main__':
    run_query()