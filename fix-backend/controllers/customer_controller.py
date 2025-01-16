from fastapi import Request, Response, Query, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List
from models.schemas import *
from models.models import *
from db.database import get_db
from middlewares.auth_middleware import get_current_user, require_role
from services.customer_service import *

router = APIRouter(prefix="/customers", tags=["Customers"])


# Lấy thông tin customer
# api này sẽ dùng để hiện thông tin của customer cùng
# với /user/me
@router.get("/me", response_model=CustomerResponse)
async def get_customer(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return get_customer_by_id(current_customer['user_id'], db)

# Sửa thông tin customer
# sử dụng kết hợp với /user/update
@router.put("/update", response_model=CustomerResponse)
async def update_existing_customer(customer: CustomerCreate, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return update_customer(current_customer['user_id'], customer, db)

# Xóa customer ---> is_deleted = True
@router.delete("/delete")
async def delete_existing_customer(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return delete_customer(current_customer['user_id'], db)

# @router.get("/", response_model=List[CustomerSchema])
# async def list_customers(db: Session = Depends(get_db)):
#     return list_all_customers(db)

# Tạo đơn
@router.put("/send-order/{order_id}")
async def create_an_order(order_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return create_order(order_id, current_customer['user_id'], db)

# Tìm kiếm trên thanh tìm kiếm, trả về danh sách nhà hàng
@router.get("/search")
async def search(query: str = Query(None, min_length=1, max_length=50), db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).filter(
        or_(Restaurant.name.ilike(f"%{query}%"), Restaurant.category.cast(String).ilike(f"%{query}%"))
    ).all()
            
    items = db.query(MenuItem).filter(
        or_(MenuItem.name.ilike(f"%{query}%"), MenuItem.description.ilike(f"%{query}%"))
    ).all()
    
    if items:
        db_restaurant = db.query(Restaurant).filter(Restaurant.restaurant_id.in_([item.restaurant_id for item in items])).all()
        restaurants.extend(db_restaurant)
    return restaurants

# Tìm kiếm bằng category filter
@router.get("/filter")
async def filter(category: str, db: Session = Depends(get_db)):
    return db.query(Restaurant).filter(Restaurant.category == category).all()



@router.get("/restaurants", response_model=PaginatedRestaurantsResponse)
async def get_restaurants(skip: int = Query(0, ge=0), limit: int = Query(10, le=100), db: Session = Depends(get_db)):
    total = db.query(Restaurant).count()
    restaurants = db.query(Restaurant).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "restaurants": restaurants,
    }