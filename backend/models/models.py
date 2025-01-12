from sqlalchemy import (
    Column, Integer, String, ForeignKey, Boolean, Text, DECIMAL, Enum, Time, DateTime
)
from geoalchemy2 import Geometry # pip install GeoAlchemy2
from db.database import Base
from sqlalchemy.orm import relationship
from enums import *

# -------------------------
# Định nghĩa các bảng
# -------------------------

# Bảng User - Lưu thông tin người dùng
class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)  # ID tự tăng
    user_name = Column(String, unique=True, nullable=False)         # Tên người dùng (bắt buộc, duy nhất)
    password = Column(String, nullable=False)                       # Mật khẩu (bắt buộc)
    phone = Column(String, unique=True)                             # Số điện thoại (duy nhất)
    email = Column(String, unique=True)                             # Email (duy nhất)
    is_deleted = Column(Boolean, default=False)                     # Đánh dấu người dùng đã bị xóa

# Bảng Restaurant - Lưu thông tin nhà hàng
class Restaurant(Base):
    __tablename__ = 'restaurants'
    restaurant_id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    category = Column(Enum(CategoryEnum))  # Danh mục nhà hàng
    address = Column(Text, nullable=False)
    coord = Column(Geometry('POINT'), nullable=False)  # Tọa độ địa lý của nhà hàng
    status = Column(Enum(RestaurantStatusEnum), default=RestaurantStatusEnum.inactive)  # Trạng thái
    is_deleted = Column(Boolean, default=False)

    menu_items = relationship("MenuItem", back_populates="restaurant")
    times = relationship("RestaurantTime", back_populates="restaurant")

# Bảng lưu giờ hoạt động của nhà hàng
class RestaurantTime(Base):
    __tablename__ = 'restaurant_times'
    restaurant_id = Column(Integer, ForeignKey('restaurants.restaurant_id'), primary_key=True)
    day = Column(Enum(DayEnum), primary_key=True)  # Ngày trong tuần
    open_time = Column(Time, nullable=False)      # Giờ mở cửa
    close_time = Column(Time, nullable=False)     # Giờ đóng cửa

    restaurant = relationship("Restaurant", back_populates="times")

# Bảng MenuItem - Lưu thông tin món ăn
class MenuItem(Base):
    __tablename__ = 'menu_items'
    item_id = Column(Integer, primary_key=True, autoincrement=True)
    restaurant_id = Column(Integer, ForeignKey('restaurants.restaurant_id'), nullable=False)
    name = Column(String, nullable=False)
    img_url = Column(Text)  # URL hình ảnh món ăn
    description = Column(Text)  # Mô tả món ăn
    price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(Enum(ItemStatusEnum), default=ItemStatusEnum.unavailable)  # Trạng thái món ăn
    is_deleted = Column(Boolean, default=False)

    restaurant = relationship("Restaurant", back_populates="menu_items")

# Bảng Driver - Lưu thông tin tài xế
class Driver(Base):
    __tablename__ = 'drivers'
    driver_id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    status = Column(Enum(DriverStatusEnum), default=DriverStatusEnum.inactive)
    is_deleted = Column(Boolean, default=False)

# Bảng Admin - Lưu thông tin quản trị viên
class Admin(Base):
    __tablename__ = 'admins'
    admin_id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)

# Bảng Customer - Lưu thông tin khách hàng
class Customer(Base):
    __tablename__ = 'customers'
    customer_id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    is_deleted = Column(Boolean, default=False)

# Bảng Order - Lưu thông tin đơn hàng
class Order(Base):
    __tablename__ = 'orders'
    order_id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'), nullable=False)
    restaurant_id = Column(Integer, ForeignKey('restaurants.restaurant_id'), nullable=False)
    driver_id = Column(Integer, ForeignKey('drivers.driver_id'))
    address = Column(Text)
    coord = Column(Geometry('POINT'))
    delivery_fee = Column(DECIMAL(10, 2))
    food_fee = Column(DECIMAL(10, 2))
    order_status = Column(Enum(OrderStatusEnum), default=OrderStatusEnum.cart)
    created_at = Column(DateTime)
    delivered_at = Column(DateTime)
    note = Column(Text)

    # Quan hệ với Customer, Restaurant, và Driver
    customer = relationship("Customer", back_populates="orders")
    restaurant = relationship("Restaurant")
    driver = relationship("Driver")

# Quan hệ giữa Customer và Order
Customer.orders = relationship("Order", back_populates="customer")

# Bảng OrderItem - Lưu thông tin chi tiết món ăn trong đơn hàng
class OrderItem(Base):
    __tablename__ = 'order_items'
    item_id = Column(Integer, ForeignKey('menu_items.item_id'), primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'), primary_key=True)
    price = Column(DECIMAL(10, 2))
    quantity = Column(Integer, default=1)

# Bảng Manager - Lưu thông tin quản lý nhà hàng
class Manager(Base):
    __tablename__ = 'managers'
    manager_id = Column(Integer, primary_key=True, autoincrement=True)
    restaurant_id = Column(Integer, ForeignKey('restaurants.restaurant_id'), nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(Text, nullable=False)
