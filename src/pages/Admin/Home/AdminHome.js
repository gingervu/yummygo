import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminHome.css";
import Toggle from "../../../components/Toggle/Toggle";
import axios from "axios";


const AdminHome = () => {
  const [restaurantName, setRestaurantName] = useState(""); // Khởi tạo state cho tên nhà hàng
  const [restaurantStatus, setRestaurantStatus] = useState(false); // Khởi tạo state cho trạng thái nhà hàng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin nhà hàng
    const token = localStorage.getItem("access_token");
    axios
      .get("/restaurants/me",       
        {headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      }},) // Đảm bảo gửi cookie nếu cần
      .then((response) => {
        console.log("Dữ liệu trả về từ API:", response.data);
        // Lưu tên nhà hàng vào state
        setRestaurantName(response.name); // Giả sử tên nhà hàng nằm trong trường `name`
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu nhà hàng:", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc quá trình loading
      });
  }, []); 

  // Hàm để xử lý khi toggle thay đổi trạng thái
  const handleStatusChange = (newStatus) => {
    setRestaurantStatus(newStatus); // Cập nhật trạng thái trong state

    // Gửi yêu cầu cập nhật trạng thái vào API
    axios
      .put(
        "/restaurants/change-status", 
        { status: newStatus }, 
        { withCredentials: true } // Đảm bảo gửi cookie nếu cần
      )
      .then((response) => {
        console.log("Cập nhật trạng thái nhà hàng thành công:", response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
      });
  };


  return (
    <div className="admin-home">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <div className="restaurant-status">
        {loading ? (
            <span>Loading...</span>
          ) : (
            <span className="restaurant-name">{restaurantName || "Tên nhà hàng chưa có"}</span>
          )}
        <Toggle checked={restaurantStatus} // Trạng thái hiện tại của toggle
            onChange={handleStatusChange} // Hàm xử lý thay đổi trạng thái
             />
        </div>
      </main>
    </div>
  );
};

export default AdminHome;