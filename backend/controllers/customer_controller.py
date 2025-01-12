from fastapi import Request, Response, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.schemas import *
from models.models import *
from db.database import get_db
from middlewares.auth_middleware import get_current_user
from services.customer_service import (
    get_customer_by_id,
    list_all_customers,
    update_customer,
    delete_customer,
)

router = APIRouter(prefix="/customers", tags=["Customers"])


# Lấy thông tin customer
# api này sẽ dùng để hiện thông tin của customer cùng
# với /user/me
@router.get("/me", response_model=Customer)
async def get_customer(customer_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_customer_by_id(customer_id, db)

# Sửa thông tin customer
# sử dụng kết hợp với /user/update
@router.put("/update", response_model=Customer)
async def update_existing_customer(customer: CustomerCreate, customer_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_customer(customer_id, customer, db)

# Xóa customer ---> is_deleted = True
@router.delete("/delete")
async def delete_existing_customer(customer_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return delete_customer(customer_id, db)

@router.get("/", response_model=List[Customer])
async def list_customers(db: Session = Depends(get_db)):
    return list_all_customers(db)