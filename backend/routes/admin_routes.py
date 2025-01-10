from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import models, schemas
from db.database import get_db

router = APIRouter()

# Route POST: Tạo mới Admin
@router.post("/", response_model=schemas.Admin)
def create_admin(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    # Kiểm tra xem admin đã tồn tại hay chưa
    db_admin = db.query(models.Admin).filter(models.Admin.name == admin.name).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Admin đã tồn tại")
    
    # Tạo đối tượng Admin mới
    new_admin = models.Admin(name=admin.name)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    
    return new_admin

# Route GET: Lấy thông tin Admin theo admin_id
@router.get("/{admin_id}", response_model=schemas.Admin)
def get_admin(admin_id: int, db: Session = Depends(get_db)):
    db_admin = db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()
    if not db_admin:
        raise HTTPException(status_code=404, detail="Admin không tồn tại")
    return db_admin

