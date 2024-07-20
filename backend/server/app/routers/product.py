from fastapi import APIRouter, Depends, Body
from app.services.product_service import ProductService
from app.models.product import Product
from typing import List, Dict
from pydantic import BaseModel
import os

router = APIRouter()

class QueryRequest(BaseModel):
    query: str

class UpdateQueryRequest(BaseModel):
    query: str
    answers: List[str]

# Dependency function to provide ProductService with config_path
def get_product_service() -> ProductService:
    config_path = os.path.join(os.path.dirname(__file__), '../../config.ini')
    print(config_path)

    return ProductService(config_path)

@router.post("/process-query")
async def process_query(request: QueryRequest = Body(...), product_service: ProductService = Depends(get_product_service)):
    return await product_service.process_query(request.query)

@router.post("/update-query")
async def update_query(request: UpdateQueryRequest = Body(...), product_service: ProductService = Depends(get_product_service)):
    return await product_service.update_query(request.query, request.answers)