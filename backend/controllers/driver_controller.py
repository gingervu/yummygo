from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models.schemas import *
from models.models import *
from services.driver_service import (
    list_drivers_service,
    get_driver_service,
    update_driver_service,
    delete_driver_service,
)

from middlewares.auth_middleware import get_current_user

router = APIRouter(prefix="/drivers", tags=["Drivers"])

# ------------------------------
# Quản lý Tài Xế (Controller)
# ------------------------------

@router.get("/", response_model=Driver)
async def get_driver(driver_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_driver_service(driver_id, db)


@router.put("/update", response_model=Driver)
async def update_driver(driver: DriverCreate, driver_id: int = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_driver_service(driver_id, driver, db)


@router.delete("/delete", response_model=Driver)
async def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    return delete_driver_service(driver_id, db)


@router.get("/", response_model=List[Driver])
async def list_drivers(db: Session = Depends(get_db)):
    return list_drivers_service(db)
