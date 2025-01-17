import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SignUpPopup from "./components/SignUpPopup/SignUpPopup";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Customer from "./pages/Customer/Customer";
import FoodDisplay from "./pages/FoodDisplay/FoodDisplay";
import MenuRestaurant from "./pages/MenuRestaurant/MenuRestaurant";
import RestaurantSearch from "./pages/RestaurantSearch/RestaurantSearch";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Người dùng hiện tại
  const [role, setRole] = useState(""); // Vai trò người dùng

  // Mock dữ liệu người dùng
  const [existingUsers, setExistingUsers] = useState([
    { username: "user1", phoneNumber: "0123456789", email: "user1@example.com", password: "pass1" },
    { username: "user2", phoneNumber: "0987654321", email: "user2@example.com", password: "pass2" },
  ]);

  const navigate = useNavigate(); // Dùng để chuyển hướng

  // Xử lý đăng ký thành công
  const handleSignUpSuccess = (newUser) => {
    setExistingUsers([...existingUsers, newUser]); // Thêm người dùng mới
    setShowSignUp(false); // Đóng popup đăng ký
    setShowLogin(true); // Mở popup đăng nhập
  };

  // Xử lý đăng nhập thành công
  const handleLoginSuccess = (user, role) => {
    setCurrentUser(user); // Lưu người dùng hiện tại
    setRole(role); // Lưu vai trò

    setShowLogin(false); // Đóng popup đăng nhập

    // Điều hướng dựa trên vai trò
    role === "Khách hàng" ? navigate("/food-display") : navigate("/");
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setCurrentUser(null);
    setRole(""); // Xóa vai trò
    navigate("/"); // Trở về trang chủ
  };

  return (
    <>
      {/* Popup đăng nhập và đăng ký */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          existingUsers={existingUsers}
          onLoginSuccess={handleLoginSuccess}
          setShowSignUp={setShowSignUp}
          setRole={setRole}
        />
      )}
      {showSignUp && (
        <SignUpPopup
          setShowSignUp={setShowSignUp}
          existingUsers={existingUsers}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}

      <div className="app">
        {/* Thanh điều hướng */}
        <Navbar
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />

        {/* Định tuyến */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder/:orderId" element={<PlaceOrder />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/food-display" element={<FoodDisplay />} />
          <Route path="/menu/:restaurant_id" element={<MenuRestaurant />} />
          <Route path="/restaurant-search" element={<RestaurantSearch />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
