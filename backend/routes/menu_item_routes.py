from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from models import models, schemas

router = APIRouter()

# ------------------------------
# Quản lý Menu Items
# ------------------------------
@router.post("/", response_model=schemas.MenuItem)
def create_menu_item(menu_item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    # Kiểm tra nếu nhà hàng có trong cơ sở dữ liệu
    restaurant = db.query(models.Restaurant).filter(models.Restaurant.restaurant_id == menu_item.restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Nhà hàng không tồn tại")

    # Tạo mới menu item
    new_menu_item = models.MenuItem(**menu_item.dict())
    db.add(new_menu_item)
    db.commit()
    db.refresh(new_menu_item)
    return new_menu_item

@router.get("/", response_model=List[schemas.MenuItem])
def list_menu_items(db: Session = Depends(get_db)):
    # Lấy tất cả menu items chưa bị xóa
    return db.query(models.MenuItem).filter(models.MenuItem.is_deleted == False).all()

@router.get("/{item_id}", response_model=schemas.MenuItem)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    menu_item = db.query(models.MenuItem).filter(models.MenuItem.item_id == item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Món ăn không tồn tại")
    return menu_item

@router.put("/{item_id}", response_model=schemas.MenuItem)
def update_menu_item(item_id: int, menu_item: schemas.MenuItemUpdate, db: Session = Depends(get_db)):
    db_menu_item = db.query(models.MenuItem).filter(models.MenuItem.item_id == item_id).first()
    if not db_menu_item:
        raise HTTPException(status_code=404, detail="Món ăn không tồn tại")
    
    for key, value in menu_item.dict(exclude_unset=True).items():
        setattr(db_menu_item, key, value)

    db.commit()
    db.refresh(db_menu_item)
    return db_menu_item

@router.delete("/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    db_menu_item = db.query(models.MenuItem).filter(models.MenuItem.item_id == item_id).first()
    if not db_menu_item:
        raise HTTPException(status_code=404, detail="Món ăn không tồn tại")
    
    db_menu_item.is_deleted = True
    db.commit()
    return {"detail": "Món ăn đã bị xóa"}
