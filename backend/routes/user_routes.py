from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from controllers.user_controller import register_user
from db.database import get_db
from models.models import User

router = APIRouter()

@router.post("/")
def create_user(user_name: str, password: str, db: Session = Depends(get_db)):
    user = User(user_name=user_name, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_deleted = True
    db.commit()
    return {"message": "User deleted successfully"}

@router.post("/auth/register")
def register(user: dict, db: Session = Depends(get_db)):
    return register_user(db, user)
