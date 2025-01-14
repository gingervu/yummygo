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
@router.get("/me", response_model=DriverSchema)
async def get_driver(current_driver: dict = Depends(require_role("driver")), db: Session = Depends(get_db)):
    return get_driver_service(current_driver['user_id'], db)

# Chỉnh sửa thông tin tài xế
@router.put("/update", response_model=DriverSchema)
async def update_driver(driver: DriverCreate, current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
    return update_driver_service(driver, current_driver['user_id'], db)

# Chuyển trạng thái tài xế
@router.put("/change-status")
async def update_status(current_driver: dict = Depends(require_role('driver')), db: Session = Depends(get_db)):
    driver = update_driver_status(current_driver['user_id'], db)
    return {"message" : "Status changed", "status" : driver.status}


# Xóa tài xế
@router.delete("/delete", response_model=DriverSchema)
async def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    return delete_driver_service(driver_id, db)


# @router.get("/", response_model=List[DriverSchema])
# async def list_drivers(db: Session = Depends(get_db)):
#     return list_drivers_service(db)
