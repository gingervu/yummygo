import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./AllOrders.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const AllOrders = () => {
    const [orders, setOrders] = useState([]); // Danh sách đơn hàng
    const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng được chọn để hiển thị chi tiết
    const [error, setError] = useState(null);
    const token = localStorage.getItem("access_token"); // Token từ localStorage
  
    useEffect(() => {
      const fetchAllOrders = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/drivers/all-orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(response.data); // Lưu danh sách đơn hàng vào state
        } catch (err) {
          console.error(err);
          setError("Lỗi khi lấy danh sách đơn hàng");
        }
      };
  
      fetchAllOrders();
    }, [token]);
  
    const handleViewDetails = (order) => {
      setSelectedOrder(order); // Đặt đơn hàng được chọn
    };
  
    const closePopup = () => {
      setSelectedOrder(null); // Đóng popup
    };

  return (
    <div className="all-orders">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <h2>Lịch sử đơn hàng</h2>
        {error && <p className="error">{error}</p>}
        {!error && (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.order_id} className="order-item">
                <div className="order-info">
                  <p>
                    Mã đơn hàng: <strong>{order.order_id}</strong>
                  </p>
                  <p>
                  Phí vận chuyển: <strong>{(parseFloat(order.delivery_fee)*0.8).toLocaleString()} đ</strong> 
                  </p>
                  <p>
                  Ngày giao hàng: <strong>{new Date(order.delivered_at).toLocaleString("vi-VN")}</strong>
                    
                  </p>
                </div>
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(order)}
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Popup chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="order-details-popup">
          <div className="popup-content">
            <button className="close-popup" onClick={closePopup}>
              &times;
            </button>
            <h2>Chi tiết đơn hàng</h2>
            <p>
            Mã đơn hàng: <strong>{selectedOrder.order_id}</strong> 
            </p>
            <p>
            Địa chỉ giao hàng: <strong>{selectedOrder.address}</strong> 
            </p>
            <p>
            Phí vận chuyển: <strong>{selectedOrder.delivery_fee.toLocaleString()} đ</strong>{" "}
            </p>
            <p>
            Phí đồ ăn: <strong>{selectedOrder.food_fee.toLocaleString()} đ</strong> 
            </p>
            <p>
            Khoảng cách: <strong> {selectedOrder.distance} km</strong>
            </p>
            
            <p>
            Ngày tạo: <strong>{new Date(selectedOrder.created_at).toLocaleString("vi-VN")}</strong>{" "}
              
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
