import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRevenue.css";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

const AdminRevenue = () => {
  const [revenue, setRevenue] = useState(null); // State để lưu doanh thu
  const [loading, setLoading] = useState(true); // State để theo dõi quá trình loading
  const [error, setError] = useState(null); // State để lưu lỗi (nếu có)
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

  useEffect(() => {
    // Gửi yêu cầu API để lấy doanh thu hôm nay
    const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

    axios.get("/restaurants/daily-revenue/", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      })
      .then((response) => {
        console.log("Dữ liệu trả về:", response.data);
        setRevenue(response.data); // Cập nhật state với dữ liệu nhận được
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi lấy dữ liệu nhà hàng:");
        console.error("Error message:", error.message);
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
        setError("Không thể tải dữ liệu doanh thu.");
      })
      .finally(() => {
        setLoading(false); // Kết thúc quá trình loading
      });
  }, [token]); // Chạy lại useEffect khi token thay đổi

  if (loading) {
    return (
      <div className="admin-revenue">
        <Header />
        <Sidebar />
        <main>
          <h2>Đang tải...</h2>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-revenue">
        <Header />
        <Sidebar />
        <main>
          <h2>Lỗi</h2>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-revenue">
      <Header />
      <Sidebar />
      <main>
        <h2>Doanh thu hôm nay</h2>
        <p>{revenue ? `${revenue} VND` : "Không có dữ liệu"}</p>
      </main>
    </div>
  );
};

export default AdminRevenue;
