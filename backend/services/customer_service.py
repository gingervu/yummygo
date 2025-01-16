from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from fastapi import HTTPException, status
import random
from datetime import datetime
from services.user_service import delete_user


# ===================== CUSTOMER =====================

def get_customer_by_id(customer_id: int, db: Session):
    """
    Lấy thông tin Customer theo ID.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id, 
                                              Customer.is_deleted == False).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    return db_customer

def update_customer(customer_id: int, customer: CustomerCreate, db: Session):
    """
    Cập nhật thông tin của Customer.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id, 
                                              Customer.is_deleted == False).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    # Cập nhật thông tin từ dữ liệu mới
    for key, value in customer.model_dump().items():
        if value is not None and (not isinstance(value, str) or value != ""):
            setattr(db_customer, key, value)
    
    db.commit()
    db.refresh(db_customer)
    return db_customer

def delete_customer(customer_id: int, db: Session):
    """
    Đánh dấu xóa (is_deleted=True) thay vì xóa khỏi cơ sở dữ liệu.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id, 
                                              Customer.is_deleted == False).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    try:
        db_customer.is_deleted = True
        
        # Xóa đơn hàng chưa thanh toán (giỏ hàng)
        db_orders = db.query(Order).filter(Order.customer_id == customer_id,
                                           Order.order_status == OrderStatusEnum.cart).all()
        for order in db_orders:
            db.delete(order)
        
        # Nếu không phải là tài xế hoặc nhà hàng, xóa user
        driver = db.query(Driver).filter(Driver.driver_id == customer_id, 
                                         Driver.is_deleted == False).first()
        restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == customer_id, 
                                                 Restaurant.is_deleted == False).first()
        if not driver and not restaurant:
            delete_user(customer_id, db)
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error occurred while deleting customer: {str(e)}")

    db.commit()
    db.refresh(db_customer)
    return {"detail": "Customer đã bị xóa"}


# ===================== ORDER =====================

def create_order(order_id: int, customer_id: int, db: Session):
    """
    Tạo một đơn hàng với một tài xế được chỉ định.
    """
    db_order = db.query(Order).filter(Order.order_id == order_id, 
                                       Order.customer_id == customer_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Chọn một tài xế hoạt động ngẫu nhiên
    db_drivers = db.query(Driver).filter(Driver.status == DriverStatusEnum.active,
                                         Driver.is_deleted == False).all()
    if not db_drivers:
        raise HTTPException(status_code=404, detail="Could not find active driver")
        
    driver = random.choice(db_drivers)

    # Cập nhật đơn hàng với tài xế và tính phí
    db_order.driver_id = driver.driver_id
    db_order.created_at = datetime.now()
    db_order.food_fee = get_food_fee(order_id, db)
    db_order.delivery_fee = get_delivery_fee(order_id, db)
    

    db.commit()
    db.refresh(db_order)
    return db_order

def get_food_fee(order_id: int, db: Session):
    """
    Tính phí món ăn trong đơn hàng.
    """
    db_order_items = db.query(OrderItem).filter(OrderItem.order_id == order_id).all()
    fee = 0
    for item in db_order_items:
        menu_item = db.query(MenuItem).filter(MenuItem.item_id == item.item_id).first()
        if menu_item:
            fee += menu_item.price * item.quantity
    return fee

def get_delivery_fee(order_id: int, db: Session):
    """
    Tính phí vận chuyển.
    """
    # Phí vận chuyển mặc định
    return 20000

