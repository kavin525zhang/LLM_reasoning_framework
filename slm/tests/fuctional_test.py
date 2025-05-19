import requests

sess = requests.Session()
base_api = "http://127.0.0.1:8001"

api = f"{base_api}/embedding/"
payload = {
    "text": "test",
    "type": "bge",
    "norm": True,
    "is_query": True,
    # "binary": True
}
print(requests.post(api, json=payload).text)

api = f"{base_api}/id/"
payload = {
    "query": [
        "Q: 你是谁"
    ]
}
print(requests.post(api, json=payload).text)


api = f"{base_api}/rerank/"
payload = {
    "pairs": [
        [
            "今天天气如何？",
            "天气预报"
        ],
        [
            "今天天气如何？",
            "今日股市继续维持涨势"
        ]
    ],
    "type": "bge"
}
print(requests.post(api, json=payload).text)
