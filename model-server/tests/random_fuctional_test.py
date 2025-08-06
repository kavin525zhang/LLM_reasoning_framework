import requests

import string
import random

sess = requests.Session()
base_api = "http://127.0.0.1:8001"

api = f"{base_api}/embedding/"
payload = {
    "text": [
        ''.join(random.choices(string.ascii_uppercase + string.digits, k=random.randint(10, 5120)))
        for _ in range(100)
    ],
    "type": "bge",
    "norm": True,
    "is_query": True
}
print(requests.post(api, json=payload).text)

api = f"{base_api}/id/"
payload = {
    "query": [
        "Q: " + ''.join(random.choices(string.ascii_uppercase + string.digits, k=random.randint(10, 5120)))
        for _ in range(random.randint(5, 20))
    ]
}
print(requests.post(api, json=payload).text)

api = f"{base_api}/rerank/"
payload = {
    "pairs": [
        [
            ''.join(random.choices(string.ascii_uppercase + string.digits, k=random.randint(10, 256))),
            ''.join(random.choices(string.ascii_uppercase + string.digits, k=random.randint(10, 5120)))
        ]
        for _ in range(random.randint(5, 20))
    ],
    "type": "bge"
}
print(requests.post(api, json=payload).text)
