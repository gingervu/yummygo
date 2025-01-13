import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
      <header className="header">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="yummy-text">YUMMY</span>
            <span className="driver-text">merchant</span>
           </Link> 
        </div>
      </header>
    );
  };

export default Header;