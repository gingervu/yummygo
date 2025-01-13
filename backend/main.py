from fastapi import FastAPI
from routes.api_router import api_router
import sys
sys.path.append("d:/yummygo/backend")

app = FastAPI(title="FastAPI Application")

# Đăng ký tất cả router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI application!"}
