from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import models, schemas
from db.database import get_db

router = APIRouter()

# Tạo Customer mới
@router.post("/", response_model=schemas.Customer)
def create_customer(customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    # Kiểm tra xem Customer đã tồn tại chưa (dựa vào name)
    db_customer = db.query(models.Customer).filter(models.Customer.name == customer.name).first()
    if db_customer:
        raise HTTPException(status_code=400, detail="Customer đã tồn tại")
    
    # Tạo Customer mới và thêm vào cơ sở dữ liệu
    new_customer = models.Customer(name=customer.name, is_deleted=customer.is_deleted)
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)  # Refresh để lấy lại giá trị của customer_id
    return new_customer

# Lấy thông tin Customer theo customer_id
@router.get("/{customer_id}", response_model=schemas.Customer)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    return db_customer

# Lấy danh sách tất cả Customers (chưa bị xóa)
@router.get("/", response_model=List[schemas.Customer])
def list_customers(db: Session = Depends(get_db)):
    db_customers = db.query(models.Customer).filter(models.Customer.is_deleted == False).all()
    return db_customers

# Cập nhật thông tin Customer
@router.put("/{customer_id}", response_model=schemas.Customer)
def update_customer(customer_id: int, customer: schemas.CustomerCreate, db: Session = Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    # Cập nhật các thuộc tính của Customer
    for key, value in customer.dict().items():
        setattr(db_customer, key, value)
    
    db.commit()
    db.refresh(db_customer)
    return db_customer

# Xóa (đánh dấu xóa) Customer
@router.delete("/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    db_customer = db.query(models.Customer).filter(models.Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    # Đánh dấu is_deleted = True thay vì xóa thực sự
    db_customer.is_deleted = True
    db.commit()
    return {"detail": "Customer đã bị xóa"}
