from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.schemas import *
from models.models import *
from services.driver_service import *

from middlewares.auth_middleware import get_current_user, require_role

router = APIRouter(prefix="/drivers", tags=["Drivers"])

# ------------------------------
# Quản lý Tài Xế (Controller)
# ------------------------------

# Lấy ra thông tin tài xế
@router.get("/me", response_model=DriverResponse)
async def get_driver(current_driver: dict = Depends(require_role("driver")), db: Session = Depends(get_db)):
    return get_driver_service(current_driver['user_id'], db)


# Chỉnh sửa thông tin tài xế
@router.put("/update", response_model=DriverResponse)
<<<<<<< HEAD
async def update_driver(driver: DriverCreate, current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
=======
async def update_driver(driver: DriverChange, current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
>>>>>>> frontend/driver
    return update_driver_service(driver, current_driver['user_id'], db)

# Chuyển trạng thái tài xế
@router.put("/change-status")
async def update_status(current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
    driver = update_driver_status(current_driver['user_id'], db)
    return {"message" : "Status changed", "status" : driver.status}


# Xóa tài xế
@router.delete("/delete")
async def delete_driver(current_driver: dict = Depends(require_role("driver")), db: Session = Depends(get_db)):
    return delete_driver_service(current_driver['user_id'], db)

# Lấy ra thông tin của tài xế để hiện cho khách hàng và nhà hàng xem
@router.get("/info/{driver_id}", response_model=DriverResponse)
async def driver_info(driver_id: int, db: Session = Depends(get_db)):
    return db.query(Driver).filter(Driver.driver_id == driver_id)

# Lấy ra danh sách mã đơn hàng hiện tại của tài xế
# Dùng mã đơn để hiển thị thông tin của đơn hàng khi tài xế
# chọn xem đơn
@router.get("/order")
async def driver_order(current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
    return get_current_driver_order(current_driver['user_id'], db)

# lấy ra danh sách tất cả đơn hàng của tài xế
@router.get("/all-orders")
async def driver_orders(current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
    return get_driver_orders(current_driver['user_id'], db)
