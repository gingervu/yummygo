from fastapi import FastAPI, Request
from routes.api_router import api_router
import sys
sys.path.append("d:/yummygo/backend")
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="FastAPI Application")

# origins = [

#     "http://localhost:5173"  # Thêm domain frontend của bạn
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Thay bằng domain frontend của bạn
    allow_credentials=True,                  # Cho phép cookie/credentials
    allow_methods=["*"],                     # Cho phép tất cả các phương thức (GET, POST, OPTIONS, ...)
    allow_headers=["*"],                     # Cho phép tất cả header
)

# @app.middleware("http")
# async def add_cors_headers(request: Request, call_next):
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
#     response.headers["Access-Control-Allow-Methods"] = "*"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     return response

# Đăng ký tất cả router
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI application!"}