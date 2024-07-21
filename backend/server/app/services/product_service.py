from app.services.llm_service import LLMService
from app.models.product import Product, Products
from typing import List, Dict
from ..utilities.logger import global_loger

import json
import re

MAX_NUMBER_OF_QUESTIONS = 5
MAX_NUMBER_OF_SOLUTIONS = 3

class ProductService:
    def __init__(self, config_path: str):
        self.llm_service = LLMService(config_path)

    # Refer to issue #11 on GitHub
    async def process_query(self, prompt: str, questions: List[str], answers: List[str]) -> Dict:
        if len(questions) != len(answers):
            raise ValueError(
                f"Length of questions and answers do not match. Answers: {len(answers)}, Questions: {len(questions)}")

        # Prepare log msg
        tmp = [''] * (len(questions) + len(answers))
        tmp[0::2] = questions
        tmp[1::2] = answers
        global_loger.info(f"Processing query with prompt: {prompt}. And questions/answers: {' '.join(tmp)}")

        # If we received only the prompt skip the concatenation part
        query = prompt if len(questions) == 0 else await self.llm_service.update_issue_details(prompt, questions,
                                                                                               answers)
        global_loger.debug(query)

        is_detailed = await self.llm_service.is_prompt_detailed_enough(query)
        if not is_detailed:
            questions = await self.llm_service.get_details_questions(query, MAX_NUMBER_OF_QUESTIONS)
            response = {"status": "need_more_details", "questions": questions}
        else:
            components = await self.llm_service.get_components(query, MAX_NUMBER_OF_SOLUTIONS)
            global_loger.debug(str(components))
            response = {"status": "success", "components": components}

        global_loger.info(f"Sending response: {json.dumps(response)}")
        return response

    async def do_research(self, name: str, description: str, questions: List[str], answers: List[str]) -> Product:
        # TODO: in future reconsider complex response as in process_query in case of details page done

        # Get product recommendation from LLM
        # product_info = await self.llm_service.get_solutions(consumer_need)

        response = await self.llm_service.do_perplexity_research(name, description, questions, answers)

        json_match = re.search(r'json\s*(\[\s*\{[^`]+\}\s*\])\s*', response, re.DOTALL)

        if json_match:
            json_string = json_match.group(1)
            # Parse the JSON string into a Python list of dictionaries
            product_list = json.loads(json_string)
            

            # Access individual product details
            for product in product_list:
                print(f"Name: {product['name']}")
                print(f"Description: {product['description']}")
                print(f"Price: {product['price']}")
                print(f"Amazon Link: {product['amazon_link']}\n")

        else:
            product_list = [
                                {
                                    "name": "Air King 9166F 20\" Whole House Window Fan",
                                    "description": "A whole house window fan that can help cool down your apartment. It's perfect for hot summer days.",
                                    "price": "100-200",
                                    "amazon_link": "https://www.amazon.com/Household-Window-Fans-100-200/s?c=ts&rh=n%3A3737641%2Cp_36%3A1253526011&ts_id=3737641"
                                },
                                {
                                    "name": "iLiving 10\" Shutter Exhaust Fan with Wireless Smart Remote Controlled Thermostat and Humidity, Variable",
                                    "description": "A compact exhaust fan that can help regulate the temperature and humidity in your apartment.",
                                    "price": "100-200",
                                    "amazon_link": "https://www.amazon.com/Household-Window-Fans-100-200/s?c=ts&rh=n%3A3737641%2Cp_36%3A1253526011&ts_id=3737641"
                                }
                            ]


        # TODO: replace
        name_list = []
        description_list = []
        price_list = []
        amazon_link_list = []
        for product in product_list:
            name_list.append(product['name'])
            description_list.append(product['description'])
            price_list.append(product['price'])
            amazon_link_list.append(product['amazon_link'])

        return Products(
            name=name_list,
            description=description_list,
            price=price_list,
            amazon_link=amazon_link_list
        )
