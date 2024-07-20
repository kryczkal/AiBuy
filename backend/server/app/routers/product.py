from fastapi import APIRouter, Depends
from app.services.product_service import ProductService
from app.models.product import Product
from typing import List

router = APIRouter()

@router.post("/process-query")
async def process_query(query: str, product_service: ProductService = Depends()):
    return await product_service.process_query(query)

@router.post("/update-query")
async def update_query(query: str, answers: List[str], product_service: ProductService = Depends()):
    return await product_service.update_query(query, answers)