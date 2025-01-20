import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css'; 

const Header = () => {
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
