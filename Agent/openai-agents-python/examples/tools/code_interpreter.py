import asyncio

from agents import Agent, CodeInterpreterTool, Runner, trace

from agents import OpenAIChatCompletionsModel, OpenAIResponsesModel, OpenAIProvider
from openai import AsyncOpenAI, OpenAI
model = OpenAIResponsesModel(
    model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
    openai_client= OpenAI(
        base_url="http://172.17.124.33:9528/v1", 
        api_key="EMPTY"
    )
)

async def main():
    agent = Agent(
        model=model,
        name="Code interpreter",
        instructions="You love doing math.",
        tools=[
            CodeInterpreterTool(
                tool_config={"type": "code_interpreter", "container": {"type": "auto"}},
            )
        ],
    )

    with trace("Code interpreter example"):
        print("Solving math problem...")
        result = Runner.run_streamed(agent, "What is the square root of 273 * 312821 plus 1782?")
        async for event in result.stream_events():
            if (
                event.type == "run_item_stream_event"
                and event.item.type == "tool_call_item"
                and event.item.raw_item.type == "code_interpreter_call"
            ):
                print(f"Code interpreter code:\n```\n{event.item.raw_item.code}\n```\n")
            elif event.type == "run_item_stream_event":
                print(f"Other event: {event.item.type}")

        print(f"Final output: {result.final_output}")


if __name__ == "__main__":
    asyncio.run(main())
