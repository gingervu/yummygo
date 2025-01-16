import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

import "./DriverHome.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Toggle from "../../components/Toggle/Toggle";

const DriverHome = () => {
  const [driver, setDriver] = useState(""); // Khởi tạo state cho tên nhà hàng
  const [driverStatus, setDriverStatus] = useState(false); // Trạng thái hoạt động
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [order, setOrder] = useState(null); // Đơn hàng mới
  const [popupVisible, setPopupVisible] = useState(false); // Hiển thị popup
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");


  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin
    axios
      .get("http://127.0.0.1:8000/drivers/me",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          }
        },) // Đảm bảo gửi cookie nếu cần
      .then((response) => {
        console.log("Dữ liệu trả về từ API:", response.data);
        // Lưu vào state
        setDriver(response.data);
        setDriverStatus(response.data.status==="active")
        console.log(driverStatus)
      })

      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu :", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc quá trình loading
      });
  }, []);

  useEffect(() => {
    // Gọi API kiểm tra đơn hàng mới khi trạng thái hoạt động là "active"
    let intervalId;
    if (driverStatus) {
      intervalId = setInterval(() => {
        axios
          .get("http://127.0.0.1:8000/drivers/order", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("Dữ liệu đơn hàng:", response.data);
            if (response.data !== null) {
              setOrder(response.data); // Lưu đơn hàng mới
              setPopupVisible(true); // Hiển thị popup
              clearInterval(intervalId); // Dừng việc kiểm tra
            }
          })
          .catch((error) => {
            console.error("Có lỗi xảy ra khi kiểm tra đơn hàng:", error);
          });
      }, 5000); // Gọi API mỗi 5 giây
    }

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi component unmount
    };
  }, [driverStatus]);

  // Hàm xử lý khi nhấn nút "Xem chi tiết đơn hàng"
  const handleOrderDetails = () => {
    setPopupVisible(false);
    navigate("/orderdetails", { state: { order } }); // Điều hướng tới trang chi tiết đơn hàng
  };

  // Hàm để xử lý khi toggle thay đổi trạng thái
  const handleStatusChange = async () => {
    
    setDriverStatus(!driverStatus)
    // Gửi yêu cầu cập nhật trạng thái vào API
    console.log(driverStatus)
    console.log(token)
    axios
      .put(
        "http://127.0.0.1:8000/drivers/change-status", 
        {  },      
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          }
        },)
      .then((response) => {
        console.log("Cập nhật trạng thái thành công:", response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
      });
  };


  return (
    <div className="driver-home">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <div className="driver-status">
          <div className="text">
            <h1>Chào {driver.name}!</h1>
            <h2>Bạn đã sẵn sàng cho những chuyến hàng hôm nay chưa?</h2>
            <p>Hãy bật trạng thái để nhận đơn!</p>
          </div>
          <div className="toggle">
            <Toggle checked={driverStatus} // Trạng thái hiện tại của toggle
              onChange={handleStatusChange} // Hàm xử lý thay đổi trạng thái
            />
          </div>
        </div>
        <div className="action-btn-container">
        </div>
      </main>
      {/* Popup hiển thị đơn hàng mới */}
{/* Popup hiển thị đơn hàng mới */}
{popupVisible && order && (
          <div className="popup">
            <div className="popup-content">
              <h2>Bạn có đơn hàng mới!</h2>
              <button onClick={handleOrderDetails}>Xem đơn</button>
              <button onClick={() => setPopupVisible(false)}>Đóng</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default DriverHome;
