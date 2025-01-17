import React, { useState, useEffect } from 'react';
import './Navbar.css';
// import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig'; // Đảm bảo bạn có axios instance
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ setShowLogin, setShowSignUp, currentUser, handleLogout }) => {
  const navigate = useNavigate();

  const handleUserInfoClick = () => {
    navigate('/customer-info'); // Chuyển hướng đến trang CustomerInfor
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState({ restaurants: [], items: [] });
  const [categories, setCategories] = useState([]); // Danh sách các loại nhà hàng
  const [selectedCategory, setSelectedCategory] = useState(''); // Loại nhà hàng đang được chọn
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Trạng thái menu người dùng
  const [userInfo, setUserInfo] = useState(null); // Thông tin người dùng từ API /customers/me

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

  // Xử lý khi người dùng nhập vào thanh tìm kiếm
  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        // Gọi API tìm kiếm
        const response = await axiosInstance.get(`/customers/search?query=${query}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });

        // Lưu kết quả trả về vào state
        setFilteredItems({ restaurants: response.data, items: [] });
      } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
      }
    } else {
      setFilteredItems({ restaurants: [], items: [] });
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
            placeholder="Tìm nhà hàng..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <ul className="search-results">
              {filteredItems.restaurants.length > 0 && (
                <div>
                  {filteredItems.restaurants.map((restaurant, index) => (
                    <li key={index}>
                      {restaurant.name}
                    </li>
                  ))}
                </div>
              )}
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
                <button onClick={handleUserInfoClick}>Thông tin người dùng</button>
                <button onClick={handleLogout}>Đăng xuất</button>
                <button>Sửa thông tin</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

