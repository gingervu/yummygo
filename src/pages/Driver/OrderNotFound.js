import React from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./OrderNotFound.css";

const OrderNotFound = () => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleOrderWaiting = () => {
    navigate("/orderwaiting"); // Điều hướng đến trang /orderwaiting
  };

  const handleHome = () => {
    navigate("/driver"); // Điều hướng đến trang /drive
  };

  return (
    <div className="order-not-found">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main>
        <p>Rất tiếc! Chúng tôi chưa tìm được đơn hàng phù hợp cho bạn. Bạn muốn tiếp tục chờ không?</p>
        
        <div className="action-btn-container">
          <button className="action-btn homepage-btn" onClick={handleHome}>
          Dừng lại
          </button>

          <button className="action-btn orderwaiting-btn" onClick={handleOrderWaiting}>Tiếp tục tìm đơn
          </button>

        </div>
      </main>
    </div>
  );
};

export default OrderNotFound;
