import configparser
from together import Together

def get_response(messages, config, my_client=None):
    # getting api_key from config
    cnf = configparser.ConfigParser()
    cnf.read('../config.ini')
    key = cnf['llama']['api_key']

    # if my_client == None:



if __name__ == '__main__':
    # setting up client
    client = Together(api_key=key)
    response = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3-70B-Instruct-Lite",
        messages=[{"role": "user", "content": "What is the capital of France?"}],
        max_tokens=int(cnf['llama']['max_tokens']),
        temperature=float(cnf['llama']['temperature']),
        top_p=float(cnf['llama']['top_p']),
        top_k=int(cnf['llama']['top_k']),
        repetition_penalty=int(cnf['llama']['repetition_penalty']),
        stop=["<|eot_id|>"],
        stream=False
    )
    print(response.choices[0].message.content)
