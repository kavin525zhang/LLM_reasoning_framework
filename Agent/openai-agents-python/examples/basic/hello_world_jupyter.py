import asyncio
import uuid

from agents import Agent, Runner, trace, gen_trace_id, RunConfig, set_tracing_disabled

from agents import OpenAIChatCompletionsModel, OpenAIResponsesModel, OpenAIProvider
from openai import AsyncOpenAI, OpenAI
model = OpenAIChatCompletionsModel(
    model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
    openai_client= AsyncOpenAI(
        base_url="http://172.17.124.33:9528/v1", 
        api_key="EMPTY"
    )
)

# set_tracing_disabled(disabled=True)

agent = Agent(
    model=model,
    name="Assistant", 
    instructions="You are a helpful assistant"
)

# Intended for Jupyter notebooks where there's an existing event loop
async def main():
    while True:
        user_input = input("Enter your message: ")
        with trace("chat service"):
            result = await Runner.run(
                agent, 
                user_input
            )  # type: ignore[top-level-await]  # noqa: F704
            print(result.final_output)

asyncio.run(main())

# 再讲一个冷笑话

