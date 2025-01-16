import React from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./DeliverySuccess.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const DeliverySuccess = () => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleButtonClick = () => {
    navigate("/home"); // Điều hướng đến trang /
  };

  return (
    <div className="delivery-success">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <h2>Bạn đã giao hàng thành công!</h2>
        <div className="container">
        <span><strong>+24.000 đ</strong></span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrSLox2ia0u9peaoS7Sy19T60CQ4tO8JT46Q&s"
          alt="Check icon"
          style={{ width: '25px', height: '25px', marginLeft: '8px' }} // Điều chỉnh kích thước và khoảng cách
        />
        </div>
        
        <div className="action-btn-container">
          <button className="action-btn" onClick={handleButtonClick}>Hoàn thành
          </button>
        </div>
      </main>
    </div>
  );
};

export default DeliverySuccess;
