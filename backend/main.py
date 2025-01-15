from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.api_router import api_router
import sys
# sys.path.append("d:/yummygo/backend")
sys.path.append("C:/Users/7420/Desktop/yummygo/backend")
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI Application")

origins = [
    "http://localhost:5173",  # Thêm domain frontend của bạn
    "http://localhost:",  # Nếu frontend và backend cùng chạy trên localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả nguồn, bạn có thể giới hạn cụ thể nếu cần
    allow_credentials=True,  # Bật gửi cookies trong các yêu cầu
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký tất cả router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI application!"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")