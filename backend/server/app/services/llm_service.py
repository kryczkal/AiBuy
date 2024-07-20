from typing import List
import configparser
from together import Together
import requests
from dotenv import load_dotenv
import json
import os

class LLMService:
    def __init__(self, config_file_path):
        # Initialize LLaMA model here
        # Reading config file
        load_dotenv(override=True)
        self.cnf = configparser.ConfigParser()
        self.cnf.read(config_file_path)
        api_key = self.cnf['llama']['api_key']
        self.perplexity_url = "https://api.perplexity.ai/chat/completions"


        # Initializing connection
        self.client = Together(api_key=api_key)

    async def is_prompt_detailed_enough(self, prompt: str) -> bool:
        # Implement logic to check if the prompt is detailed enough
        # This is a placeholder implementation
        return len(prompt.split()) > 20

    async def get_details_questions(self, prompt: str) -> List[str]:
        # Generate questions to get more details
        # This is a placeholder implementation
        return [
            "Can you provide more specific information about X?",
            "What are your preferences regarding Y?",
            "Have you considered Z?"
        ]

    async def update_issue_details(self, question_answers: List[str]) -> str:
        # Update the issue details based on answers
        # This is a placeholder implementation
        return " ".join(question_answers)

    """async def get_solutions(self, prompt: str) -> str:
        # Generate solutions based on the prompt
        # This is a placeholder implementation
        return f"Here are some solutions for '{prompt}': ..."
    """

    async def get_components(self) -> List[dict]:
        # Get components for IdeaObject
        # This is a placeholder implementation
        return [
            {"name": "Component1", "description": "Description of Component1"},
            {"name": "Component2", "description": "Description of Component2"},
        ]

    # TODO: Make sure this is correct
    async def do_perplexity_research(self, base_prompt: str, question_answer_list: List[dict]) -> str:

        messages = [
                {
                    "role": "system",
                    "content": "Be precise and concise."
                },
                {
                    "role": "user",
                    "content": base_prompt
                }
            ]

        for item in question_answer_list:
            assistant = {
                    "role": "assistant",
                    "content": item.get("question")
                }
            user = {
                    "role": "user",
                    "content": item.get("answer")
                }
            messages.append(assistant)
            messages.append(user)
            
        payload = {
            "model": "llama-3-sonar-small-32k-online",
            "messages": messages
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": f"Bearer {os.environ['PERPLEXITY_KEY']}"
        }

        response = requests.post(self.perplexity_url, json=payload, headers=headers)

        return json.loads(response.text)["choices"][0]["message"]["content"]
        


