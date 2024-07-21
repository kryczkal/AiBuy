from fastapi import APIRouter, Depends, Body
from app.services.product_service import ProductService
from app.models.product import Product, Products
from typing import List, Dict
from pydantic import BaseModel
import os

router = APIRouter()


class QueryRequest(BaseModel):
    basicPrompt: str
    questions: List[str]
    answers: List[str]


class QueryResponse(BaseModel):
    status: str
    components: List[Dict]
    questions: List[str]


class UpdateQueryRequest(BaseModel):
    query: str
    answers: List[str]


class ResearchRequest(BaseModel):
    name: str
    description: str
    questions: List[str]
    answers: List[str]


# Dependency function to provide ProductService with config_path
def get_product_service() -> ProductService:
    config_path = os.path.join(os.path.dirname(__file__), '../../config.ini')
    print(config_path)

    return ProductService(config_path)


@router.post("/process-query")
async def process_query(request: QueryRequest = Body(...),
                        product_service: ProductService = Depends(get_product_service)) -> QueryResponse:
    return await product_service.process_query(request.basicPrompt, request.questions, request.answers)

@router.post("/do-research")
async def process_query(request: ResearchRequest = Body(...),
                        product_service: ProductService = Depends(get_product_service)) -> Products:
    return await product_service.do_research(request.name, request.description, request.questions, request.answers)

