from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Response, Cookie
from sqlalchemy.orm import Session
from typing import List, Optional
from services import order_service
from models.models import *
from models.schemas import OrderCreate, OrderUpdate
from db.database import get_db
from middlewares.auth_middleware import get_current_user, require_role
import random, json

router = APIRouter(prefix="/orders", tags=["Orders"])


# Thêm món vào đơn, áp dụng cho cả nút thêm món và nút tăng số lượng, trả về order_id
@router.post("/add-item")
async def add_to_cart(item_id: int, restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.add_item(item_id, restaurant_id, current_customer['user_id'], db)

# Giảm số lượng món
@router.post("/subtract-item")
async def subtract_on_cart(item_id: int, order_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.subtract_item(item_id, order_id, current_customer['user_id'], db)

# Lấy danh sách đơn hàng trong giỏ của user
# ---> trả về danh sách gồm order_id và restaurant_id, có thể dùng order_id để 
# xem thông tin chi tiết của order, dùng api /restaurant/get/{restaurant_id}
# để lấy thông tin nhà hàng
@router.get("/cart")
async def get_cart(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_orders_in_cart(current_customer['user_id'], db)


# Lấy đơn hàng theo ID
# -> trả về danh sách order_items
# ta vẫn có order_id để tiếp tục thực hiện 
@router.get("/{order_id}")
async def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.get_order(order_id, db)

# Lấy ra danh sách các order_item có trong giỏ hàng ở nhà hàng hiện tại
# Nếu không có thì giỏ hàng đang trống
@router.get("/current-cart/{restaurant_id}")
async def current_cart(restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_current_cart(restaurant_id, current_customer['user_id'], db)

# Cập nhật trạng thái đơn hàng cho tài xế
# Đầu vào order_update được xác định cụ thể trong từng
# trường hợp button tài xế bấm. Ví dụ: "Nhận đơn" => "preparing"
# "Đã lấy đơn" => "delivering"
# "Đã đến điểm giao" => "delivered"
# "Giao hàng thành công" => "completed"
@router.put("/{order_id}")
async def update_order(order_id: int, order_update: OrderUpdate, 
                       current_driver: dict = Depends(require_role('driver')), 
                       db: Session = Depends(get_db)):
    return order_service.update_order(order_id, order_update, db)


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

# API /find-driver 
@router.get("/find-driver/{order_id}")
async def find_driver(order_id: int, db: Session):
    # Lấy order từ database và tìm restaurant_id
    order = db.query(Order).filter(Order.order_id == order_id).first()
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