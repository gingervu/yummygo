from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import models, schemas
from db.database import get_db

router = APIRouter()

# Tạo nhà hàng mới
@router.post("/", response_model=schemas.Restaurant)
def create_restaurant(restaurant: schemas.RestaurantCreate, db: Session = Depends(get_db)):
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.name == restaurant.name).first()
    if db_restaurant:
        raise HTTPException(status_code=400, detail="Nhà hàng đã tồn tại")
    new_restaurant = models.Restaurant(
        name=restaurant.name,
        category=restaurant.category,
        phone=restaurant.phone,
        address=restaurant.address,
        coord=restaurant.coord,
        status=restaurant.status
    )
    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)
    return new_restaurant

# Lấy thông tin nhà hàng theo ID
@router.get("/{restaurant_id}", response_model=schemas.Restaurant)
def get_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    return restaurant

# Lấy danh sách nhà hàng
@router.get("/", response_model=List[schemas.Restaurant])
def list_restaurants(db: Session = Depends(get_db)):
    return db.query(models.Restaurant).filter(models.Restaurant.is_deleted == False).all()

# Cập nhật nhà hàng
@router.put("/{restaurant_id}", response_model=schemas.Restaurant)
def update_restaurant(restaurant_id: int, restaurant: schemas.RestaurantUpdate, db: Session = Depends(get_db)):
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.restaurant_id == restaurant_id).first()
    if not db_restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    for key, value in restaurant.dict(exclude_unset=True).items():
        setattr(db_restaurant, key, value)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

# Xóa nhà hàng
@router.delete("/{restaurant_id}")
def delete_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.restaurant_id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")
    restaurant.is_deleted = True
    db.commit()
    return {"detail": "Nhà hàng đã bị xóa"}
