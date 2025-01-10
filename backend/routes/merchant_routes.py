from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import models, schemas
from db.database import get_db

router = APIRouter()

# creat merchant
@router.post("/", response_model=schemas.Merchant)
def create_merchant(merchant: schemas.MerchantCreate, db: Session = Depends(get_db)):
    db_merchant = db.query(models.Merchant).filter(models.Merchant.name == merchant.name).first()
    if db_merchant:
        raise HTTPException(status_code=400, detail="Merchant đã tồn tại")
    new_merchant = models.Merchant(name=merchant.name)
    db.add(new_merchant)
    db.commit()
    db.refresh(new_merchant)
    return new_merchant

# get merchant by id
@router.get("/{merchant_id}", response_model=schemas.Merchant)
def get_merchant(merchant_id: int, db: Session = Depends(get_db)):
    merchant = db.query(models.Merchant).filter(models.Merchant.merchant_id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant không tồn tại")
    return merchant

# get all merchants
@router.get("/", response_model=List[schemas.Merchant])
def list_merchants(db: Session = Depends(get_db)):
    return db.query(models.Merchant).filter(models.Merchant.is_deleted == False).all()

# delete merchant
@router.delete("/{merchant_id}")
def delete_merchant(merchant_id: int, db: Session = Depends(get_db)):
    merchant = db.query(models.Merchant).filter(models.Merchant.merchant_id == merchant_id).first()
    if not merchant:
        raise HTTPException(status_code=404, detail="Merchant không tồn tại")
    merchant.is_deleted = True
    db.commit()
    return {"detail": "Merchant đã bị xóa"}
