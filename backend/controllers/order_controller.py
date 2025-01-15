from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Response, Cookie
from sqlalchemy.orm import Session
from typing import List, Optional
from services import order_service
from models.models import *
from models.schemas import *
from db.database import get_db
from middlewares.auth_middleware import get_current_user, require_role
import random, json
from services.customer_service import get_food_fee, get_delivery_fee

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
# ---> trả về danh sách thông tin các order, có thể dùng order_id để 
# xem thông tin chi tiết của order, dùng api /restaurant/get/{restaurant_id}
# để lấy thông tin nhà hàng
@router.get("/cart", response_model=List[OrderItemResponse])
async def get_cart(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_orders_in_cart(current_customer['user_id'], db)


# Lấy đơn hàng theo ID
# -> trả về danh sách order_items, phương thức này
# dùng cho việc các user xem đơn
@router.get("/{order_id}")
async def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.get_order(order_id, db)

# Lấy ra danh sách các order_item có trong giỏ hàng ở nhà hàng hiện tại
# Nếu không có thì giỏ hàng đang trống
@router.get("/current-cart/{restaurant_id}")
async def current_cart(restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_current_cart(restaurant_id, current_customer['user_id'], db)


# Khách hàng cập nhật thông tin đơn hàng
# Khách hàng có thể thay đổi địa chỉ và note

@router.put("/update/{order_id}", response_model=OrderResponse)
async def update_order_info(order_id: int, order_update: OrderUpdate, 
                       current_customer: dict = Depends(require_role('customer')), 
                       db: Session = Depends(get_db)):
    return order_service.update_order(order_id, order_update, current_customer['user_id'], db)

# Hủy đơn
@router.put("/cancel/{order_id}")
async def cancel_order(order_id: int, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        order_service.cancel(order_id, current_user['user_id'], db)
        return {"message": "order cancelled"}
    except Exception as e:
        raise e
        
# Cập nhật trạng thái đơn hàng cho tài xế
# Đầu vào order_update được xác định cụ thể trong từng
# trường hợp button tài xế bấm. Ví dụ: "Nhận đơn" => "preparing"
# "Đã lấy đơn" => "delivering"
# "Đã đến điểm giao" => "delivered"
# "Giao hàng thành công" => "completed"
@router.put("/change-status/{order_id}", response_model=OrderResponse)
async def update_order(order_id: int, new_status: str, 
                       current_driver: dict = Depends(require_role('driver')), 
                       db: Session = Depends(get_db)):
    return order_service.update_order_status(order_id, new_status, current_driver['user_id'], db)

@router.get("/food-fee/{order_id}")
async def food_fee(order_id: int, db: Session = Depends(get_db)):
    return get_food_fee(order_id, db)

@router.get("/delivery-fee/{order_id}")
async def delivery_fee(order_id: int, db: Session = Depends(get_db)):
    return get_delivery_fee(order_id, db)