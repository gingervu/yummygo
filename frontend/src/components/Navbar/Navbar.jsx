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
        <Link to='/cart'><p>YUMMYGO</p></Link>
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
        {/* Ảnh giỏ hàng */}
        <Link to='/cart'><img
          className="navbar-icon"
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Giỏ hàng"
        /></Link>

        {/* Ảnh thông báo */}
        <img
          className="navbar-icon"
          src="https://cdn-icons-png.flaticon.com/512/3602/3602123.png"
          alt="Thông báo"
        />

        {!currentUser ? (
          <>
            <button onClick={() => setShowLogin(true)}>Đăng nhập</button>
            <button onClick={() => setShowSignUp(true)}>Đăng ký</button>
          </>
        ) : (
          <div className="user-menu">
            <img
              className="navbar-icon"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              alt="Người dùng"
              onClick={toggleUserMenu}
            />
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
