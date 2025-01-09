from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.models import Admin

router = APIRouter()

@router.post("/")
def create_admin(name: str, db: Session = Depends(get_db)):
    admin = Admin(name=name)
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

@router.get("/{admin_id}")
def get_admin(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.admin_id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

@router.delete("/{admin_id}")
def delete_admin(admin_id: int, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.admin_id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    db.delete(admin)
    db.commit()
    return {"message": "Admin deleted successfully"}