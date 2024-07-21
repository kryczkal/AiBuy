import configparser
import logging
from typing import List

from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from ..utilities.logger import log_init

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
        model_name = self.cnf['llama'].get('model_name', 'meta-llama/Meta-Llama-3-70B-Instruct-Lite')
        self.perplexity_url = "https://api.perplexity.ai/chat/completions"


        self.model = ChatOpenAI(
            base_url="https://api.together.xyz/v1",
            api_key=api_key,
            model=model_name,
        )

        self.logger = log_init(logging.DEBUG, "app\\utilities\\logs.log", "LLMservice")

    async def is_prompt_detailed_enough(self, prompt: str) -> bool:
        template = PromptTemplate(
            input_variables=["prompt"],
            template="""Evaluate the user's description of their issue on a scale from 0 to 5, where points are awarded based on the level of detail and clarity provided. The purpose of this evaluation is to ensure that the description is thorough enough for us to offer effective solutions or recommend suitable products. Assign points according to the following criteria:

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

            self.logger.debug(answer)
            i += 1
            if answer.isdigit():
                return int(answer) >= 4
        return False

    async def get_details_questions(self, prompt: str,  question_count: int) -> List[str]:
        # Generate questions to get more details
        template = PromptTemplate(
            input_variables=["prompt"],
            template=f"""Based on the user's initial description of their issue: {prompt} 
                                generate a set of up to {question_count} context-dependent questions to help them improve their description. The goal is to ensure the description is detailed and thorough enough for us to offer effective solutions or recommend suitable products. The questions should aim to elevate the description through five levels of detail, and the output should have each question separated by the '|' character.

                                Your output should contain questions and nothing else than questions and '|' between them.
                                IF YOU PUT ANY OTHER TEXT THAN QUESTIONS RELATED TO THE PROBLEM A KITTEN WILL DIE.
                                The levels are defined as follows:

                                Level 0 to Level 1: If the description is very vague, ask questions to gain a basic understanding.

                                Examples: 'What is the issue you're facing?' | 'Who is affected by this issue?'
                                Level 1 to Level 2: If the description includes a basic overview, ask for more context.

                                Examples: 'When does this issue occur?' | 'Where does this issue happen?'
                                Level 2 to Level 3: If the description provides some context, ask for specific examples or scenarios.

                                Examples: 'Can you provide specific examples or scenarios where this issue occurs?' | 'How does this issue affect you or others involved?'
                                Level 3 to Level 4: If the description includes specific examples, ask about potential causes or contributing factors.

                                Examples: 'What do you think are the potential causes of this issue?' | 'Are there any contributing factors that you have noticed?'
                                Level 4 to Level 5: If the description identifies potential causes, ask about previous attempts to resolve the issue.

                                Examples: 'What have you tried so far to address this issue?' | 'Were there any solutions that partially worked or made the issue worse?'
                                Generate context-specific questions based on the current level of detail in the user's description to help them improve and provide a more thorough description. Ensure each question is separated by the '|' character. Consider the following example:

                                User's issue description: 'I have trouble sleeping at night.'
                                Output questions: 'What do you think causes your trouble sleeping?' | 'When did this issue start?' | 'How does this issue affect your daily life?' | 'Have you tried any solutions to improve your sleep? If so, what were they?' | 'Are there specific times or conditions when your sleep trouble is worse?'""")

        chain = template | self.model

        answer = await chain.ainvoke({"prompt": prompt})

        # getting the list of trimmed questions
        list_of_questions = answer.content.split('|')
        trimmed_questions = [question.strip() for question in list_of_questions]

        # deleting the intro if the heartless chat decides to kill a kitty
        first_question = trimmed_questions[0]
        first_question_parts = first_question.split('\n')
        trimmed_questions[0] = first_question_parts[-1].strip()

        # deleting empty strings
        final_questions = [string for string in trimmed_questions if string]
        self.logger.debug(' '.join(final_questions))

        return final_questions

    async def update_issue_details(self, base_prompt: str, questions: List[str], answers: List[str]) -> str:
        # Update the issue details based on answers
        # no additional questions asked
        if len(questions) == 0:
            return base_prompt

        updated_output = base_prompt + '\n'
        for i in range(0, len(questions), 1):
            updated_output = updated_output + questions[i] + ' ' + answers[i] + '\n'
        return updated_output

    """async def get_solutions(self, prompt: str) -> str:
        # Generate solutions based on the prompt
        # This is a placeholder implementation
        return f"Here are some solutions for '{prompt}': ..."
    """

    async def get_components(self, updated_prompt: str, max_answers: str) -> List[dict]:
        # Get components for IdeaObject
        template = PromptTemplate(
            input_variables=["prompt"],
            template=f"""Having problem description: {updated_prompt}, that might also include additional questions with answers helping you fully understand the problem, suggest up to {max_answers} products to solve it. All solutions must be splitted in two parts: name of the product which may solve the problem and description how it is solving the problem. Between name and description there MUST be '|' sign to split the parts of the answer. Between all of the solution there MUST be '$' sign separating them.  Problem description: 
                                DO NOT INCLUDE ANY '\n' SIGNS IN YOUR ANSWER.
                                DO NOT INCLUDE ANY INTRODUCTION IN YOUR ANSWER.
                                DO NOT PUT '\n'sign after '$' SIGN.
                                THE ANSWER MUST BE IN ONE LINE AS THE ONE PROVIDED IN ANSWER.
                                IF YOU FAIL TO FOLLOW THE RULES AN INNOCENT KITTY WILL DIE.
                                'I'm looking for an organizer for my home office. I have papers and office supplies everywhere, and it's starting to get out of hand.
                                What type of papers and office supplies are causing the clutter? Bills, contracts, receipts, notes, pens, markers.
                                How much space do you have available in your home office for organization and storage? Medium-sized room with space for desk, bookshelf, and filing cabinet.
                                Are there any specific tasks or activities that you struggle with due to the clutter and disorganization? Finding documents, staying organized, maintaining productivity, keeping workspace tidy.'

                                Example expected answer:
                                'Desk Organizer Set|A set including trays, compartments, and holders for papers, pens, and small office supplies that keeps frequently used items easily accessible and sorted, reducing clutter on the desk.$Wall-Mounted Document Organizer|A multi-pocket wall organizer for papers and files that Utilizes vertical space to keep documents sorted and off the desk, reducing clutter.$Filing Cabinet|A compact filing cabinet with multiple drawers that provides dedicated storage for important documents, making it easy to organize and retrieve bills, contracts, and receipts'""")

        chain = template | self.model
        answer = await chain.ainvoke({"prompt": updated_prompt})
        print(answer.content)
        print(answer)
        # solution list
        solution_list = answer.content.split('$')

        # deleting empty strings
        solution_nonempty_list = [string for string in solution_list if string]

        dict_list = []

        for i in range(0, len(solution_nonempty_list), 1):
            split_solution = solution_nonempty_list[i].split('|')

            # TODO: intro deletion
            # if i==0 and '\n' in split_solution[0]:
            #     split_name = split_solution[0].split('\n')
            #     print(split_name)

            output_dict = {}
            if len(split_solution) >= 2:
                output_dict["name"] = split_solution[0]
                output_dict["description"] = split_solution[1]
                dict_list.append(output_dict)

        return dict_list


    # TODO: Make sure this is correct
    async def do_perplexity_research(self, name: str, description: str, questions: List[str], answers: List[str]) -> str:

        base_prompt = """PLACEHOLDER FOR PROMPT""" # TODO: do this
        system_prompt = """You will get Product and """
        

        messages = [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": base_prompt
                }
            ]

        for i in range(len(questions)):
            assistant = {
                    "role": "assistant",
                    "content": questions[i]
                }
            user = {
                    "role": "user",
                    "content": answers[i]
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
    
    async def do_perplexity_research(self, name: str, description: str, questions: List[str], answers: List[str]) -> str:
        base_prompt = f"""
        Given the following product information:
        Name: {name}
        Description: {description}

        Respond with a JSON array of objects, where each object represents a product and follows this format:
        [ 
        {{
            "name": "name of product",
            "description": "description of product",
            "price": "price",
            "amazon_link": "amazon_link"
        }},
        {{
            "name": "name of product",
            "description": "description of product",
            "price": "price",
            "amazon_link": "amazon_link"
        }}
        // add more objects as needed
        ]
        """
        system_prompt = """You are an AI assistant that provides product research details in JSON format."""

        messages = [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": base_prompt
            }
        ]

        for i in range(len(questions)):
            assistant = {
                "role": "assistant",
                "content": questions[i]
            }
            user = {
                "role": "user",
                "content": answers[i]
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


      
