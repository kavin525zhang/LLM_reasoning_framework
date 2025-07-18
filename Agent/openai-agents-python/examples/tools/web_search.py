import asyncio

from agents import Agent, Runner, WebSearchTool, trace

from agents import OpenAIChatCompletionsModel, OpenAIResponsesModel, OpenAIProvider
from openai import AsyncOpenAI, OpenAI
model = OpenAIResponsesModel(
    model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
    openai_client= AsyncOpenAI(
        base_url="http://172.17.124.33:9528/v1", 
        api_key="EMPTY"
    )
)

async def main():
    agent = Agent(
        model=model,
        name="Web searcher",
        instructions="You are a helpful agent.",
        tools=[WebSearchTool(user_location={"type": "approximate", "city": "New York"})],
    )

    with trace("Web search example"):
        result = await Runner.run(
            agent,
            "search the web for 'local sports news' and give me 1 interesting update in a sentence.",
        )
        print(result.final_output)
        # The New York Giants are reportedly pursuing quarterback Aaron Rodgers after his ...


if __name__ == "__main__":
    asyncio.run(main())
