from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db 
from models import models, schemas  
router = APIRouter()

# ------------------------------
# Quản lý Tài Xế
# ------------------------------

# Tạo tài xế mới
@router.post("/", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.name == driver.name).first()
    if db_driver:
        raise HTTPException(status_code=400, detail="Tài xế đã tồn tại")
    
    new_driver = models.Driver(name=driver.name, status=driver.status)
    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return new_driver

# Lấy danh sách tất cả tài xế (chưa bị xóa)
@router.get("/", response_model=List[schemas.Driver])
def list_drivers(db: Session = Depends(get_db)):
    return db.query(models.Driver).filter(models.Driver.is_deleted == False).all()

# Lấy thông tin tài xế theo ID
@router.get("/{driver_id}", response_model=schemas.Driver)
def get_driver(driver_id: int, db: Session = Depends(get_db)):
    driver = db.query(models.Driver).filter(models.Driver.driver_id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    return driver

# Cập nhật thông tin tài xế
@router.put("/{driver_id}", response_model=schemas.Driver)
def update_driver(driver_id: int, driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.driver_id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    
    db_driver.name = driver.name
    db_driver.status = driver.status
    db.commit()
    db.refresh(db_driver)
    return db_driver

# Xóa tài xế (thực tế sẽ không xóa, chỉ đánh dấu is_deleted là True)
@router.delete("/{driver_id}", response_model=schemas.Driver)
def delete_driver(driver_id: int, db: Session = Depends(get_db)):
    db_driver = db.query(models.Driver).filter(models.Driver.driver_id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Tài xế không tồn tại")
    
    db_driver.is_deleted = True
    db.commit()
    db.refresh(db_driver)
    return db_driver
