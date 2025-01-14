from sqlalchemy.orm import Session
from models.models import *
from models.schemas import *
from fastapi import HTTPException, status
from typing import List

def get_customer_by_id(customer_id: int, db: Session):
    """
    Lấy thông tin Customer theo ID.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    return db_customer

def update_customer(customer_id: int, customer: CustomerCreate, db: Session):
    """
    Cập nhật thông tin của Customer.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    # Cập nhật thông tin từ dữ liệu mới
    for key, value in customer.model_dump().items():
        if value is not None:
            if isinstance(value, str):
                if value == "":
                    continue
            setattr(db_customer, key, value)
    
    db.commit()
    db.refresh(db_customer)
    return db_customer


def delete_customer(customer_id: int, db: Session):
    """
    Đánh dấu xóa (is_deleted=True) thay vì xóa khỏi cơ sở dữ liệu.
    """
    db_customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not db_customer:
        raise HTTPException(status_code=404, detail="Customer không tồn tại")
    
    # Đánh dấu Customer là đã xóa
    db_customer.is_deleted = True
    db.commit()
    return {"detail": "Customer đã bị xóa"}


def list_all_customers(db: Session) -> List[Customer]:
    """
    Lấy danh sách tất cả các Customers chưa bị xóa (is_deleted=False).
    """
    db_customers = db.query(Customer).filter(Customer.is_deleted == False).all()
    return db_customers
