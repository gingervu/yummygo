# from fastapi import APIRouter, Depends, HTTPException, Response
# from services.auth_service import login_user_service, logout
# from models import schemas
# from db.database import get_db
# from sqlalchemy.orm import Session
# from fastapi import APIRouter, Depends, HTTPException, Response
# from sqlalchemy.orm import Session
# from typing import List
# from db.database import get_db
# from models.schemas import *
# from fastapi.responses import JSONResponse
# from services.login_service import authenticate_login
# from utils.access_token import create_access_token
# from datetime import timedelta
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# from db.database import get_db
# from services.register_service import *
# from models.schemas import *
# from models.models import *
# from middlewares.auth_middleware import get_current_user

# router = APIRouter(prefix="/auth", tags=["Auth"])

# # ------------------------------
# # Quản lý Thông tin Cá nhân
# # Người dùng có thể cập nhật thông tin cá nhân như tên, số điện thoại, địa chỉ, và phương thức thanh toán.
# # ------------------------------

# # endpoint đăng nhập
# @router.post("/token")
# async def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
#     user_id, role = authenticate_login(user, db)
#     if not user_id:
#         raise HTTPException(status_code=401, detail="Thông tin đăng nhập không hợp lệ")
#     access_token = create_access_token({"user_id": user_id, "role": role})
    
#     response.set_cookie(
#         key="access_token",
#         value=access_token,
#         path="/",
#         httponly=True,
#         secure=False,  
#         max_age=timedelta(days=3),
#         expires=timedelta(days=3),
#         samesite="Strict" 
#     )
    
#     return {"message": "Login successful"}

# @router.post("/logout")
# async def logout(token: str = Depends(get_current_user)):

#     response = JSONResponse(content={"message": "Logout successful"})
#     response.delete_cookie(key="access_token")  # Xóa cookie 
    
#     return response


# # Đăng ký với vai trò khách hàng
# @router.post("/customer")
# async def register(user: UserCreate, customer: CustomerCreate, db: Session = Depends(get_db)):
#     try:
#         create_customer(user, customer, db)
#         return {"message": "Đăng ký thành công với vai trò khách hàng."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi đăng ký khách hàng: {str(e)}")

# # Đăng ký thêm vai trò khách hàng
# @router.post("/add-customer")
# async def add_role(customer: CustomerCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     try:
#         become_customer(customer, current_user['user_id'], db)
#         return {"message": "Thêm vai trò khách hàng thành công."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi thêm vai trò khách hàng: {str(e)}")

# # Đăng ký với vai trò tài xế
# @router.post("/driver")
# async def register(user: UserCreate, driver: DriverCreate, db: Session = Depends(get_db)):
#     try:
#         create_driver(user, driver, db)
#         return {"message": "Đăng ký thành công với vai trò tài xế."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi đăng ký tài xế: {str(e)}")

# # Đăng ký thêm vai trò tài xế
# @router.post("/add-driver")
# async def add_role(driver: DriverCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     try:
#         become_driver(driver, current_user['user_id'], db)
#         return {"message": "Thêm vai trò tài xế thành công."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi thêm vai trò tài xế: {str(e)}")

# # Đăng ký với vai trò nhà hàng
# @router.post("/restaurant")
# async def register(user: UserCreate, restaurant: RestaurantCreate, db: Session = Depends(get_db)):
#     try:
#         create_restaurant(user, restaurant, db)
#         return {"message": "Đăng ký thành công với vai trò nhà hàng."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi đăng ký nhà hàng: {str(e)}")

# # Đăng ký thêm vai trò nhà hàng
# @router.post("/add-restaurant")
# async def add_role(restaurant: RestaurantCreate, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     try:
#         become_restaurant(restaurant, current_user['user_id'], db)
#         return {"message": "Thêm vai trò nhà hàng thành công."}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Lỗi khi thêm vai trò nhà hàng: {str(e)}")
