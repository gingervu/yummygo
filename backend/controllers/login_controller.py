from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.schemas import *
from fastapi.responses import JSONResponse
from services.login_service import authenticate_login
from utils.access_token import create_access_token

router = APIRouter()

# endpoint đăng nhập
@router.post("/token")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    user_id, role = authenticate_login(user, db)
    if not user_id:
        raise HTTPException(status_code=401, detail="Thông tin đăng nhập không hợp lệ")
    access_token = create_access_token({"user_id": user_id, "role": role})
    return {"access_token": access_token, "token_type": "bearer"}

# @router.post("/login")
# async def login(user_name: str, password: str, role: str, db: Session = Depends(get_db)):
#     user_id, role = authenticate_login_test(user_name, password, role, db)
#     if not user_id:
#         raise HTTPException(status_code=401, detail="Thông tin đăng nhập không hợp lệ")
#     access_token = create_access_token({"user_id": user_id, "role": role})
#     return {"access_token": access_token, "token_type": "bearer"}