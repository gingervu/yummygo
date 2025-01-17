import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (ví dụ: xóa token, reset state)
    navigate("/");  // Điều hướng tới trang chính
  };
  
  return (
      <header className="header">
        <div className="logo">
          <span className="yummy-text">YUMMY</span>
          <span className="driver-text">driver</span>
        </div>
        
      </header>
    );
  };

export default Header;
