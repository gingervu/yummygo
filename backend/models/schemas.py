from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from decimal import Decimal
from datetime import datetime, time
# from object_enums import *

from enum import Enum
# -------------------------
# Định nghĩa các ENUM
# -------------------------

class RoleEnum(str, Enum):
    customer = "customer"
    driver = "driver"
    restaurant = "restaurant"
    
# Trạng thái của tài xế
class DriverStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"

# Trạng thái của nhà hàng
class RestaurantStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"

# Trạng thái của món ăn
class ItemStatusEnum(str, Enum):
    available = "available"
    unavailable = "unavailable"

# Các ngày trong tuần
class DayEnum(str, Enum):
    Monday = "Monday"
    Tuesday = "Tuesday"
    Wednesday = "Wednesday"
    Thursday = "Thursday"
    Friday = "Friday"
    Saturday = "Saturday"
    Sunday = "Sunday"

# Trạng thái của đơn hàng
class OrderStatusEnum(str, Enum):
    cart = "cart"
    pending = "pending"
    preparing = "preparing"
    delivering = "delivering"
    delivered = "delivered"
    completed = "completed"
    cancelled = "cancelled"

# Các danh mục nhà hàng
class CategoryEnum(str, Enum):
    bun_pho_chao = "Bún - Phở - Cháo"
    banh_mi_xoi = "Bánh Mì - Xôi"
    ga_ran_burger = "Gà rán - Burger"
    com = "Cơm"
    hai_san = "Hải sản"
    do_chay = "Đồ chay"
    ca_phe = "Cà phê"
    tra_sua = "Trà sữa"
    trang_mieng = "Tráng miệng"
    an_vat = "Ăn vặt"
    pizza_my_y = "Pizza - Mì Ý"
    banh_viet_nam = "Bánh Việt Nam"
    lau_nuong = "Lẩu - Nướng"
    @classmethod
    def _missing_(cls, value):
        """Nếu không tìm thấy giá trị trong Enum, trả về giá trị None hoặc xử lý theo cách của bạn."""
        for item in cls:
            if item.value == value:
                return item
        return None
    
# ------------------------------
# Mô hình User (Người dùng)
# ------------------------------

class UserBase(BaseModel):
    user_name: str  # Tên người dùng
    phone: Optional[str] = None  # Số điện thoại, có thể rỗng
    email: Optional[str] = None  # Email, có thể rỗng

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class UserSchema(UserBase):
    user_id: int  # ID người dùng
    is_deleted: bool  # Trạng thái xóa người dùng (True nếu đã xóa)

class UserUpdate(UserBase):
    password: Optional[str] = None  # Mật khẩu có thể thay đổi khi cập nhật
    phone: Optional[str] = None  # Số điện thoại có thể thay đổi
    email: Optional[EmailStr] = None  # Email có thể thay đổi

class UserLogin(BaseModel):
    user_name: str
    password: str
    role: str
    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class UserResponse(BaseModel):
    user_id: int
    user_name: str
    phone: Optional[str]
    email: Optional[str]
    role: str
    
class UserUpdate(BaseModel):
    user_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    
    
from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    user_name: str
    password: str
    phone: Optional[str] = None
    email: Optional[str] = None

class UserLogin(BaseModel):
    user_name: str
    password: str

class UserProfile(BaseModel):
    user_name: str
    phone: Optional[str] = None
    email: Optional[str] = None

class Address(BaseModel):
    address: str
    coord: Optional[str] = None

class Order(BaseModel):
    order_id: int
    restaurant_id: int
    driver_id: Optional[int]
    address: str
    coord: Optional[str]
    delivery_fee: float
    food_fee: float
    order_status: str

class OrderDetail(Order):
    items: List[dict]

class PaymentMethod(BaseModel):
    method_name: str
    details: Optional[str] = None

class Review(BaseModel):
    rating: int
    review_text: Optional[str] = None

# ------------------------------
# Mô hình Restaurant (Nhà hàng)
# ------------------------------
class RestaurantStatusEnum(str, Enum):
    active = "active"  # Nhà hàng hoạt động
    inactive = "inactive"  # Nhà hàng không hoạt động
    # closed = "closed"  # Nhà hàng đã đóng cửa

class RestaurantBase(BaseModel):
    name: str  # Tên nhà hàng
    category: CategoryEnum  # Loại nhà hàng
    phone: Optional[str] = None  # Số điện thoại, có thể rỗng
    address: str  # Địa chỉ nhà hàng
    x: Decimal
    y: Decimal
    status: Optional[RestaurantStatusEnum] = RestaurantStatusEnum.inactive  # Trạng thái nhà hàng

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class RestaurantCreate(RestaurantBase):
    pass  # Khi tạo mới nhà hàng

class RestaurantUpdate(BaseModel):
    # Các thuộc tính có thể thay đổi khi cập nhật nhà hàng
    name: Optional[str] = None
    category: Optional[CategoryEnum] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    x: Optional[Decimal] = None
    y: Optional[Decimal] = None
    
class RestaurantSchema(RestaurantBase):
    restaurant_id: int  # ID nhà hàng


    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models


# ------------------------------
# Mô hình Thời gian hoạt động của nhà hàng
# ------------------------------
class RestaurantTimeBase(BaseModel):
    day: DayEnum  # Ngày trong tuần
    open_time: time  # Giờ mở cửa
    close_time: time  # Giờ đóng cửa

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class RestaurantTimeCreate(RestaurantTimeBase):
    pass  # Tạo mới thời gian hoạt động

class RestaurantTimeUpdate(RestaurantTimeBase):
    pass  # Cập nhật thời gian hoạt động

class RestaurantTimeResponse(RestaurantTimeBase):
    restaurant_id: int  # ID nhà hàng


# ------------------------------
# Mô hình Menu Item (Món ăn trong menu)
# ------------------------------


class MenuItemBase(BaseModel):
    name: str  # Tên món ăn
    img_url: Optional[str] = None  # URL ảnh món ăn, có thể rỗng
    description: Optional[str] = None  # Mô tả món ăn, có thể rỗng
    price: Decimal  # Giá món ăn
    status: Optional[ItemStatusEnum] = ItemStatusEnum.unavailable  # Trạng thái món ăn (có sẵn hay không)
    is_deleted: Optional[bool] = False  # Trạng thái xóa món ăn, mặc định là False

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class MenuItemCreate(MenuItemBase):
    pass
class MenuItemUpdate(BaseModel):
    name: Optional[str] # Tên món ăn
    img_url: Optional[str]   # URL ảnh món ăn, có thể rỗng
    description: Optional[str]  # Mô tả món ăn, có thể rỗng
    price: Optional[Decimal]  # Giá món ăn

class MenuItemShchema(MenuItemBase):
    item_id: int  # ID món ăn


# ------------------------------
# Mô hình Driver (Tài xế giao hàng)
# ------------------------------

class DriverBase(BaseModel):
    name: str  # Tên tài xế
    status: DriverStatusEnum = DriverStatusEnum.inactive  # Trạng thái tài xế, mặc định là không hoạt động

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class DriverCreate(DriverBase):
    pass  # Tạo mới tài xế

class DriverUpdate(DriverBase):
    pass

class DriverSchema(DriverBase):
    driver_id: int  # ID tài xế
    is_deleted: bool = False  # Trạng thái xóa tài xế

class DriverResponse(BaseModel):
    driver_id: int
    message: str
# ------------------------------
# Mô hình Admin (Quản trị viên)
# ------------------------------

class AdminBase(BaseModel):
    name: str  # Tên quản trị viên

    class Config:
        from_attributes  = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class AdminCreate(AdminBase):
    pass  # Tạo mới quản trị viên

class AdminSchema(AdminBase):
    admin_id: int  # ID quản trị viên


# ------------------------------
# Mô hình Customer (Khách hàng)
# ------------------------------

class CustomerBase(BaseModel):
    name: str  # Tên khách hàng
    is_deleted: bool = False  # Trạng thái xóa khách hàng

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class CustomerCreate(CustomerBase):
    pass  # Tạo mới khách hàng

class CustomerSchema(CustomerBase):
    customer_id: int  # ID khách hàng


# ------------------------------
# Mô hình Order (Đơn hàng)
# ------------------------------\

class OrderBase(BaseModel):
    customer_id: int  # ID khách hàng
    restaurant_id: int  # ID nhà hàng
    driver_id: Optional[int] = None  # ID tài xế, có thể rỗng
    address: Optional[str] = None  # Địa chỉ giao hàng, có thể rỗng
    x: Optional[float] = None  # Tọa độ giao hàng
    y: Optional[float] = None
    distance: Optional[float] = None  # Phí giao hàng
    food_fee: Optional[float] = None  # Phí món ăn
    order_status: OrderStatusEnum = OrderStatusEnum.cart  # Trạng thái đơn hàng
    note: Optional[str] = None  # Ghi chú

class OrderCreate(OrderBase):
    pass  # Tạo đơn hàng mới

class OrderSchema(OrderBase):
    order_id: int  # ID đơn hàng
    created_at: datetime  # Thời gian tạo đơn hàng
    delivered_at: Optional[datetime] = None  # Thời gian giao đơn hàng

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class OrderUpdate(BaseModel):
    order_status: OrderStatusEnum  # Cập nhật trạng thái đơn hàng
    
# ------------------------------
# Mô hình Order Item (Món trong đơn hàng)
# ------------------------------

class OrderItemBase(BaseModel):
    item_id: int  # ID món ăn
    price: float  # Giá món ăn
    quantity: int = 1  # Số lượng món ăn, mặc định là 1

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class OrderItemCreate(OrderItemBase):
    pass  # Tạo món ăn trong đơn hàng

class OrderItemSchema(OrderItemBase):
    order_id: int  # ID đơn hàng


# ------------------------------
# Mô hình Manager (Quản lý nhà hàng)
# ------------------------------

class ManagerBase(BaseModel):
    username: str  # Tên người dùng của quản lý
    name: str  # Tên quản lý
    restaurant_id: int  # ID nhà hàng quản lý

    class Config:
        from_attributes = True  # Chuyển đổi từ SQLAlchemy models sang Pydantic models

class ManagerCreate(ManagerBase):
    password: str  # Mật khẩu khi tạo quản lý mới

class ManagerSchema(ManagerBase):
    manager_id: int  # ID quản lý


class RegisterInput(BaseModel):
    user: UserCreate
    customer: CustomerCreate

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enum cho trạng thái tài xế
class DriverStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"


# Schema cho tài xế
class DriverCreate(BaseModel):
    name: str
    password: str


class DriverLogin(BaseModel):
    name: str
    password: str


class DriverOut(BaseModel):
    driver_id: int
    name: str
    status: DriverStatusEnum

    class Config:
        from_attributes = True


class DriverStatusUpdate(BaseModel):
    driver_id: int
    status: DriverStatusEnum


# Schema cho đơn hàng
class OrderAssign(BaseModel):
    order_id: int
    driver_id: int


class OrderStatusEnum(str, Enum):
    cart = "cart"
    pending = "pending"
    preparing = "preparing"
    delivering = "delivering"
    delivered = "delivered"
    completed = "completed"
    cancelled = "cancelled"


class OrderStatusUpdate(BaseModel):
    order_id: int
    status: OrderStatusEnum


# Schema cho đánh giá tài xế
class DriverReviewCreate(BaseModel):
    driver_id: int
    customer_id: int
    rating: float = Field(..., ge=1.0, le=5.0, example=4.5)
    comment: Optional[str] = Field(None, example="Great service!")
