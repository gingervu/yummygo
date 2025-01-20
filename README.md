<<<<<<< HEAD
# YUMMYGO
A Food Delivery App

### Hướng dẫn cài đặt Backend cho YummyGo

Backend được xây dựng bằng **FastAPI** và **SQLAlchemy**.

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
- **Uvicorn** 

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
psql -U postgres -h localhost -f database.sql
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
- **GET** `/orders/current-cart/{restaurant_id}` - Lấy giỏ hàng ở nhà hàng hiện tại.  
- **PUT** `/orders/update/{order_id}` - Cập nhật thông tin đơn hàng.  
- **PUT** `/orders/cancel/{order_id}` - Hủy đơn hàng.  
- **PUT** `/orders/change-status/{order_id}` - Cập nhật trạng thái đơn hàng.  
- **GET** `/orders/food-fee/{order_id}` - Lấy phí món ăn trong đơn hàng.

---

### **Customers**
- **GET** `/customers/me` - Lấy thông tin khách hàng.  
- **PUT** `/customers/update` - Cập nhật thông tin khách hàng.  
- **DELETE** `/customers/delete` - Xóa khách hàng.  
- **PUT** `/customers/send-order/{order_id}` - Tạo đơn hàng mới.  
- **GET** `/customers/search` - Tìm kiếm nhà hàng.  
- **GET** `/customers/filter` - Tìm kiếm nhà hàng bằng bộ lọc.  
---

### **Drivers**
- **GET** `/drivers/me` - Lấy thông tin tài xế.  
- **PUT** `/drivers/update` - Cập nhật thông tin tài xế.  
- **PUT** `/drivers/change-status` - Chuyển trạng thái tài xế.  
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
- **GET** `/restaurants/me` - Lấy thông tin nhà hàng.  
- **PUT** `/restaurants/update` - Cập nhật thông tin nhà hàng.  
- **DELETE** `/restaurants/delete` - Xóa nhà hàng.  
- **PUT** `/restaurants/change-status` - Chuyển trạng thái nhà hàng.  
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
- **MenuItem Schemas:** `MenuItemCreate`, `MenuItemUpdate`, `MenuItemResponse`  
- **Address Schemas:** `ObjectUpdateAddress`, `AddressSuggestion`  

---


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

### **2. Cài đặt các phụ thuộc**
Sử dụng npm để cài đặt các thư viện và phụ thuộc:
```bash
npm install
```

---

### **3. Cấu hình dự án**
Dự án yêu cầu file `.env` để cấu hình. Tạo file `.env` trong thư mục gốc và thêm các thông số cần thiết, ví dụ:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

---

### **4. Chạy ứng dụng**
Để chạy ứng dụng trong chế độ phát triển, sử dụng lệnh:
```bash
npm start   
```
---


### **5. Tài liệu liên quan**
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)

---



**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> frontend/driver
