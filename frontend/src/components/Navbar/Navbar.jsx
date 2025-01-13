import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin, setShowSignUp, currentUser, handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Trạng thái menu người dùng

  // Danh sách món ăn mẫu
  const menuItems = ['Phở', 'Bánh mì', 'Trà sữa', 'Pizza', 'Hải sản'];

  // Xử lý khi người dùng nhập
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      // Lọc các món ăn phù hợp
      const filtered = menuItems.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  // Hàm mở/đóng menu người dùng
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Logo hoặc tiêu đề bên trái */}
      <div className="navbar-left">
        <Link to='/home'><p>YUMMYGO</p></Link>
      </div>

      {/* Phần giữa */}
      <div className="navbar-center">
        <p>Món ngon ở đâu cũng có!</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm món ăn..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {filteredItems.length > 0 && (
            <ul className="search-results">
              {filteredItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Phần phải */}
      <div className="navbar-right">
        <span className="material-symbols-outlined navbar-icon">shopping_cart</span> {/* Giỏ hàng */}
        <span className="material-symbols-outlined navbar-icon">notifications</span> {/* Thông báo */}
        
        {!currentUser ? (
          <>
            <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
            <button onClick={() => setShowSignUp(true)}>Đăng ký</button>
          </>
        ) : (
          <div className="user-menu">
            <span 
              className="material-symbols-outlined navbar-icon"
              onClick={toggleUserMenu}
            >
              person
            </span> {/* Người dùng */}
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
