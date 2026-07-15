from langchain.chat_models import init_chat_model
from deepagents import create_deep_agent

agent = create_deep_agent(
    model=init_chat_model(
        model="Qwen2.5-72B-Instruct",
        model_provider="openai",
        base_url="http://172.17.124.34:9528/v1",
        api_key="EMPTY"
    )
)
result = agent.invoke({"messages": [{"role": "user", "content": "Research LangGraph and write a summary"}]})
print(result)