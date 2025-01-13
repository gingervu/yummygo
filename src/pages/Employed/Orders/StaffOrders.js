import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import StaffSidebar from "../../../components/StaffSidebar/StaffSidebar";

import OrderList from "../../../components/OrderList/OrderList";
import "./StaffOrders.css";


const StaffOrders = () => {

  const [showPopup, setShowPopup] = useState(false); // State điều khiển popup
  const [isActive, setIsActive] = useState(false);  // State điều khiển trạng thái active của nút

  const handlePopupToggle = () => {
    setShowPopup(!showPopup); // Chuyển trạng thái popup (hiển thị/ẩn)
    setIsActive(!isActive); // Toggle trạng thái active của nút
  };

  const orders = [
    { id: "GF-123", total: "100.000" },
    { id: "GF-124", total: "150.000" },
    { id: "GF-125", total: "75.000" },
    { id: "GF-126", total: "200.000" },
    { id: "GF-127", total: "50.000" },
    { id: "GF-128", total: "180.000" }
  ];


  return (

    <div className="staff-orders">
      <Header />
      <StaffSidebar />
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
            <OrderList orders={orders} basePath="/staff-order-details"/> {/* Hiển thị OrderList trong popup */}
            
          </div>
        </div>
      )}
        <OrderList orders={orders.slice(0, 3)} />
      </main>
    </div>
  );
};

export default StaffOrders;