import configparser
from together import Together

config_file_path = "../config.ini"


def get_response(_messages, _config_file_path, _client=None):
    # getting api_key from config
    cnf = configparser.ConfigParser()
    cnf.read(_config_file_path)

    # setting up client
    if _client is None:
        key = cnf['llama']['api_key']
        _client = Together(api_key=key)

    response = _client.chat.completions.create(
        model="meta-llama/Meta-Llama-3-70B-Instruct-Lite",
        messages=_messages,
        max_tokens=int(cnf['llama']['max_tokens']),
        temperature=float(cnf['llama']['temperature']),
        top_p=float(cnf['llama']['top_p']),
        top_k=int(cnf['llama']['top_k']),
        repetition_penalty=int(cnf['llama']['repetition_penalty']),
        stop=["<|eot_id|>"],
        stream=False
    )
    return response.choices[0].message.content


if __name__ == '__main__':
    # setting up client
    message = [{"role": "user", "content": "What is the capital of France?"}]
    print(get_response(message, config_file_path))
