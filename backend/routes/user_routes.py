from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models import models, schemas

router = APIRouter()

# ------------------------------ 
# Quản lý User
# ------------------------------

@router.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_name == user.user_name).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username đã tồn tại")
    
    # Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu (ví dụ dùng bcrypt)
    hashed_password = user.password  # Thực tế bạn cần mã hóa mật khẩu

    db_user = models.User(
        user_name=user.user_name,
        password=hashed_password,
        phone=user.phone,
        email=user.email
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User không tồn tại")
    return db_user

@router.get("/", response_model=List[schemas.User])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).filter(models.User.is_deleted == False).all()

@router.put("/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User không tồn tại")
    
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

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User không tồn tại")
    
    db_user.is_deleted = True
    db.commit()
    return {"detail": "User đã bị xóa"}
