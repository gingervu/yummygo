from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.models import MenuItem

router = APIRouter()

@router.post("/")
def create_menu_item(name: str, price: float, restaurant_id: int, description: str = None, db: Session = Depends(get_db)):
    menu_item = MenuItem(name=name, price=price, restaurant_id=restaurant_id, description=description)
    db.add(menu_item)
    db.commit()
    db.refresh(menu_item)
    return menu_item

@router.get("/{item_id}")
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    menu_item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return menu_item

@router.delete("/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    menu_item = db.query(MenuItem).filter(MenuItem.item_id == item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    menu_item.is_deleted = True
    db.commit()
    return {"message": "Menu item deleted successfully"}
