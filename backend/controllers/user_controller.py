from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.schemas import *
from models.models import *
from services import user_service
from fastapi.responses import JSONResponse
from middlewares.auth_middleware import *
 
router = APIRouter(prefix="/users", tags=["Users"])

# lấy thông tin user bao gồm: user_name, phone, email
@router.get("/me")
async def get_user(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        db_user = user_service.get_user(user_id, db)
        return db_user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# tạo user mới
@router.post("/create")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = user_service.create_user(user, db)
        return db_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# @router.get("/", response_model=List[User])
# async def list_users(db: Session = Depends(get_db)):
#     return list_users(db)

# sửa thông tin tài khoản
@router.put("/update")
async def update_user(user: UserUpdate, user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        db_user = user_service.update_user(user_id, user, db)
        return db_user
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# xóa user
@router.delete("/delete")
async def delete_user(user_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        message = user_service.delete_user(user_id, db)
        return {"detail": message}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
