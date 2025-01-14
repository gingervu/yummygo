from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.models import *
from models.schemas import OrderCreate, OrderUpdate
from datetime import datetime
from services.driver_service import *

# Giảm số lượng của item trong giỏ
def subtract_item(item_id: int, order_id: int, customer_id: int, db: Session):
    order_item = db.query(OrderItem).filter(OrderItem.item_id == item_id,
                                            OrderItem.order_id == order_id).first()
    # kiểm tra order_item có tồn tại không        
    if not order_item:
        raise HTTPException(status_code=404, detail="Item does not exist")

    order_item.quantity -= 1
    
    # Nếu quantity = 0 thì xóa order_item khỏi giỏ
    if order_item.quantity == 0:
        db.delete(order_item)
        db.commit()
        remain_item = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()
        # Nếu order không còn item nào thì xóa order
        if not remain_item:
            db_order = db.query(Order).filter(Order.order_id == order_id).first()
            db.delete(db_order)
    db.commit()
    
    return order_id

# Thêm item vào giỏ hàng, trả về order_id
def add_item(item_id: int, restaurant_id: int, customer_id: int, db: Session):
    item = db.query(MenuItem).filter(MenuItem.item_id == item_id,
                                     MenuItem.restaurant_id == restaurant_id,
                                     MenuItem.status == ItemStatusEnum.available).first()
    # kiểm tra item có tồn tại không        
    if not item:
        raise HTTPException(status_code=404, detail="Item does not exist")

    price = item.price
    
    # kiểm tra đã có order giữa khách và nhà hàng tồn tại trong giỏ hàng chưa
    order_id = get_current_order(restaurant_id, customer_id, db)
    
    # nếu chưa thì tạo order mới, không thì xử lý việc thêm item vào order đã có
    if order_id == None:
        return create_order(item_id, price, restaurant_id, customer_id, db)
    
    order_item = db.query(OrderItem).filter(OrderItem.item_id == item_id,
                                            OrderItem.order_id == order_id).first()
    # Nếu item chưa có trong order thì tạo order_item mới
    if not order_item:
        new_item = OrderItem(
            item_id = item_id,
            order_id = order_id,
            price = price
        )
        db.add(new_item)
    else:
        order_item.quantity += 1
    db.commit()
    
    return order_id

def create_order(item_id: int, price: float, restaurant_id: int, customer_id: int, db: Session):
    order = Order(
        customer_id = customer_id,
        restaurant_id = restaurant_id
    )
    db.add(order)
    db.commit()
    
    order_item = OrderItem(
        item_id = item_id,
        order_id = order.order_id,
        price = price
    )
    db.add(order_item)
    db.commit()
    return order.order_id
    
# Hàm lấy ra danh sách các order_item trong order với restaurant hiện tại mà customer
# đang duyệt tới
def get_current_cart(restaurant_id: int, customer_id: int, db: Session):
    order_id = get_current_order(restaurant_id, customer_id, db)
    if order_id == None:
        return None
    order_items = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()
    return order_items
    
# Hàm lấy ra thông tin về order của customer với restaurant hiện tại mà customer
# đang duyệt tới
def get_current_order(restaurant_id: int, customer_id: int, db: Session):
    db_order = db.query(Order).filter(Order.customer_id == customer_id, 
                           Order.restaurant_id == restaurant_id,
                           Order.order_status == OrderStatusEnum.cart).first()
    if not db_order:
        return None
    
    return db_order.order_id

def get_orders_in_cart(customer_id: int, db: Session):
    return db.query(Order.order_id, Order.restaurant_id).filter(Order.order_status == "cart",
                                                                Order.customer_id == customer_id).all()

def get_order(order_id: int, db: Session):
    return db.query(OrderItem).filter(OrderItem.order_id == order_id).all()

# hàm cập nhật trạng thái đơn hàng bởi tài xế
def update_order(order_id: int, new_status: str, driver_id: int, db: Session):
    db_order = db.query(Order).filter(Order.order_id == order_id,
                                      Order.driver_id == driver_id).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Cập nhật trạng thái
    db_order.order_status = new_status
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(order_id: int, customer_id: int, db: Session):
    db_order = db.query(Order).filter(Order.order_id == order_id,
                                      Order.customer_id == customer_id,
                                      Order.order_status == OrderStatusEnum.cart).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db.delete(db_order)
    db.commit()
    return {"detail": "Đơn hàng đã bị xóa."}

from services.connection_manager import ConnectionManager
manager = ConnectionManager()

# Hàm gửi thông báo cho nhà hàng
async def notify_restaurant(order: Order, restaurant_id: int):
    if restaurant_id not in manager.connections["restaurants"]:
        return HTTPException(status_code=404, detail="Nhà hàng không online")
    
    notification = {
        "message": "Có đơn hàng mới",
        "order_id": order.order_id,
        "restaurant_id": order.restaurant_id,
        "order_details": {
            "customer_id": order.customer_id,
            "items": [item.item_id for item in order.order_items]
        },
        "timestamp": datetime.now().isoformat()
    }
    
    for ws in manager.connections["restaurants"][restaurant_id]:
        await ws.send_json(notification)

# Hàm gửi thông báo cho tài xế khi có đơn hàng mới
async def notify_driver_for_order(order: Order, driver_id: int):
    if driver_id not in manager.connections["drivers"]:
        return HTTPException(status_code=404, detail="Tài xế không online")
    
    notification = {
        "message": "Có đơn hàng mới cần giao",
        "order_id": order.order_id,
        "restaurant_id": order.restaurant_id,
        "customer_id": order.customer_id,
        "order_details": [item.item_id for item in order.order_items],
        "timestamp": datetime.now().isoformat()
    }
    
    for ws in manager.connections["drivers"][driver_id]:
        await ws.send_json(notification)
        
        
# Hàm xử lý đơn hàng khi đặt thành công
async def process_new_order(order: Order, db: Session):
    db.add(order)
    db.commit()
    
    # Tìm nhà hàng và gửi thông báo
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == order.restaurant_id).first()
    await notify_restaurant(order, restaurant.restaurant_id)

    
    # Tìm tài xế có sẵn và gửi thông báo
    available_drivers = get_available_drivers(order.restaurant_id, db)
    for driver in available_drivers:
        await notify_driver_for_order(order, driver.driver_id)
