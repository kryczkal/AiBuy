import sys
import os

# Add the parent directory of `app` to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/server')))
print(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend/server')))

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.llm_service import LLMService
from app.services.product_service import ProductService

client = TestClient(app)

@pytest.fixture
def llm_service():
    return LLMService()

@pytest.fixture
def product_service():
    return ProductService()

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Product Finder API"}

@pytest.mark.asyncio
async def test_is_prompt_detailed_enough(llm_service):
    short_prompt = "Short prompt"
    long_prompt = "This is a much longer prompt that should be considered detailed enough for our purposes a a a a a a a a a"
    
    assert await llm_service.is_prompt_detailed_enough(short_prompt) == False
    assert await llm_service.is_prompt_detailed_enough(long_prompt) == True

@pytest.mark.asyncio
async def test_get_details_questions(llm_service):
    prompt = "Tell me about products"
    questions = await llm_service.get_details_questions(prompt)
    
    assert isinstance(questions, list)
    assert len(questions) > 0
    assert all(isinstance(q, str) for q in questions)

@pytest.mark.asyncio
async def test_update_issue_details(llm_service):
    question_answers = ["Initial query", "Answer 1", "Answer 2"]
    updated_issue = await llm_service.update_issue_details(question_answers)
    
    assert isinstance(updated_issue, str)
    assert all(answer in updated_issue for answer in question_answers)

@pytest.mark.asyncio
async def test_get_solutions(llm_service):
    prompt = "I need a product for cleaning"
    solutions = await llm_service.get_solutions(prompt)
    
    assert isinstance(solutions, str)
    assert "solutions" in solutions.lower()

@pytest.mark.asyncio
async def test_get_components(llm_service):
    components = await llm_service.get_components()
    
    assert isinstance(components, list)
    assert len(components) > 0
    assert all(isinstance(c, dict) for c in components)
    assert all("name" in c and "description" in c for c in components)

@pytest.mark.asyncio
async def test_process_query_need_more_details(product_service):
    short_query = "Short query"
    result = await product_service.process_query(short_query)
    
    assert result["status"] == "need_more_details"
    assert "questions" in result
    assert isinstance(result["questions"], list)

@pytest.mark.asyncio
async def test_process_query_success(product_service):
    detailed_query = "This is a very detailed query about a product I need for my home"
    result = await product_service.process_query(detailed_query)
    
    assert result["status"] == "success"
    assert "solutions" in result
    assert "components" in result

@pytest.mark.asyncio
async def test_update_query(product_service):
    initial_query = "Initial query"
    answers = ["Answer 1", "Answer 2"]
    updated_query = await product_service.update_query(initial_query, answers)
    
    assert isinstance(updated_query, str)
    assert initial_query in updated_query
    assert all(answer in updated_query for answer in answers)

def test_process_query_endpoint():
    response = client.post("/process-query", params={"query": "Test query"})
    assert response.status_code == 200
    assert "status" in response.json()

def test_update_query_endpoint():
    response = client.post("/update-query", json={"query": "Initial query", "answers": ["Answer 1", "Answer 2"]})
    assert response.status_code == 200
    assert isinstance(response.json(), str)