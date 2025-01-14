from fastapi import APIRouter, Depends, HTTPException, Response
from services.auth_service import login_user_service, logout
from models import schemas
from db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------------------
# Quản lý Thông tin Cá nhân
# Người dùng có thể cập nhật thông tin cá nhân như tên, số điện thoại, địa chỉ, và phương thức thanh toán.
# ------------------------------


@router.post("/login", response_model=schemas.UserLogin)
async def login(user: schemas.UserLogin, response: Response, db: Session = Depends(get_db)):
    try:
        db_user = login_user_service(user, db, response)
        return db_user
    except HTTPException as e:
        raise e

@router.post("/logout")
async def logout_user(response: Response):
    return logout(response)

