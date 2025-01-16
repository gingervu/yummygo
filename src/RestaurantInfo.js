import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm gọi API
    const fetchRestaurantInfo = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

        const response = await axios.get("/restaurants/me",       
          {headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        }},);
  
          
        setRestaurant(response.data); // Lưu thông tin nhà hàng
      } catch (err) {
        setError(err.response?.data?.detail || "Lỗi khi gọi API");
      }
    };

    fetchRestaurantInfo();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Lỗi: {error}</div>;
  }

  if (!restaurant) {
    return <div>Đang tải thông tin nhà hàng...</div>;
  }

  return (
    <div>
      <h1>Thông tin nhà hàng</h1>
      <p><strong>ID:</strong> {restaurant.restaurant_id}</p>
      <p><strong>Tên:</strong> {restaurant.name}</p>
      <p><strong>Địa chỉ:</strong> {restaurant.address}</p>
      <p><strong>Email:</strong> {restaurant.email}</p>
    </div>
  );
};

export default RestaurantInfo;
