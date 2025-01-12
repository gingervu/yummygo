from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from services.restaurant_service import *
from models.schemas import *
from models.models import *
from middlewares.auth_middleware import get_current_user

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])
    
#Lấy thông tin nhà hàng --> cho tài khoản nhà hàng xem
@router.get("/me")
async def get_restaurant_info(restaurant_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_restaurant(restaurant_id, db)

# Cập nhật thông tin nhà hàng
@router.put("/update")
async def update_restaurant_(restaurant: RestaurantUpdate, restaurant_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_restaurant(restaurant_id, restaurant, db)

# Xóa nhà hàng
@router.delete("/delete")
async def delete_restaurant_(restaurant_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return delete_restaurant(restaurant_id, db)

@router.put("/change-status")
async def change_status(restaurant_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_restaurant_status(restaurant_id, db)

# Lấy danh sách các nhà hàng đang active --> customer duyệt
@router.get("/active")
async def list_restaurants_(db: Session = Depends(get_db)):
    return list_restaurants(db)

# Lấy thông tin nhà hàng theo ID ---> hiện trên giao diện customer
@router.get("/{restaurant_id}")
async def get_restaurant_by_id(restaurant_id: int, db: Session = Depends(get_db)):
    return get_restaurant(restaurant_id, db)
