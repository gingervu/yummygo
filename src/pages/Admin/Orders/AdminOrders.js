import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

import OrderList from "../../../components/OrderList/OrderList";
import "./AdminOrders.css";


const AdminOrders = () => {

  const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
  const [isActive, setIsActive] = useState(false);  // State điều khiển trạng thái active của nút

  const handlePopupToggle = () => {
    setShowPopup(!showPopup); // Chuyển trạng thái popup (hiển thị/ẩn)
    setIsActive(!isActive); // Toggle trạng thái active của nút
  };

  // const orders = [
  //   { id: "GF-123", total: "100.000" },
  //   { id: "GF-124", total: "150.000" },
  //   { id: "GF-125", total: "75.000" },
  //   { id: "GF-126", total: "200.000" },
  //   { id: "GF-127", total: "50.000" },
  //   { id: "GF-128", total: "180.000" }
  // ];
  const [orders, setOrders] = useState([]); // State để lưu danh sách đơn hàng
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

  useEffect(() => {
    // Gọi API để lấy danh sách đơn hàng
    axios
      .get("http://localhost:8000/restaurants/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      })
      .then((response) => {
        console.log("Dữ liệu đơn hàng trả về:", response.data);
        setOrders(response.data); // Cập nhật state với dữ liệu từ API
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy danh sách đơn hàng:", error);
        setError("Không thể tải danh sách đơn hàng");
      })
      .finally(() => {
        setLoading(false); // Tắt trạng thái loading
      });
  }, []);

  if (loading) return <div>Đang tải danh sách đơn hàng...</div>;

  if (error) return <div>{error}</div>;

  return (

    <div className="admin-orders">
      <Header />
      <Sidebar />
      <main>
        <h2>Đơn hàng</h2>
        <button className={`history-btn ${isActive ? 'active' : ''}`} 
          onClick={handlePopupToggle}>
          Lịch sử đơn hàng
        </button>
        {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Lịch sử đơn hàng</h3>
            <OrderList orders={orders} basePath="/admin-order-details"/> {/* Hiển thị OrderList trong popup */}
            
          </div>
        </div>
      )}
        <OrderList orders={orders} basePath="/admin-order-details" />
      </main>
    </div>
  );
};

export default AdminOrders;