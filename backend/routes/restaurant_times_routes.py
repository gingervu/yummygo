from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import models, schemas
from models.schemas import DayEnum
from db.database import get_db

router = APIRouter()

# ------------------------------
# Quản lý Thời gian Nhà Hàng
# ------------------------------

# Lấy thông tin thời gian của một nhà hàng
@router.get("/{restaurant_id}/times", response_model=List[schemas.RestaurantTimeResponse])
def get_restaurant_times(restaurant_id: int, db: Session = Depends(get_db)):
    times = db.query(models.RestaurantTime).filter(models.RestaurantTime.restaurant_id == restaurant_id).all()
    if not times:
        raise HTTPException(status_code=404, detail="Không tìm thấy thời gian nhà hàng")
    return times

# Thêm thời gian cho nhà hàng
@router.post("/{restaurant_id}/times", response_model=schemas.RestaurantTimeResponse)
def create_restaurant_time(restaurant_id: int, time: schemas.RestaurantTimeCreate, db: Session = Depends(get_db)):
    db_time = db.query(models.RestaurantTime).filter(
        models.RestaurantTime.restaurant_id == restaurant_id,
        models.RestaurantTime.day == time.day
    ).first()
    
    if db_time:
        raise HTTPException(status_code=400, detail="Thời gian cho ngày này đã tồn tại")
    
    new_time = models.RestaurantTime(
        restaurant_id=restaurant_id,
        day=time.day,
        open_time=time.open_time,
        close_time=time.close_time
    )
    
    db.add(new_time)
    db.commit()
    db.refresh(new_time)
    return new_time

# Cập nhật thời gian cho nhà hàng
@router.put("/{restaurant_id}/times/{day}", response_model=schemas.RestaurantTimeResponse)
def update_restaurant_time(restaurant_id: int, day: DayEnum, time: schemas.RestaurantTimeUpdate, db: Session = Depends(get_db)):
    db_time = db.query(models.RestaurantTime).filter(
        models.RestaurantTime.restaurant_id == restaurant_id,
        models.RestaurantTime.day == day
    ).first()
    
    if not db_time:
        raise HTTPException(status_code=404, detail="Thời gian không tồn tại")
    
    db_time.open_time = time.open_time
    db_time.close_time = time.close_time
    db.commit()
    db.refresh(db_time)
    return db_time

# Xóa thời gian của nhà hàng
@router.delete("/{restaurant_id}/times/{day}")
def delete_restaurant_time(restaurant_id: int, day: DayEnum, db: Session = Depends(get_db)):
    db_time = db.query(models.RestaurantTime).filter(
        models.RestaurantTime.restaurant_id == restaurant_id,
        models.RestaurantTime.day == day
    ).first()
    
    if not db_time:
        raise HTTPException(status_code=404, detail="Thời gian không tồn tại")
    
    db.delete(db_time)
    db.commit()
    return {"detail": f"Thời gian cho {day} đã bị xóa"}
