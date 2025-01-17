import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig';
import './RestaurantSearch.css'

const RestaurantSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const restaurantName = queryParams.get('name');
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/customers/search?query=${encodeURIComponent(restaurantName)}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
        );
        // Lấy chi tiết của nhà hàng đầu tiên nếu API trả về danh sách
        setRestaurantDetails(response.data[0]);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết nhà hàng:', error);
      }
    };

    if (restaurantName) {
      fetchRestaurantDetails();
    }
  }, [restaurantName]);

  if (!restaurantDetails) {
    return <p>Đang tải thông tin nhà hàng...</p>;
  }

  return (
    <div>
      <h1>{restaurantDetails.name}</h1>
      <p>Địa chỉ: {restaurantDetails.name}</p>
      <p>Loại hình: {restaurantDetails.category}</p>
      <p>Trạng thái: {restaurantDetails.status}</p>
    </div>
  );
};

export default RestaurantSearch;
