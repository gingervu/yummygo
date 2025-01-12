from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List
from services import order_service
from models.models import *
from models.schemas import Order, OrderCreate, OrderUpdate
from db.database import get_db
from middlewares.auth_middleware import get_current_user
import random

router = APIRouter(prefix="/oders", tags=["Oders"])

# Tạo đơn hàng mới
@router.post("/", response_model=Order)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return order_service.create_order(order, db)

# Lấy danh sách đơn hàng trong giỏ của user
# ---> trả về danh sách gồm order_id và restaurant_id, có thể dùng order_id để 
# xem thông tin chi tiết của order, dùng api /restaurant/get/{restaurant_id}
# để lấy thông tin nhà hàng
@router.get("/", response_model=List[Order])
async def get_order(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return order_service.get_orders_in_cart(user_id, db)

# Lấy đơn hàng theo ID
# -> trả về danh sách order_items
# ta vẫn có order_id để tiếp tục thực hiện 
@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.get_order(order_id, db)

# Cập nhật trạng thái đơn hàng
# Đầu vào order_update được xác định cụ thể trong từng
# trường hợp button tài xế bấm. Ví dụ: "Nhận đơn" => "preparing"
# "Đã lấy đơn" => "delivering"
# "Đã đến điểm giao" => "delivered"
# "Giao hàng thành công" => "completed"
@router.put("/{order_id}", response_model=Order)
async def update_order(order_id: int, order_update: OrderUpdate, db: Session = Depends(get_db)):
    return order_service.update_order(order_id, order_update, db)

# Xóa đơn hàng
@router.delete("/{order_id}")
async def delete_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.delete_order(order_id, db)


# Tạo WebSocket để gửi đơn cho tài xế, nhà hàng 
# Giả lập các kết nối WebSocket của tài xế
driver_connections = {}

# Kết nối WebSocket cho tài xế
@router.websocket("/ws/driver/{driver_id}")
async def websocket_driver(websocket: WebSocket, driver_id: int):
    # Chấp nhận kết nối WebSocket
    await websocket.accept()

    # Lưu kết nối WebSocket của tài xế
    driver_connections[driver_id] = websocket

    try:
        while True:
            # Nhận tin nhắn từ tài xế (có thể bỏ qua nếu không cần)
            data = await websocket.receive_text()
            print(f"Received from driver {driver_id}: {data}")
    except WebSocketDisconnect:
        # Xóa kết nối khi tài xế ngắt kết nối
        del driver_connections[driver_id]

# API /find-driver để chọn ngẫu nhiên tài xế
@router.get("/find-driver/{order_id}")
async def find_driver(order_id: int, db: Session):
    # Lấy order từ database và tìm restaurant_id
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Lấy danh sách các tài xế đang active
    drivers = db.query(Driver).filter(Driver.status == DriverStatusEnum.active).all()

    if not drivers:
        raise HTTPException(status_code=404, detail="No active drivers found")
    
    # Chọn ngẫu nhiên một tài xế trong số các tài xế đang active
    selected_driver = random.choice(drivers)

    # Lấy thông tin đơn hàng gợi ý
    order_info = {
        "order_id": order_id,
    }

    # Gửi thông tin đơn hàng tới tài xế qua WebSocket
    if selected_driver.id in driver_connections:
        websocket = driver_connections[selected_driver.id]
        try:
            await websocket.send_json(order_info)
            return {"message": "Order suggestion sent to driver", "driver_id": selected_driver.id}
        except WebSocketDisconnect:
            raise HTTPException(status_code=500, detail="Driver disconnected before receiving the order")
    
    raise HTTPException(status_code=404, detail="Driver is not connected via WebSocket")