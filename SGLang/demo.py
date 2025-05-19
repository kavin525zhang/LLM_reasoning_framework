import openai

def test_openai():
    client = openai.Client(base_url="http://172.17.124.33:9528/v1", api_key="None")
    
    response = client.chat.completions.create(
        model="/mnt/disk2/yr/Qwen2.5-72B-Instruct",
        messages=[
            {"role": "user", "content": "如何预防肺癌？"},
        ],
        temperature=0,
        max_tokens=4096,
        # stream=True #流式输出
    )
    print(response.choices[0].message.content)