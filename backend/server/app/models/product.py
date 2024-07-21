from pydantic import BaseModel, HttpUrl
from typing import List, Dict

class Product(BaseModel):
    name: str
    description: str
    price: str
    amazon_link: HttpUrl


class Products(BaseModel):
    name: List[str]
    description: List[str]
    price: List[str]
    amazon_link: List[HttpUrl]