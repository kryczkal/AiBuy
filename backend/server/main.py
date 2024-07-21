from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import product
from app.websockets import product_finder

app = FastAPI(title="Product Finder API")

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include your routers
app.include_router(product.router)
# app.include_router(product_finder.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Product Finder API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
