import asyncio
from langchain_openai import ChatOpenAI
from openai import OpenAI

client = OpenAI(base_url="http://172.17.124.33:9528/v1",
                api_key="None",
                timeout=120)

async def generate_contexts(document, chunks):
    async def process_chunk(chunk):
        response = client.chat.completions.create(
            model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
            messages=[
                {"role": "system", "content": "Generate a brief context explaining how this chunk relates to the full document."},
                {"role": "user", "content": f"<document> \n{document} \n</document> \nHere is the chunk we want to situate within the whole document \n<chunk> \n{chunk} \n</chunk> \nPlease give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else."}
            ],
            temperature=0.3,
            max_tokens=100
        )
        context = response.choices[0].message.content
        return f"{context} {chunk}"
    
    # 并行处理所有分块
    contextual_chunks = await asyncio.gather(
        *[process_chunk(chunk) for chunk in chunks]
    )
    print("contextual_chunksssssss:{}".format(contextual_chunks))
    return contextual_chunks

if __name__ == "__main__":
    document = "1.全球核心汽车市场进入中低速发展阶段\n美国、欧洲、日本等海外核心汽车市场已经进入饱和期。以美国为例，其千人汽车保有量达到868辆，近五年千人保有量年均增速不足1%。汽车交易已经由新购转向流通与换购，2023年美国二手车交易与新购车的比例为2.3:1。\n资料来源：OICA，公安部\n我国汽车市场出口增量加速，但内销增量放缓。1-6月，我国汽车销量1404.7万辆，同比增长6.1%，增长主要贡献来自出口，1-6月汽车出口279.3万辆，同比增长30.5%，对增量的贡献为81%。相比之下，1-6月国内汽车销量1125.5万辆，同比增长1.4%，对增量的贡献仅为19%。宏观经济、消费预期、需求变化等因素对国内汽车市场的进一步增长构成压力。\n宏观经济企稳回升，但未出现V型反弹。我国二季度不变价格GDP同比增长4.7%，不及去年同期，更低于疫情前水平；今年5-8月制造业PMI指数连续4个月低于50%荣枯线，经济修复仍需较长时间。\n消费预期偏弱，降级趋势明显。2024年6月消费者信心指数为86.2，低于疫情前水平（120以上）。我国居民财富70%来自不动产，2021年8月至2024年3月，70个大中城市二手住宅价格下跌10.7%。房地产等资产价格的下降使得财富效应减弱，汽车作为重要的消费品，受到宏观消费变化带来的影响。\n汽车购买性质和出行方式变化影响拥车。一方面刚需购车减少，2024年中国汽车市场首购需求占比46%，到2025将减少到38%左右。另一方面，网约车、无人驾驶出租车推动了出行共享化，出行方式的改变也减少了居民对汽车所有权的依赖。\n总的来说，我国汽车国内市场已经从高增长进入到中低增长阶段，预计2030年，内需口径下国内汽车销量2800万辆左右，保持着1.6%左右的潜在增速，汽车保有量将达到4.3亿辆，千人汽车保有量约300辆。"
    chunks = [
        "消费预期偏弱，降级趋势明显。2024年6月消费者信心指数为86.2，低于疫情前水平（120以上）。我国居民财富70%来自不动产，2021年8月至2024年3月，70个大中城市二手住宅价格下跌10.7%。房地产等资产价格的下降使得财富效应减弱，汽车作为重要的消费品，受到宏观消费变化带来的影响。",
        "汽车购买性质和出行方式变化影响拥车。一方面刚需购车减少，2024年中国汽车市场首购需求占比46%，到2025将减少到38%左右。另一方面，网约车、无人驾驶出租车推动了出行共享化，出行方式的改变也减少了居民对汽车所有权的依赖。",
        "总的来说，我国汽车国内市场已经从高增长进入到中低增长阶段，预计2030年，内需口径下国内汽车销量2800万辆左右，保持着1.6%左右的潜在增速，汽车保有量将达到4.3亿辆，千人汽车保有量约300辆。"
    ]
    asyncio.run(generate_contexts(document, chunks))