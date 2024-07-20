from fastapi import FastAPI

fastapi = FastAPI()

@fastapi.get("/")
def read_root():
    return {"Hello": "World"};
