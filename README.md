# YUMMYGO
A Food Delivery App

### Hướng dẫn cài đặt Backend cho YummyGo

YummyGo là một ứng dụng giao đồ ăn cho phép khách hàng đặt món từ các nhà hàng gần đó và được giao tận nơi. Phần backend này được xây dựng bằng **FastAPI** và **SQLAlchemy**.

---

## Cấu trúc thư mục

```plaintext
backend/
├── config/
│   ├── .env                    # Chứa các biến môi trường như kết nối cơ sở dữ liệu, secret key
│   ├── logging_config.py       # Cấu hình logging (theo dõi lỗi, sự kiện)
│   └── settings.py             # Cấu hình ứng dụng
├── controllers/                # Xử lý logic chính
├── db/
│   └── database.py             # Kết nối cơ sở dữ liệu
├── middlewares/                # Middleware xử lý request/response
├── models/
│   ├── schemas.py              # Định nghĩa các schema (Pydantic)
│   └── models.py               # ORM định nghĩa bảng database (SQLAlchemy)
├── routes/                     # Định nghĩa các API endpoint
│   └── (các tệp chứa route như customer_routes.py, order_routes.py, ...)
├── services/                   # Dịch vụ logic tái sử dụng
├── utils/                      # Các hàm tiện ích
├── main.py                     # Điểm khởi chạy ứng dụng FastAPI
├── requirements.txt            # Danh sách thư viện cần thiết
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## Yêu cầu hệ thống

- **Python** 3.12+
- **PostgreSQL** (hoặc cơ sở dữ liệu hỗ trợ SQLAlchemy)
- **FastAPI**
- **SQLAlchemy**
- **Uvicorn** (để chạy server)

---

## Các bước cài đặt

### 1. Clone repo

```bash
git clone https://github.com/spicyginger2012/yummygo.git
cd backend
```

### 2. Tạo và kích hoạt môi trường ảo

```bash
# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo
source venv/bin/activate   # Trên Linux/MacOS
venv\Scripts\activate      # Trên Windows
```

### 3. Cài đặt các phụ thuộc

```bash
pip install -r requirements.txt
```

### 4. Cấu hình cơ sở dữ liệu

Tạo tệp `.env` trong thư mục `config/` và thiết lập các biến môi trường:

```plaintext
DATABASE_URL=postgresql://username:password@localhost/dbname
SECRET_KEY=your_secret_key
DEBUG=True
```

Hoặc sửa trực tiếp trong `db/database.py`:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost/dbname"
```

### 5. Khởi tạo cơ sở dữ liệu

Nếu chưa có database, bạn cần tạo nó trước khi tiếp tục sử dụng PostgreSQL:

```bash
psql ...
```

### 6. Chạy ứng dụng

Khởi chạy server với Uvicorn:

```bash
$env:PYTHONPATH = "...\yummygo\backend"  # Trên Windows để thiết lập PYTHONPATH
uvicorn main:app --reload
```

Truy cập ứng dụng tại [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

### **Danh sách các API Endpoint**

---

### **Users**
- **GET** `/users/me` - Lấy thông tin người dùng hiện tại.  
- **PUT** `/users/update` - Cập nhật thông tin người dùng.

---

### **Orders**
- **POST** `/orders/add-item` - Thêm món ăn vào giỏ hàng.  
- **POST** `/orders/subtract-item` - Giảm số lượng món trong giỏ hàng.  
- **GET** `/orders/cart` - Lấy thông tin giỏ hàng hiện tại.  
- **GET** `/orders/{order_id}` - Lấy thông tin chi tiết đơn hàng theo ID.  
- **GET** `/orders/current-cart/{restaurant_id}` - Lấy giỏ hàng hiện tại cho nhà hàng.  
- **PUT** `/orders/update/{order_id}` - Cập nhật thông tin đơn hàng.  
- **PUT** `/orders/cancel/{order_id}` - Hủy đơn hàng.  
- **PUT** `/orders/change-status/{order_id}` - Cập nhật trạng thái đơn hàng.  
- **GET** `/orders/food-fee/{order_id}` - Lấy phí món ăn trong đơn hàng.

---

### **Customers**
- **GET** `/customers/me` - Lấy thông tin khách hàng hiện tại.  
- **PUT** `/customers/update` - Cập nhật thông tin khách hàng hiện tại.  
- **DELETE** `/customers/delete` - Xóa khách hàng hiện tại.  
- **PUT** `/customers/send-order/{order_id}` - Tạo đơn hàng mới.  
- **GET** `/customers/search` - Tìm kiếm khách hàng.  
- **GET** `/customers/filter` - Lọc danh sách khách hàng.  
- **GET** `/customers/restaurants` - Lấy danh sách nhà hàng gần khách hàng.

---

### **Drivers**
- **GET** `/drivers/me` - Lấy thông tin tài xế hiện tại.  
- **PUT** `/drivers/update` - Cập nhật thông tin tài xế.  
- **PUT** `/drivers/change-status` - Cập nhật trạng thái tài xế.  
- **DELETE** `/drivers/delete` - Xóa tài xế.  
- **GET** `/drivers/info/{driver_id}` - Lấy thông tin tài xế theo ID.  
- **GET** `/drivers/order` - Lấy đơn hàng hiện tại của tài xế.  
- **GET** `/drivers/all-orders` - Lấy danh sách tất cả đơn hàng của tài xế.

---

### **Managers**
- **POST** `/managers/` - Tạo mới quản lý.  
- **GET** `/managers/{manager_id}` - Lấy thông tin quản lý theo ID.  
- **PUT** `/managers/{manager_id}` - Cập nhật thông tin quản lý.  
- **DELETE** `/managers/{manager_id}` - Xóa quản lý.

---

### **Restaurants**
- **GET** `/restaurants/me` - Lấy thông tin nhà hàng hiện tại.  
- **PUT** `/restaurants/update` - Cập nhật thông tin nhà hàng.  
- **DELETE** `/restaurants/delete` - Xóa nhà hàng.  
- **PUT** `/restaurants/change-status` - Thay đổi trạng thái nhà hàng.  
- **GET** `/restaurants/orders` - Lấy danh sách đơn hàng của nhà hàng.  
- **GET** `/restaurants/active` - Lấy danh sách các nhà hàng đang hoạt động.  
- **GET** `/restaurants/{restaurant_id}` - Lấy thông tin nhà hàng theo ID.

---

### **Menu Items**
- **POST** `/items/create` - Thêm món ăn mới vào menu.  
- **GET** `/items/all` - Lấy danh sách tất cả món ăn.  
- **GET** `/items/available/{restaurant_id}` - Lấy danh sách món ăn khả dụng theo nhà hàng.  
- **GET** `/items/{item_id}` - Lấy thông tin chi tiết một món ăn.  
- **PUT** `/items/update/{item_id}` - Cập nhật thông tin món ăn.  
- **PUT** `/items/change-status/{item_id}` - Thay đổi trạng thái món ăn (hoạt động/ngừng hoạt động).  
- **DELETE** `/items/delete/{item_id}` - Xóa món ăn khỏi menu.  
- **GET** `/items/menu/{restaurant_id}` - Lấy menu của nhà hàng theo ID.

---

### **Authentication**
- **POST** `/token` - Đăng nhập, lấy token.  
- **POST** `/logout` - Đăng xuất.  
- **GET** `/` - Trang gốc (root).

---

### **Address**
- **GET** `/address/search` - Tìm kiếm địa chỉ.  
- **PUT** `/address/restaurant-set` - Thiết lập địa chỉ nhà hàng.  
- **PUT** `/address/order-set` - Thiết lập địa chỉ cho đơn hàng.

---

### **Đăng ký**
- **POST** `/register/customer` - Đăng ký khách hàng mới.  
- **POST** `/register/add-customer` - Thêm vai trò khách hàng.  
- **POST** `/register/driver` - Đăng ký tài xế mới.  
- **POST** `/register/add-driver` - Thêm vai trò tài xế.  
- **POST** `/register/restaurant` - Đăng ký nhà hàng mới.  
- **POST** `/register/add-restaurant` - Thêm vai trò nhà hàng.  

---

### **Schemas**
Hệ thống sử dụng các schema được định nghĩa để chuẩn hóa dữ liệu đầu vào/đầu ra:
- **User Schemas:** `UserCreate`, `UserLogin`, `UserUpdate`, `UserResponse`  
- **Order Schemas:** `OrderItemResponse`, `OrderUpdate`  
- **Customer Schemas:** `CustomerCreate`, `CustomerResponse`  
- **Driver Schemas:** `DriverCreate`, `DriverResponse`  
- **Restaurant Schemas:** `RestaurantCreate`, `RestaurantUpdate`, `RestaurantResponse`  
- **Menu Schemas:** `MenuItemCreate`, `MenuItemUpdate`, `MenuItemResponse`  
- **Address Schemas:** `ObjectUpdateAddress`, `AddressSuggestion`  

---

### **Ghi chú**
Hệ thống API tuân theo chuẩn **OpenAPI 3.1**, bạn có thể xem tài liệu đầy đủ thông qua:  
- **[OpenAPI JSON](http://127.0.0.1:8000/openapi.json)**  
- **Giao diện Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)


## Tài liệu liên quan
- **FastAPI:** [Tài liệu chính thức](https://fastapi.tiangolo.com/)  
- **SQLAlchemy:** [Tài liệu chính thức](https://www.sqlalchemy.org/)  


### **Hướng Dẫn Cài Đặt Frontend YummyGo**


### **1. Yêu cầu hệ thống**
Đảm bảo rằng máy tính của bạn đã cài đặt các công cụ sau:
- **Node.js**: Phiên bản 16+ (Kiểm tra bằng `node -v`).
- **npm**: Phiên bản 7+ (Kiểm tra bằng `npm -v`).
- **Git**: Để clone repo từ GitHub.

---

### **2. Clone repo**
Đến thuư mục frontendfrontend:
```bash
cd frontend
```

---

### **3. Cài đặt các phụ thuộc**
Sử dụng npm để cài đặt các thư viện và phụ thuộc:
```bash
npm install
```

---

### **4. Cấu hình dự án**
Dự án yêu cầu file `.env` để cấu hình. Tạo file `.env` trong thư mục gốc và thêm các thông số cần thiết, ví dụ:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

---

### **5. Chạy ứng dụng**
Để chạy ứng dụng trong chế độ phát triển, sử dụng lệnh:
```bash
npm start
```

Ứng dụng sẽ được chạy tại địa chỉ:
```
http://localhost:3000
```

---

### **6. Build ứng dụng**
Để tạo bản build tối ưu cho môi trường production:
```bash
npm run build
```

Bản build sẽ được lưu trong thư mục `build/`. Bạn có thể triển khai bản build này trên các server như:
- **Nginx**
- **Apache**
- **Vercel**
- **Netlify**

---

### **7. Cách xử lý một số lỗi phổ biến**

#### **Lỗi "react-scripts" không được tìm thấy**
Chạy lệnh sau để cài đặt lại:
```bash
npm install react-scripts --save
```

#### **Lỗi phiên bản Node.js không đúng**
Cập nhật Node.js lên phiên bản mới nhất từ [Node.js official site](https://nodejs.org/).

#### **Lỗi module không tìm thấy**
Xóa thư mục `node_modules` và file `package-lock.json`, sau đó cài đặt lại:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### **8. Tài liệu liên quan**
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)

---

### **Liên hệ hỗ trợ**
Nếu gặp vấn đề hoặc cần hỗ trợ, bạn có thể liên hệ với đội ngũ phát triển qua email: **support@yummygo.com**.