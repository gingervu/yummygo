from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from models.enums import *
from fastapi import HTTPException
from models import models

# Lấy thông tin nhà hàng theo ID 
def get_restaurant(restaurant_id: int, db: Session):
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id,
                                             Restaurant.is_deleted == False,
                                             Restaurant.status == RestaurantStatusEnum.active).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    return restaurant

# Lấy danh sách nhà hàng để khách hàng duyệt
def list_restaurants(db: Session):
    return db.query(Restaurant).filter(Restaurant.is_deleted == False,
                                       Restaurant.status == RestaurantStatusEnum.active).all()

# Cập nhật nhà hàng
def update_restaurant(restaurant_id: int, restaurant: RestaurantUpdate, db: Session):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id, Restaurant.is_deleted == False).first()
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    for key, value in restaurant.model_dump().items():
        setattr(db_restaurant, key, value)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

# Cập nhật trạng thái nhà hàng
def update_restaurant_status(restaurant_id: int, db: Session):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id,
                                                Restaurant.is_deleted == False)
    restaurant = db_restaurant.first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    if restaurant.status == RestaurantStatusEnum.active:
        db_restaurant.update({Restaurant.status: RestaurantStatusEnum.inactive})

    if restaurant.status == RestaurantStatusEnum.inactive:
        db_restaurant.update({Restaurant.status: RestaurantStatusEnum.active})

    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

# Xóa nhà hàng
def delete_restaurant(restaurant_id: int, db: Session):
    restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    restaurant.is_deleted = True
    db.commit()
    return {"detail": "Nhà hàng đã bị xóa"}