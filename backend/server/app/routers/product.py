from fastapi import APIRouter, Depends, Body
from app.services.product_service import ProductService
from app.models.product import Product
from typing import List, Dict
from pydantic import BaseModel

router = APIRouter()

class QueryRequest(BaseModel):
    query: str

class UpdateQueryRequest(BaseModel):
    query: str
    answers: List[str]

@router.post("/process-query")
async def process_query(request: QueryRequest = Body(...), product_service: ProductService = Depends()):
    return await product_service.process_query(request.query)

@router.post("/update-query")
async def update_query(request: UpdateQueryRequest = Body(...), product_service: ProductService = Depends()):
    return await product_service.update_query(request.query, request.answers)