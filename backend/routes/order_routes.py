from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.models import Order

router = APIRouter()

@router.post("/")
def create_order(customer_id: int, restaurant_id: int, address: str, coord: str, db: Session = Depends(get_db)):
    order = Order(customer_id=customer_id, restaurant_id=restaurant_id, address=address, coord=f"POINT({coord})")
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.order_status = status
    db.commit()
    return order