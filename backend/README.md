# YummyGo Backend

YummyGo là một ứng dụng giao đồ ăn cho phép khách hàng đặt món từ các nhà hàng gần đó và được giao tận nơi. Phần backend này được xây dựng bằng FastAPI và SQLAlchemy.

## Cấu trúc thư mục

```
backend/
├── config/ # Chứa các cấu hình cơ bản cho dự án.
│   ├── .env #File này chứa các biến môi trường như kết nối cơ sở dữ liệu, secret key
│   ├── logging_config.py #Cấu hình logging cho dự án
│   └── settings.py # Cấu hình cài đặt của ứng dụng
├── controllers/ # Xử lý logic chính cho các module
│   ├── admin_controller.py
│   ├── customer_controller.py
│   ├── driver_controller.py
│   ├── menu_item_controller.py
│   ├── order_controller.py
│   └── restaurant_controller.py
├── db/
│   └── database_dump.sql
├── middlewares/ # Các lớp middleware (xử lý request/response)
│   └── auth_middleware.py
├── models/ # Định nghĩa các bảng trong database
│   └── models.py
├── routes/                # Định nghĩa các API endpoint
│   ├── admin_routes.py
│   ├── customer_routes.py
│   ├── driver_routes.py
│   ├── menu_item_routes.py
│   ├── order_routes.py
│   └── restaurant_routes.py
├── services/              # Dịch vụ logic tái sử dụng
│   ├── auth_service.py
│   ├── email_service.py
│   ├── geo_service.py
│   └── payment_service.py
├── utils/                 # Các hàm tiện ích
│   ├── database.py
│   ├── helpers.py
│   ├── validators.py
│   └── constants.py
├── main.py                # Điểm khởi chạy ứng dụng FastAPI
├── requirements.txt       # Danh sách các thư viện cần thiết
└── README.md              # Tài liệu hướng dẫn dự án
```

## Yêu cầu

- Python 3.12+
- PostgreSQL (hoặc cơ sở dữ liệu hỗ trợ SQLAlchemy)
- FastAPI
- SQLAlchemy
- Uvicorn (cho việc chạy server)

## Cài đặt

### Clone repo

Đầu tiên, bạn cần clone repo từ GitHub:

```bash
git clone ...
cd backend
```

### Tạo và kích hoạt môi trường ảo

Sau khi clone xong repo, bạn cần tạo một môi trường ảo cho dự án:

```bash
python -m venv venv
source venv/bin/activate   # Trên Linux/MacOS
venv\Scripts\activate      # Trên Windows
```

### Cài đặt các phụ thuộc từ `requirements.txt`

Cài đặt tất cả các thư viện cần thiết bằng cách sử dụng pip:

```bash
pip install -r requirements.txt
```

### Cấu hình cơ sở dữ liệu

Cấu hình kết nối cơ sở dữ liệu trong `app/utils/database.py` hoặc bạn có thể sử dụng các biến môi trường để cấu hình. Dưới đây là ví dụ về cách cấu hình kết nối tới PostgreSQL:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost/dbname"
```

### Chạy ứng dụng

Để chạy ứng dụng, sử dụng lệnh sau:

```bash
$env:PYTHONPATH = "...\yummygo\backend"  # Trên Windows để thiết lập PYTHONPATH
uvicorn main:app --reload
```

Ứng dụng sẽ chạy trên địa chỉ `http://127.0.0.1:8000`. Bạn có thể kiểm tra API của mình thông qua Postman hoặc bất kỳ công cụ nào hỗ trợ HTTP request.

## Các Endpoints API

### Khách hàng
- `POST /customers/`: Tạo khách hàng mới.
- `GET /customers/{id}/`: Lấy thông tin khách hàng theo ID.
  
### Nhà hàng
- `GET /restaurants/`: Lấy danh sách các nhà hàng.
- `POST /restaurants/`: Thêm nhà hàng mới.
- `GET /restaurants/{id}/`: Lấy thông tin nhà hàng theo ID.

### Đơn hàng
- `POST /orders/`: Tạo đơn hàng mới.
- `GET /orders/{id}/`: Lấy thông tin đơn hàng.

### Tài xế
- `GET /drivers/`: Lấy danh sách tài xế.
- `POST /drivers/`: Thêm tài xế mới.


