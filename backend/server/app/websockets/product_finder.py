from fastapi import APIRouter, WebSocket
from app.services.product_service import ProductService

router = APIRouter()

@router.websocket("/ws/product-finder")
async def product_finder_websocket(websocket: WebSocket):
    await websocket.accept()
    product_service = ProductService()

    try:
        while True:
            consumer_need = await websocket.receive_text()
            # TODO: implement find_product
            product = await product_service.find_product(consumer_need)
            await websocket.send_json(product.dict())
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()