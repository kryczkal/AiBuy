import requests
import json
perplexity_url = "https://api.perplexity.ai/chat/completions"

payload = {
            "model": "llama-3-sonar-small-32k-online",
            "messages": [
                {
                    "role": "system",
                    "content": "Be precise and concise."
                },
                {
                    "role": "user",
                    "content": "How many stars are there in our galaxy?"
                }
            ]
        }
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer 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"
}

response = requests.post(perplexity_url, json=payload, headers=headers)

print(response)

print(json.loads(response.text)["choices"][0]["message"]["content"])