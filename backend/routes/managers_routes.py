from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import models, schemas
from db.database import get_db

router = APIRouter()

# Route POST để tạo mới Manager
@router.post("/", response_model=schemas.Manager)
def create_manager(manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    # Kiểm tra nếu username đã tồn tại
    db_manager = db.query(models.Manager).filter(models.Manager.username == manager.username).first()
    if db_manager:
        raise HTTPException(status_code=400, detail="Username đã tồn tại")
    
    # Tạo manager mới
    new_manager = models.Manager(
        username=manager.username, 
        password=manager.password,  # Bạn có thể mã hóa mật khẩu ở đây nếu cần
        name=manager.name,
        restaurant_id=manager.restaurant_id
    )
    
    db.add(new_manager)
    db.commit()
    db.refresh(new_manager)
    return new_manager

# Route GET để lấy thông tin Manager
@router.get("/{manager_id}", response_model=schemas.Manager)
def get_manager(manager_id: int, db: Session = Depends(get_db)):
    db_manager = db.query(models.Manager).filter(models.Manager.manager_id == manager_id).first()
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager không tồn tại")
    return db_manager

# Route PUT để cập nhật thông tin Manager
@router.put("/{manager_id}", response_model=schemas.Manager)
def update_manager(manager_id: int, manager: schemas.ManagerCreate, db: Session = Depends(get_db)):
    db_manager = db.query(models.Manager).filter(models.Manager.manager_id == manager_id).first()
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager không tồn tại")
    
    # Cập nhật thông tin manager
    db_manager.username = manager.username
    db_manager.password = manager.password  # Mã hóa mật khẩu nếu cần
    db_manager.name = manager.name
    db_manager.restaurant_id = manager.restaurant_id
    
    db.commit()
    db.refresh(db_manager)
    return db_manager

# Route DELETE để xóa Manager
@router.delete("/{manager_id}")
def delete_manager(manager_id: int, db: Session = Depends(get_db)):
    db_manager = db.query(models.Manager).filter(models.Manager.manager_id == manager_id).first()
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager không tồn tại")
    
    db.delete(db_manager)
    db.commit()
    return {"detail": "Manager đã bị xóa"}
