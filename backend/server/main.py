from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import product
from app.websockets import product_finder

app = FastAPI(title="Product Finder API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(product.router)
# app.include_router(product_finder.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Product Finder API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)