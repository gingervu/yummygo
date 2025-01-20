<<<<<<< HEAD
from fastapi import FastAPI
=======
from fastapi import FastAPI, Request
>>>>>>> frontend/driver
from routes.api_router import api_router
import sys
sys.path.append("d:/yummygo/backend")
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
=======
from fastapi.responses import JSONResponse
>>>>>>> frontend/driver

app = FastAPI(title="FastAPI Application")

origins = [
<<<<<<< HEAD
    "http://localhost:3000"  # Thêm domain frontend của bạn
=======
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
>>>>>>> frontend/driver
]

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=origins,  # Cho phép chia sẻ cookie giữa các domain
=======
    allow_origins= origins,  # Cho phép client từ localhost:3000
>>>>>>> frontend/driver
    allow_credentials=True,  # Bật gửi cookies trong các yêu cầu
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# Đăng ký tất cả router
app.include_router(api_router)

=======
# @app.middleware("http")
# async def add_cors_headers(request: Request, call_next):
#     response = await call_next(request)
#     response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
#     response.headers["Access-Control-Allow-Methods"] = "*"
#     response.headers["Access-Control-Allow-Headers"] = "*"
#     response.headers["Access-Control-Allow-Credentials"] = "true"
#     return response


# Đăng ký tất cả router
app.include_router(api_router)



>>>>>>> frontend/driver
@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI application!"}
