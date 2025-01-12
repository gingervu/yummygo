from fastapi import Request, HTTPException, status, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from models import models
from typing import Annotated
from utils.jwt import *
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer

# async def auth_middleware(request: Request, call_next):
#     token = request.headers.get("Authorization")
#     if not token or token != "your_token":
#         raise HTTPException(status_code=401, detail="Unauthorized")
#     response = await call_next(request)
#     return response
# app = FastAPI()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        user_id = decode_access_token(token)["user_id"]
        return user_id
    except HTTPException as e:
        raise e