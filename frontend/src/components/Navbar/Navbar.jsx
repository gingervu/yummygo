import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ setShowLogin, setShowSignUp, currentUser, handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Danh sách món ăn mẫu
  const menuItems = ['Phở', 'Bánh mì', 'Trà sữa', 'Pizza', 'Hải sản'];

  return (
    <div className="navbar">
      {/* Logo hoặc tiêu đề bên trái */}
      <div className="navbar-left">
        <p>YUMMYGO</p>
      </div>

      {/* Phần giữa */}
      <div className="navbar-center">
        <p>Món ngon ở đâu cũng có!</p>
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Tìm món
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Phần phải */}
      <div className="navbar-right">
        {!currentUser ? (
          <>
            <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
            <button onClick={() => setShowSignUp(true)}>Đăng ký</button>
          </>
        ) : (
          <>
            <button>Thông báo</button>
            <button>Thông tin</button>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
