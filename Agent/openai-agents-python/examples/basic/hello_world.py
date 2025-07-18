import asyncio

from agents import Agent, Runner

from agents import OpenAIChatCompletionsModel, OpenAIResponsesModel, OpenAIProvider
from openai import AsyncOpenAI, OpenAI
model = OpenAIChatCompletionsModel(
    model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
    openai_client= AsyncOpenAI(
        base_url="http://172.17.124.33:9528/v1", 
        api_key="EMPTY"
    )
)

async def main():
    agent = Agent(
        model=model,
        name="Assistant",
        instructions="You only respond in haikus.",
    )

    result = await Runner.run(agent, "Tell me about recursion in programming.")
    print(result.final_output)
    # Function calls itself,
    # Looping in smaller pieces,
    # Endless by design.


if __name__ == "__main__":
    asyncio.run(main())
