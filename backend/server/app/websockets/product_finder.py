from fastapi import APIRouter, WebSocket

router = APIRouter()

@router.websocket("/ws/product-finder")
async def product_finder_websocket(websocket: WebSocket):
    return
    # session_id = await manager.connect(websocket)
    # product_service = ProductService()

    # try:
    #     while True:
    #         data = await websocket.receive_json()
    #         consumer_need = data.get('query')
    #         if consumer_need:
    #             product = await product_service.find_product(consumer_need)
    #             await manager.send_personal_message({"session_id": session_id, "product": product.dict()}, session_id)
    #         else:
    #             await manager.send_personal_message({"error": "Invalid request format"}, session_id)
    # except Exception as e:
    #     print(f"WebSocket error: {e}")
    # finally:
    #     manager.disconnect(session_id)
