import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axiosInstance from '../../services/axiosConfig'; // Cấu hình axios
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin, setShowSignUp, currentUser, handleLogout }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        try {
          const response = await axiosInstance.get('/customers/me', {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          });
          setUserInfo(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        }
      }
    };
    fetchUserInfo();
  }, [currentUser]);

  // Xử lý tìm kiếm
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axiosInstance.get(`/customers/search?query=${query}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
      }
    } else {
      setFilteredItems([]);
    }
  };

  // Điều hướng khi bấm vào nhà hàng
  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurant-search?name=${encodeURIComponent(restaurant.name)}`, {
      state: { restaurant },
    });
  };

  // Mở/đóng menu người dùng
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-left">
        <Link to="/"><p>YUMMYGO</p></Link>
      </div>

      {/* Tìm kiếm */}
      <div className="navbar-center">
        <p>Món ngon ở đâu cũng có!</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm nhà hàng..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && filteredItems.length > 0 && (
            <ul className="search-results">
              {filteredItems.map((restaurant, index) => (
                <li key={index} onClick={() => handleRestaurantClick(restaurant)}>
                  {restaurant.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Menu bên phải */}
      <div className="navbar-right">
        {/* Giỏ hàng */}
        <Link to="/cart">
          <img
            className="navbar-icon"
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            alt="Giỏ hàng"
          />
        </Link>

        {/* Thông báo */}
        <img
          className="navbar-icon"
          src="https://cdn-icons-png.flaticon.com/512/3602/3602123.png"
          alt="Thông báo"
        />

        {/* Đăng nhập/Đăng ký hoặc thông tin người dùng */}
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
                <button onClick={() => navigate('/customer-info')}>Thông tin người dùng</button>
                <button onClick={handleLogout}>Đăng xuất</button>
                <button onClick={() => navigate('/edit-profile')}>Sửa thông tin</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar
