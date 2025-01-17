from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
from routes.api_router import api_router
import sys
sys.path.append("d:/yummygo/backend")
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI Application")

origins = [
    "http://localhost:3000"  # Thêm domain frontend của bạn
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #origins,  # Cho phép chia sẻ cookie giữa các domain
    allow_credentials=True,  # Bật gửi cookies trong các yêu cầu
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký tất cả router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI application!"}

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/orders/{order_id}")
async def websocket_endpoint(websocket: WebSocket, order_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Order {order_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Order {order_id}: disconnected")