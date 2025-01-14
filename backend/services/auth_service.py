# from passlib.context import CryptContext
# from fastapi import HTTPException, Response, status, Cookie
# from services.jwt_service import create_jwt_token, decode_jwt_token
# from models import models, schemas
# from passlib.hash import bcrypt

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Login
# def login_user_service(user: schemas.UserLogin, db, response: Response) -> models.User:
#     db_user = db.query(models.User).filter(models.User.user_name == user.user_name).first()

#     if not db_user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid credentials"
#         )

#     if not pwd_context.verify(user.password, db_user.password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid credentials"
#         )

#     # Tạo token
#     token = create_jwt_token({"user_id": db_user.user_id})
#     response.set_cookie(key="session_id", value=token, httponly=True)
    
#     return db_user

# # Get current user (from token in cookie)
# def get_current_user(session_id: str = Cookie(None)):
#     if not session_id:
#         raise HTTPException(status_code=401, detail="No session cookie found")
#     try:
#         payload = decode_jwt_token(session_id)
#         return {"user_id": payload["user_id"]}
#     except Exception:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")

# # Logout
# def logout(response: Response):
#     response.delete_cookie(key="session_id")
#     return "Logged out"
