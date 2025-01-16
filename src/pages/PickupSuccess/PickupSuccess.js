import React from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./PickupSuccess.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const PickupSuccess = () => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleButtonClick = () => {
    navigate("/delivertocustomer"); // Điều hướng đến trang /
  };

  return (
    <div className="pickup-sucess">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main >
        <h2>Bạn đã lấy đơn! Giao đến cho khách hàng thôi!</h2>

        <div className="delivery-box">
          <div className="delivery-to">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 23 22" fill="none">
                  <path d="M10.3181 20.8757C1.61539 12.1105 0 11.211 0 7.9896C0 3.57705 5.14871 0 11.5 0C17.8513 0 23 3.57705 23 7.9896C23 11.211 21.3846 12.1105 12.6819 20.8757C12.1108 21.4489 10.8892 21.4489 10.3181 20.8757ZM11.5 11.3186C14.1464 11.3186 16.2917 9.82817 16.2917 7.9896C16.2917 6.15104 14.1464 4.6606 11.5 4.6606C8.85362 4.6606 6.70833 6.15104 6.70833 7.9896C6.70833 9.82817 8.85362 11.3186 11.5 11.3186Z" fill="#E97522" />
                </svg>
              </span>
              Giao đến: <strong>334 Nguyễn Trãi, Thanh Xuân Trung, Thanh Xuân, Hà Nội</strong>
            </p>
          </div>

          {/* Bản đồ */}
          <div className="map-container"></div>
        </div>

        <div className="action-btn-container">
          <button className="action-btn sucess-btn" onClick={handleButtonClick}>Đã đến nơi</button>
        </div>

      </main>
    </div>
  );
};

export default PickupSuccess;
