import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OrderList from "../../../components/OrderList/OrderList";

import "./AdminOrders.css";

const AdminOrders = () => {
  const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
  const [isActive, setIsActive] = useState(false);  // State điều khiển trạng thái active của nút
  const [orders, setOrders] = useState([]);         // Danh sách đơn hàng
  const [ordersHistory, setOrdersHistory] = useState([]); // Danh sách lịch sử đơn hàng
  const [error, setError] = useState(null);         // Lỗi nếu có
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

  const popupRef = useRef(); // Ref cho popup

  const handlePopupToggle = () => {
    setShowPopup(!showPopup); // Chuyển trạng thái popup
    setIsActive(!isActive);  // Toggle trạng thái active của nút
  };

  // Tắt popup khi nhấp ra ngoài
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Fetch dữ liệu đơn hàng và lịch sử đơn hàng
  useEffect(() => {
    axios
      .get("http://localhost:8000/restaurants/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Token trong header
        },
      })
      .then((response) => setOrders(response.data))
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy danh sách đơn hàng:", error);
        setError("Không thể tải danh sách đơn hàng");
      });

    axios
      .get("http://localhost:8000/restaurants/order-history", {
        headers: {
          Authorization: `Bearer ${token}`, // Token trong header
        },
      })
      .then((response) => setOrdersHistory(response.data))
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy lịch sử đơn hàng:", error);
        setError("Không thể tải lịch sử đơn hàng");
      });
  }, []);

  return (
    <div className="admin-orders">
      <Header />
      <Sidebar />
      <main>
        <h2>Đơn hàng</h2>
        <button
          className={`history-btn ${isActive ? "active" : ""}`}
          onClick={handlePopupToggle}
        >
          Lịch sử đơn hàng
        </button>

        {showPopup && (
          <div className="popup">
            <div className="popup-content" ref={popupRef}>
              <h3>Lịch sử đơn hàng</h3>
              <OrderList orders={ordersHistory} basePath="/admin-order-details" />
            </div>
          </div>
        )}

        <OrderList orders={orders} basePath="/admin-order-details" />
      </main>
    </div>
  );
};

export default AdminOrders;
