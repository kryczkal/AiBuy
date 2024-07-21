from app.services.llm_service import LLMService
from app.models.product import Product, Products
from typing import List, Dict
from app.utilities.logger import global_loger
import json

MAX_NUMBER_OF_QUESTIONS = 5

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
        is_detailed = await self.llm_service.is_prompt_detailed_enough(query)
        if not is_detailed:
            questions = await self.llm_service.get_details_questions(query, MAX_NUMBER_OF_QUESTIONS)
            response = {"status": "need_more_details", "questions": questions}
        else:
            components = await self.llm_service.get_components()
            response = {"status": "success", "components": components}

        global_loger.info(f"Sending response: {json.dumps(response)}")
        return response

    async def do_research(self, name: str, description: str, questions: List[str], answers: List[str]) -> Product:
        # TODO: in future reconsider complex response as in process_query in case of details page done

        # Get product recommendation from LLM
        # product_info = await self.llm_service.get_solutions(consumer_need)

        response = await self.llm_service.do_perplexity_research(name, description, questions, answers)

        # TODO: replace
        return Products(
            name=["Recommended Product"],
            description=["Srogi produkt"],
            price=[99.99],
            amazon_link=["https://www.amazon.com/sample-product"]
        )
