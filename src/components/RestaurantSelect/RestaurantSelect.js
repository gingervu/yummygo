import React, { useState } from "react";
import PropTypes from "prop-types";

import "./RestaurantSelect.css";

const RestaurantSelect = ({ options }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(""); // Trạng thái cho nhà hàng được chọn
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng dropdown

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (restaurant) => {
    setSelectedRestaurant(restaurant.label); // Cập nhật nhà hàng được chọn
    setIsOpen(false); // Đóng dropdown
  };

  return (
    <div className="dropdown-container">
      {/* Nút hiển thị tên nhà hàng */}
      <button className="dropdown-button" onClick={handleToggleDropdown}>
        {selectedRestaurant || "Chọn quán của bạn"}
      </button>

      {/* Danh sách các nhà hàng */}
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default RestaurantSelect;
