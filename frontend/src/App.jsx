import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import SignUpPopup from './components/SignUpPopup/SignUpPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Trạng thái người dùng hiện tại

  // Mock existing users (giả lập dữ liệu người dùng đã có)
  const [existingUsers, setExistingUsers] = useState([
    { username: 'user1', phoneNumber: '0123456789', email: 'user1@example.com', password: 'pass1' },
    { username: 'user2', phoneNumber: '0987654321', email: 'user2@example.com', password: 'pass2' },
  ]);

  // Hàm xử lý khi đăng ký thành công
  const handleSignUpSuccess = (newUser) => {
    setExistingUsers([...existingUsers, newUser]);
    setShowSignUp(false);
    setShowLogin(true);
  };

  // Hàm xử lý khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setCurrentUser(user); // Gán người dùng hiện tại
    setShowLogin(false);
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {/* Hiển thị popup đăng nhập hoặc đăng ký */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          existingUsers={existingUsers}
          onLoginSuccess={handleLoginSuccess}
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
        <Navbar
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
