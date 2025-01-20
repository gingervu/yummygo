from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Response, Cookie
from sqlalchemy.orm import Session
from typing import List, Optional
from services import order_service
from models.models import *
from models.schemas import *
from db.database import get_db
from middlewares.auth_middleware import get_current_user, require_role
import random, json
from services.customer_service import get_food_fee

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
<<<<<<< HEAD
@router.get("/cart", response_model=List[OrderItemResponse])
=======
@router.get("/cart")
>>>>>>> frontend/driver
async def get_cart(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_orders_in_cart(current_customer['user_id'], db)


# Lấy đơn hàng theo ID
# -> trả về danh sách order_items, phương thức này
# dùng cho việc các user xem đơn
@router.get("/{order_id}")
async def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.get_order(order_id, db)

<<<<<<< HEAD
=======
# lấy thông tin tường minh của đơn hàng
@router.get("/info/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    user_id = current_user['user_id']
    db_order = db.query(Order).filter(Order.order_id == order_id).first()
    customer_id = db_order.customer_id
    restaurant_id = db_order.restaurant_id
    driver_id = db_order.driver_id
    if not (user_id == customer_id or user_id == restaurant_id or user_id == driver_id):
        return {"message" : "Access Forbidden"}
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    db_driver = db.query(Driver).filter(Driver.driver_id == driver_id).first()
    
    customer_name = db.query(Customer).filter(Customer.customer_id == customer_id).first().name
    # customer_phone = db.query(User).filter(User.user_id == customer_id).first().phone
    restaurant_name = db_restaurant.name
    # restaurant_phone = db.query(User).filter(User.user_id == restaurant_id).first().phone
    driver_name = db_driver.name
    # driver_phone = db.query(User).filter(User.user_id == driver_id).first().phone
    restaurant_address =  db_restaurant.address
    restaurant_category =  db_restaurant.category
    address = db_order.address
    distance = db_order.distance
    food_fee = db_order.food_fee
    delivery_fee = db_order.delivery_fee
    order_status = db_order.order_status
    note = db_order.note

    order = OrderResponse(customer_name=customer_name, restaurant_name=restaurant_name, driver_name=driver_name, 
                          restaurant_address=restaurant_address, restaurant_category=restaurant_category,
                          address=address, distance=distance, food_fee=food_fee, delivery_fee=delivery_fee, 
                          order_status=order_status,note=note)
    return order
>>>>>>> frontend/driver
# Lấy ra danh sách các order_item có trong giỏ hàng ở nhà hàng hiện tại
# Nếu không có thì giỏ hàng đang trống
@router.get("/current-cart/{restaurant_id}")
async def current_cart(restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_current_cart(restaurant_id, current_customer['user_id'], db)


# Khách hàng cập nhật thông tin đơn hàng
# Khách hàng có thể thay đổi địa chỉ và note

@router.put("/update/{order_id}")
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
@router.put("/change-status/{order_id}")
async def update_order(order_id: int, new_status: str, 
                       current_driver: dict = Depends(require_role('driver')), 
                       db: Session = Depends(get_db)):
    return order_service.update_order_status(order_id, new_status, current_driver['user_id'], db)

@router.get("/food-fee/{order_id}")
async def food_fee(order_id: int, db: Session = Depends(get_db)):
    return get_food_fee(order_id, db)

