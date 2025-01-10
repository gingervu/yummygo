from fastapi import FastAPI
from routes import admin_routes, customer_routes, driver_routes,menu_item_routes, merchant_routes, order_items_routes, order_routes, restaurant_routes, restaurant_times_routes, user_routes, managers_routes
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.models import User

app = FastAPI()

# Đăng ký routes
app.include_router(admin_routes.router, prefix="/api/admins", tags=["Admins"])
app.include_router(customer_routes.router, prefix="/api/customers", tags=["Customers"])
app.include_router(driver_routes.router, prefix="/api/drivers", tags=["Drivers"])
app.include_router(managers_routes.router, prefix="/api/managers", tags=["Managers"])
app.include_router(menu_item_routes.router, prefix="/api/menu_items", tags=["Menu Items"])
app.include_router(merchant_routes.router, prefix="/api/merchants", tags=["Merchants"])
app.include_router(order_items_routes.router, prefix="/api/order_items", tags=["Order Items"])
app.include_router(order_routes.router, prefix="/api/orders", tags=["Orders"])
app.include_router(restaurant_routes.router, prefix="/api/restaurants", tags=["Restaurants"])
app.include_router(restaurant_times_routes.router, prefix="/api/restaurant_times", tags=["Restaurant Times"])
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to YummyGo Backend!"}
