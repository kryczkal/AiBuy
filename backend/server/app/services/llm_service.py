import configparser
from typing import List

from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI


class LLMService:
    def __init__(self, config_file_path):
        # Initialize LLaMA model here
        # Reading config file
        self.cnf = configparser.ConfigParser()
        self.cnf.read(config_file_path)
        api_key = self.cnf['llama']['api_key']
        model_name = self.cnf['llama'].get('model_name', 'meta-llama/Meta-Llama-3-70B-Instruct-Lite')

        self.model = ChatOpenAI(
            base_url="https://api.together.xyz/v1",
            api_key=api_key,
            model=model_name,
        )

    async def is_prompt_detailed_enough(self, prompt: str) -> bool:
        template = PromptTemplate(
            input_variables=["prompt"],
            template = """Evaluate the user's description of their issue on a scale from 0 to 5, where points are awarded based on the level of detail and clarity provided. The purpose of this evaluation is to ensure that the description is thorough enough for us to offer effective solutions or recommend suitable products. Assign points according to the following criteria:

        Level 0 (0 points): The description is very vague, lacks any specific information, and doesn't provide a clear understanding of the issue.
        Level 1 (1 point): The description includes a basic overview of the issue. It should answer at least one of the following questions: What is the issue? Who is affected?
        Level 2 (2 points): Building on Level 1, the description provides more context. It should answer the questions: When does the issue occur? Where does it happen?
        Level 3 (3 points): Building on Level 2, the description includes specific examples or scenarios. It should answer the question: How does the issue affect the user?
        Level 4 (4 points): Building on Level 3, the description identifies potential causes or contributing factors. It should answer the question: Why does the issue occur?
        Level 5 (5 points): Building on Level 4, the description offers insight into previous attempts to resolve the issue or other related efforts. It should provide details on: What has been tried so far to address the issue?
        Assign a score based on these criteria and provide feedback on how the description can be improved to reach the next level if it does not already score a 5.

        User Description: {prompt}
        Output the score, and only the score as a single digit:""")

        chain = template | self.model

        answer = ""
        i = 0
        while (not answer.isdigit() and i < 3):
            answer = await chain.ainvoke({"prompt": prompt})
            answer = answer.content.strip()

            i += 1
            if answer.isdigit():
                return int(answer.content) >= 4
        return False

    async def get_details_questions(self, question: str) -> List[str]:
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