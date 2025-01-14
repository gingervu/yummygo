from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from services import order_service
from models.models import *
from models.schemas import *
from db.database import get_db
from middlewares.auth_middleware import require_role
from services.order_service import *

router = APIRouter(prefix="/orders", tags=["Orders"])


# Thêm món vào đơn, áp dụng cho cả nút thêm món và nút tăng số lượng, trả về order_id
@router.post("/add-item")
async def add_to_cart(item_id: int, restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.add_item(item_id, restaurant_id, current_customer['user_id'], db)

# Giảm số lượng món
@router.post("/subtract-item")
async def subtract_on_cart(item_id: int, order_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.subtract_item(item_id, order_id, current_customer['user_id'], db)

# Lấy danh sách đơn hàng trong giỏ của user
# ---> trả về danh sách gồm order_id và restaurant_id, có thể dùng order_id để 
# xem thông tin chi tiết của order, dùng api /restaurant/get/{restaurant_id}
# để lấy thông tin nhà hàng
@router.get("/cart")
async def get_cart(current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_orders_in_cart(current_customer['user_id'], db)


# Lấy đơn hàng theo ID
# -> trả về danh sách order_items
# ta vẫn có order_id để tiếp tục thực hiện 
@router.get("/{order_id}")
async def get_order(order_id: int, db: Session = Depends(get_db)):
    return order_service.get_order(order_id, db)

# Lấy ra danh sách các order_item có trong giỏ hàng ở nhà hàng hiện tại
# Nếu không có thì giỏ hàng đang trống
@router.get("/current-cart/{restaurant_id}")
async def current_cart(restaurant_id: int, current_customer: dict = Depends(require_role('customer')), db: Session = Depends(get_db)):
    return order_service.get_current_cart(restaurant_id, current_customer['user_id'], db)

# Cập nhật trạng thái đơn hàng cho tài xế
# Đầu vào order_update được xác định cụ thể trong từng
# trường hợp button tài xế bấm. Ví dụ: "Nhận đơn" => "preparing"
# "Đã lấy đơn" => "delivering"
# "Đã đến điểm giao" => "delivered"
# "Giao hàng thành công" => "completed"
@router.put("/{order_id}")
async def update_order(order_id: int, order_update: OrderUpdate, 
                       current_driver: dict = Depends(require_role('driver')), 
                       db: Session = Depends(get_db)):
    return order_service.update_order(order_id, order_update, db)


# API tạo đơn hàng mới
@router.post("/order")
async def create_order(order: Order, db: Session = Depends(get_db)):
    # Lưu đơn hàng vào cơ sở dữ liệu
    process_new_order(order, db)
    return {"message": "Đơn hàng đã được tạo thành công"}

# Tạo WebSocket để gửi đơn cho tài xế, nhà hàng 
# và cập nhật trạng thái đơn hàng

# # Kết nối WebSocket cho tài xế
# @router.websocket("/ws/driver/{driver_id}")
# async def websocket_driver(websocket: WebSocket, driver_id: int):
#     # Chấp nhận kết nối WebSocket
#     await websocket.accept()
#     # Lưu kết nối vào ConnectionManager
#     manager.connect(websocket, "drivers", driver_id)
    
#     try:
#         while True:
#             # Nhận tin nhắn từ tài xế (có thể bỏ qua nếu không cần)
#             data = await websocket.receive_text()
#             print(f"Received from driver {driver_id}: {data}")
#     except WebSocketDisconnect:
#         # Xóa kết nối khi tài xế ngắt kết nối
#         manager.disconnect("drivers", driver_id)


# # # API /find-driver 
# @router.get("/find-driver/{order_id}", response_model=None)
# async def find_driver(order_id: int, db: Session = Depends(get_db)) :
#     # Lấy order từ database và tìm restaurant_id
#     order = db.query(Order).filter(Order.order_id == order_id).first()
#     if not order:
#         raise HTTPException(status_code=404, detail="Order not found")
    
#     # Lấy danh sách các tài xế đang active
#     drivers = db.query(Driver).filter(Driver.status == DriverStatusEnum.active).all()

#     if not drivers:
#         raise HTTPException(status_code=404, detail="No active drivers found")
    
#     # Chọn ngẫu nhiên một tài xế trong số các tài xế đang active
#     selected_driver = random.choice(drivers)

#     # Lấy thông tin đơn hàng gợi ý
#     order_info = {
#         "order_id": order_id
#     }

#     # Gửi thông tin đơn hàng tới tài xế qua WebSocket
#     if selected_driver.driver_id in manager.drivers:
#         # Lấy kết nối WebSocket của tài xế
#         websocket = manager.drivers[selected_driver.driver_id]
#         try:
#             # Gửi thông tin đơn hàng tới tài xế
#             await websocket.send_json(order_info)
#             # Trả về thông báo cho người dùng
#             return { "driver_id": selected_driver.driver_id, "message": "Order suggestion sent to driver"}
#         except WebSocketDisconnect:
#             # Xóa kết nối khi tài xế ngắt kết nối
#             raise HTTPException(status_code=500, detail="Driver disconnected before receiving the order")


# @router.websocket("/ws/restaurant/{restaurant_id}")
# async def websocket_restaurant(websocket: WebSocket, restaurant_id: int, current_user: dict = Depends(require_role('restaurant'))):
#     # Xác thực và chấp nhận kết nối WebSocket
#     await websocket.accept()
#     # Lưu kết nối vào ConnectionManager
#     manager.connect(websocket, "restaurants", restaurant_id)
    
#     try:
#         while True:
#             # Nhận tin nhắn từ nhà hàng (có thể bỏ qua nếu không cần)
#             data = await websocket.receive_text()
#             print(f"Received from restaurant {restaurant_id}: {data}")
#     except WebSocketDisconnect:
#         # Xóa kết nối khi nhà hàng ngắt kết nối
#         manager.disconnect("restaurants", restaurant_id)

        
# # Kết nối WebSocket cho khách hàng
# @router.websocket("/ws/customer/{customer_id}")
# async def websocket_customer(websocket: WebSocket, customer_id: int):
#     # Chấp nhận kết nối WebSocket
#     await websocket.accept()
#     # Lưu kết nối vào ConnectionManager
#     manager.connect(websocket, "customers", customer_id)
    
#     try:
#         while True:
#             # Nhận tin nhắn từ khách hàng (có thể bỏ qua nếu không cần)
#             data = await websocket.receive_text()
#             print(f"Received from customer {customer_id}: {data}")
#     except WebSocketDisconnect:
#         # Xóa kết nối khi khách hàng ngắt kết nối
#         manager.disconnect("customers", customer_id)
        
# # API /send-message
# @router.post("/send-message")
# async def send_message(message: Message, db: Session = Depends(get_db)):
#     # Lấy thông tin người gửi và người nhận
#     sender = db.query(User).filter(User.user_id == message.sender_id).first()
#     receiver = db.query(User).filter(User.user_id == message.receiver_id).first()
    
#     if not sender or not receiver:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # Gửi tin nhắn tới người nhận qua WebSocket
#     if receiver.user_id in manager.connections:
#         # Lấy kết nối WebSocket của người nhận
#         websocket = manager.connections[receiver.user_id]
#         try:
#             # Gửi tin nhắn tới người nhận
#             await websocket.send_json(message.dict())
#             # Trả về thông báo cho người gửi
#             return { "message": "Message sent successfully"}
#         except WebSocketDisconnect:
#             # Xóa kết nối khi người nhận ngắt kết nối
#             raise HTTPException(status_code=500, detail="Receiver disconnected before receiving the message")
#     else:
#         raise HTTPException(status_code=404, detail="Receiver not connected")