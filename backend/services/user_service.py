from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from fastapi import HTTPException, status

def get_user(user_id: int, db: Session) -> User:
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise Exception("User not found")
    return db_user

def list_users(db: Session) -> list:
    return db.query(User).filter(User.is_deleted == False).all()

def update_user(user_id: int, user: UserUpdate, db: Session) -> User:
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user is None:
        raise Exception("User not found")
    
    if user.user_name:
        db_user.user_name = user.user_name
    if user.password:
        db_user.password = user.password
    if user.phone:
        db_user.phone = user.phone
    if user.email:
        db_user.email = user.email
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(user_id: int, db: Session) -> str:
    # Truy vấn các bản ghi trong bảng User, Customer, Driver, Merchant, Restaurant và Manager
    db_user = db.query(User).filter(User.user_id == user_id).first()
    db_customer = db.query(Customer).filter(Customer.customer_id == user_id).first()
    db_driver = db.query(Driver).filter(Driver.driver_id == user_id).first()
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == user_id)
    restaurant_ids = [restaurant.restaurant_id for restaurant in db_restaurant.all()]
    db_manager = db.query(Manager).filter(Manager.restaurant_id.in_(restaurant_ids)).all()

    # Cập nhật trạng thái 'is_deleted' của các bản ghi nếu tồn tại
    if db_user is not None:
        db_user.is_deleted = True
    if db_customer is not None:
        db_customer.is_deleted = True
    if db_driver is not None:
        db_driver.is_deleted = True
    if db_restaurant is not None:
        db_restaurant.update({Restaurant.is_deleted: True})
        # Xóa tất cả các manager liên quan
        for manager in db_manager:
            db.delete(manager)
    
    # Commit thay đổi vào cơ sở dữ liệu
    db.commit()

    return "User and related records have been deleted."
