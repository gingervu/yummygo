from fastapi import Request, Response, Query, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List
from models.schemas import *
from models.models import *
from db.database import get_db
from middlewares.auth_middleware import get_current_user, require_role
from services.address_service import *

router = APIRouter(prefix="/address", tags=["Address"])

# api dùng để search 
@router.get("/search", response_model=List[AddressSuggestion])
<<<<<<< HEAD
async def search(object: ObjectUpdateAddress):
    return address_suggestion(object)
=======
async def search(address: str):
    return address_suggestion(address)
>>>>>>> frontend/driver

@router.put("/restaurant-set", response_model=RestaurantResponse)
async def set_restaurant_address(address_choice: AddressSuggestion, 
                                 current_restaurant: dict = Depends(require_role('restaurant')),
                                 db: Session = Depends(get_db)):
    return restaurant_set_address(address_choice, current_restaurant['user_id'], db)

@router.put("/order-set")
async def set_restaurant_address(address_choice: AddressSuggestion,
                                 order_id: int, 
                                 db: Session = Depends(get_db)):
    return order_set_address(address_choice, order_id, db)