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

  // Mock existing users (giả lập dữ liệu người dùng đã có)
  const [existingUsers, setExistingUsers] = useState([
    { username: 'user1', phoneNumber: '0123456789', email: 'user1@example.com' },
    { username: 'user2', phoneNumber: '0987654321', email: 'user2@example.com' },
  ]);

  // Hàm xử lý khi đăng ký thành công
  const handleSignUpSuccess = (newUser) => {
    setExistingUsers([...existingUsers, newUser]);
    setShowSignUp(false);
    setShowLogin(true);
  };

  return (
    <>
      {/* Hiển thị popup đăng nhập hoặc đăng ký */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
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
