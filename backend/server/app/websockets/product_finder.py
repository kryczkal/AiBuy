from fastapi import APIRouter, WebSocket
from app.services.product_service import ProductService
import uuid

router = APIRouter()

# Store active connections
active_connections = {}

@router.websocket("/ws/product-finder")
async def product_finder_websocket(websocket: WebSocket):
    return
    # await websocket.accept()
    # session_id = str(uuid.uuid4())
    # active_connections[session_id] = websocket
    # product_service = ProductService()
    #
    # try:
    #     while True:
    #         data = await websocket.receive_json()
    #         consumer_need = data.get('query')
    #         if consumer_need:
    #             product = await product_service.find_product(consumer_need)
    #             await websocket.send_json({"session_id": session_id, "product": product.dict()})
    #         else:
    #             await websocket.send_json({"error": "Invalid request format"})
    # except Exception as e:
    #     print(f"WebSocket error: {e}")
    # finally:
    #     del active_connections[session_id]
    #     await websocket.close()