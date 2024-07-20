from pydantic import BaseModel, HttpUrl

class Product(BaseModel):
    name: str
    description: str
    price: float
    amazon_link: HttpUrl