# AiBuy


# Fast Api

## Application Pipeline:

### Initial Query Processing:

Here are defined CORS
["/backend/server/app/services/product_service.py](/backend/server/app/services/product_service.py)

Endpoint: POST /process-query
Function: process_query in ProductService

Response: 
{"status": "need_more_details", "questions": questions} -- if we need more details about customer need
{"status": "success", "solutions": solutions, "components": components}


What happens:
a. The user submits their initial query about a product they're looking for. \
b. The system checks if the query is detailed enough using is_prompt_detailed_enough.
c. If the query is not detailed enough, it returns questions to get more information._
d. If the query is detailed enough, it generates solutions and component suggestions.
How to use:
pythonCopyresponse = client.post("/process-query", params={"query": "I need a product for cleaning"})
result = response.json()
if result["status"] == "need_more_details":
    questions = result["questions"]
    # Present these questions to the user
else:
    solutions = result["solutions"]
    components = result["components"]
    # Present solutions and components to the user

### Query Update (if needed):

Endpoint: POST /update-queryjson={"query": "Initial query", "answers": 
Function: update_query in ProductService

What happens:
a. If the initial query wasn't detailed enough, the user answers the additional questions.
b. These answers, along with the original query, are sent to update the query.
c. The system combines this information into a more detailed query.
How to use:
pythonCopyanswers = ["Answer to question 1", "Answer to question 2", "Answer to question 3"]
response = client.post("/update-query", json={"query": "Initial query", "answers": answers})
updated_query = response.json()
- Use this updated query in the next step

### Reprocessing Updated Query:

Endpoint: POST /process-query
Function: process_query in ProductService

What happens:
a. The updated, more detailed query is processed again.
b. This time, it should be detailed enough to generate solutions and component suggestions.
How to use:
pythonCopyresponse = client.post("/process-query", params={"query": updated_query})
result = response.json()
- At this point, result should contain solutions and components
solutions = result["solutions"]
components = result["components"]
- Present these to the user