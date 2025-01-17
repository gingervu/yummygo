import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import axiosInstance from '../../services/axiosConfig';

const ExploreMenu = ({ category, setCategory }) => {
  const [categories, setCategories] = useState([]); // Lưu danh sách category
  const token = localStorage.getItem('access_token'); // Lấy token từ localStorage

  // Gọi API để lấy danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/customers/filter', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { category: 'trang_mieng' }, // Use a string instead of CategoryEnum
          withCredentials: true
        });
        setCategories(response.data); // Cập nhật state với dữ liệu trả về
      } catch (error) {
        console.error('Lỗi khi lấy danh sách category:', error);
      }
    };

    fetchCategories();
  }, [token]);

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-list">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? 'active' : ''}
              src={item.menu_image || 'default-image-url.png'} // Use default image if no menu_image is available
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p> {/* Make sure to access the correct property */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
