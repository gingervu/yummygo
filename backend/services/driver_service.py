from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from fastapi import HTTPException
from typing import List

# ------------------------------
# Quản lý Logic Nghiệp Vụ Tài Xế
# ------------------------------

def list_drivers_service(db: Session) -> List[Driver]:
    """Lấy danh sách tất cả tài xế chưa bị xóa"""
    return db.query(Driver).filter(Driver.is_deleted == False).all()


def get_driver_service(driver_id: int, db: Session):
    """Lấy thông tin tài xế theo ID"""
    driver = db.query(Driver).filter(Driver.driver_id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    return driver


def update_driver_service(driver_id: int, driver: DriverCreate, db: Session):
    """Cập nhật thông tin tài xế"""
    db_driver = db.query(Driver).filter(Driver.driver_id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    
    db_driver.name = driver.name
    db_driver.status = driver.status
    db.commit()
    db.refresh(db_driver)
    return db_driver


# Cập nhật trạng thái tài xế
def update_driver_status(driver_id: int, driver: DriverUpdate, db: Session):
    db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id == driver_id, Restaurant.is_deleted == False)
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    if db_restaurant.status == RestaurantStatusEnum.active:
        db_restaurant.update({Restaurant.status: RestaurantStatusEnum.inactive})

    if db_restaurant.status == RestaurantStatusEnum.inactive:
        db_restaurant.update({Restaurant.status: RestaurantStatusEnum.active})

    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant


def delete_driver_service(driver_id: int, db: Session):
    """Xóa tài xế (đánh dấu is_deleted là True)"""
    db_driver = db.query(Driver).filter(Driver.driver_id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    
    db_driver.is_deleted = True
    db.commit()
    db.refresh(db_driver)
    return db_driver
