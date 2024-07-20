from app.services.llm_service import LLMService
from app.models.product import Product
from typing import List, Dict


class ProductService:
    def __init__(self, config_path: str):
        self.llm_service = LLMService(config_path)


    async def process_query(self, query: str) -> Dict:
        is_detailed = await self.llm_service.is_prompt_detailed_enough(query)
        if not is_detailed:
            questions = await self.llm_service.get_details_questions(query)
            return {"status": "need_more_details", "questions": questions}
        
        #solutions = await self.llm_service.get_solutions(query)
        components = await self.llm_service.get_components()
        return {"status": "success", "components": components}  # "solutions": solutions, 

    async def update_query(self, query: str, answers: List[str]) -> str:
        updated_query = await self.llm_service.update_issue_details([query] + answers)
        return updated_query
    
     async def find_product(self, consumer_need: str) -> Product:
        # First, check if the consumer need is detailed enough
        is_detailed = await self.llm_service.is_prompt_detailed_enough(consumer_need)
        
        if not is_detailed:
            # If not detailed, get more details
            questions = await self.llm_service.get_details_questions(consumer_need)
            # Here, you'd typically ask the user these questions and get answers
            # For this example, we'll just use the original need
            updated_need = consumer_need
        else:
            updated_need = consumer_need

        # Get product recommendation from LLM
        product_info = await self.llm_service.get_solutions(updated_need)
        
        # Parse the product_info and create a Product object
        # This is a simplified version - you'd need to extract actual details from product_info
        return Product(
            name="Recommended Product",
            description=product_info,
            price=99.99,  # You'd extract this from product_info
            amazon_link="https://www.amazon.com/sample-product"  # You'd generate this based on the product
        )