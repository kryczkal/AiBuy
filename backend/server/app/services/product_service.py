from app.services.llm_service import LLMService
from app.models.product import Product
from typing import List, Dict
from server.src.logger import global_loger
import json


class ProductService:
    def __init__(self, config_path: str):
        self.llm_service = LLMService(config_path)

    # Refer to issue #11 on GitHub
    async def process_query(self, queryComponents: List[str]) -> Dict:
        global_loger.info(f"Processing query: {' '.join(queryComponents)}")

        if len(queryComponents) == 0:
            raise ValueError("Received empty request")
        else:
            # If we received only the prompt skip the concatenation part
            query = queryComponents[0] if len(queryComponents) == 1 else await self.update_query(queryComponents)

        is_detailed = await self.llm_service.is_prompt_detailed_enough(query)
        if not is_detailed:
            questions = await self.llm_service.get_details_questions(query)
            response = {"status": "need_more_details", "questions": questions}
        else:
            components = await self.llm_service.get_components()
            response = {"status": "success", "components": components}

        global_loger.info(f"Sending response: {json.dumps(response)}")
        return response

    async def update_query(self, queryComponents: List[str]) -> str:
        base_query = queryComponents[0]

        if (len(queryComponents) - 1) % 2 != 0:
            raise ValueError("Received request has invalid number of question/answers elements")

        question = queryComponents[1::2]
        answers = queryComponents[2::2]

        updated_query = await self.llm_service.update_issue_details(base_query, question, answers)
        return updated_query
