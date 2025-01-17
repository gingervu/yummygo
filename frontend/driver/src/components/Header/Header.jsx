import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token
    localStorage.removeItem("token");
    sessionStorage.clear();
  
    // Có thể thêm thông báo
    alert("Bạn đã đăng xuất!");
  
    // Điều hướng về trang chính
    navigate("/");
  };
  
  return (
      <header className="header">
        <div className="logo">
          <span className="yummy-text">YUMMY</span>
          <span className="driver-text">driver</span>
          <button className="logout-button" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
        
      </header>
    );
  };

export default Header;
