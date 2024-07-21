from app.services.llm_service import LLMService
from app.models.product import Product
from typing import List, Dict

max_number_of_questions = 5

class ProductService:
    def __init__(self, config_path: str):
        self.llm_service = LLMService(config_path)


    async def process_query(self, query: str) -> Dict:
        is_detailed = await self.llm_service.is_prompt_detailed_enough(query)
        if not is_detailed:
            questions = await self.llm_service.get_details_questions(query, max_number_of_questions)
            return {"status": "need_more_details", "questions": questions}
        
        #solutions = await self.llm_service.get_solutions(query)
        components = await self.llm_service.get_components()
        return {"status": "success", "components": components}  # "solutions": solutions, 

    async def update_query(self, query: str, answers: List[str]) -> str:
        updated_query = await self.llm_service.update_issue_details([query] + answers)
        return updated_query