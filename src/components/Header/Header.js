// Header.js
import React from 'react';
import './Header.css'; // Đảm bảo import CSS đúng

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        YUMMYGO<span style={{ color: "#F8F8F8" }}>driver</span>
      </div>
    </header>
  );
};

export default Header;
