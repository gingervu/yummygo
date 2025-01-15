// import React, { useState } from 'react';
// import Navbar from './components/Navbar/Navbar';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import Cart from './pages/Cart/Cart';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
// import Footer from './components/Footer/Footer';
// import LoginPopup from './components/LoginPopup/LoginPopup';
// import SignUpPopup from './components/SignUpPopup/SignUpPopup';
// import Customer from './pages/Customer/Customer'; // Import trang Customer

// const App = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null); // Trạng thái người dùng hiện tại
//   const [role, setRole] = useState(""); // Trạng thái vai trò của người dùng

//   // Mock existing users (giả lập dữ liệu người dùng đã có)
//   const [existingUsers, setExistingUsers] = useState([
//     { username: 'user1', phoneNumber: '0123456789', email: 'user1@example.com', password: 'pass1' },
//     { username: 'user2', phoneNumber: '0987654321', email: 'user2@example.com', password: 'pass2' },
//   ]);

//   const navigate = useNavigate(); // Dùng hook để chuyển hướng sau khi đăng nhập

//   // Hàm xử lý khi đăng ký thành công
//   const handleSignUpSuccess = (newUser) => {
//     setExistingUsers([...existingUsers, newUser]);
//     setShowSignUp(false); // Đóng popup đăng ký
//     setShowLogin(true); // Mở popup đăng nhập ngay sau khi đăng ký thành công
//   };

//   // Hàm xử lý khi đăng nhập thành công
//   const handleLoginSuccess = (user, role) => {
//     setCurrentUser(user); // Gán người dùng hiện tại
//     setRole(role); // Lưu vai trò của người dùng

//     setShowLogin(false); // Đóng popup đăng nhập

//     if (role === 'Khách hàng') {
//       navigate('/customer'); // Chuyển hướng đến trang khách hàng
//     } else {
//       navigate('/'); // Chuyển hướng đến trang chủ cho các vai trò khác
//     }
//   };

//   // Hàm xử lý đăng xuất
//   const handleLogout = () => {
//     setCurrentUser(null);
//     setRole(""); // Reset vai trò
//     navigate('/'); // Chuyển hướng về trang chủ sau khi đăng xuất
//   };

//   return (
//     <>
//       {/* Hiển thị popup đăng nhập hoặc đăng ký */}
//       {showLogin && (
//         <LoginPopup
//           setShowLogin={setShowLogin}
//           existingUsers={existingUsers}
//           onLoginSuccess={handleLoginSuccess}
//           setShowSignUp={setShowSignUp}
//           setRole={setRole} // Truyền setRole để cập nhật vai trò
//         />
//       )}
//       {showSignUp && (
//         <SignUpPopup
//           setShowSignUp={setShowSignUp}
//           existingUsers={existingUsers}
//           onSignUpSuccess={handleSignUpSuccess}
//         />
//       )}

//       <div className="app">
//         <Navbar
//           setShowLogin={setShowLogin}
//           setShowSignUp={setShowSignUp}
//           currentUser={currentUser}
//           handleLogout={handleLogout}
//         />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/order" element={<PlaceOrder />} />
//           <Route path="/customer" element={<Customer />} /> {/* Thêm route cho trang khách hàng */}
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default App;

import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SignUpPopup from "./components/SignUpPopup/SignUpPopup";
import Customer from "./pages/Customer/Customer"; // Import trang Customer
import FoodDisplay from "./pages/FoodDisplay/FoodDisplay"; // Import trang hiển thị nhà hàng
import MenuRestaurant from "./pages/MenuRestaurant/MenuRestaurant"; // Import trang hiển thị thực đơn

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Trạng thái người dùng hiện tại
  const [role, setRole] = useState(""); // Trạng thái vai trò của người dùng

  // Mock existing users (giả lập dữ liệu người dùng đã có)
  const [existingUsers, setExistingUsers] = useState([
    { username: "user1", phoneNumber: "0123456789", email: "user1@example.com", password: "pass1" },
    { username: "user2", phoneNumber: "0987654321", email: "user2@example.com", password: "pass2" },
  ]);

  const navigate = useNavigate(); // Dùng hook để chuyển hướng sau khi đăng nhập

  // Hàm xử lý khi đăng ký thành công
  const handleSignUpSuccess = (newUser) => {
    setExistingUsers([...existingUsers, newUser]);
    setShowSignUp(false); // Đóng popup đăng ký
    setShowLogin(true); // Mở popup đăng nhập ngay sau khi đăng ký thành công
  };

  // Hàm xử lý khi đăng nhập thành công
  const handleLoginSuccess = (user, role) => {
    setCurrentUser(user); // Gán người dùng hiện tại
    setRole(role); // Lưu vai trò của người dùng

    setShowLogin(false); // Đóng popup đăng nhập

    if (role === "Khách hàng") {
      navigate("/food-display"); // Chuyển hướng đến trang hiển thị nhà hàng
    } else {
      navigate("/"); // Chuyển hướng đến trang chủ cho các vai trò khác
    }
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    setCurrentUser(null);
    setRole(""); // Reset vai trò
    navigate("/"); // Chuyển hướng về trang chủ sau khi đăng xuất
  };

  return (
    <>
      {/* Hiển thị popup đăng nhập hoặc đăng ký */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          existingUsers={existingUsers}
          onLoginSuccess={handleLoginSuccess}
          setShowSignUp={setShowSignUp}
          setRole={setRole} // Truyền setRole để cập nhật vai trò
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
          <Route path="/customer" element={<Customer />} /> {/* Route cho trang khách hàng */}
          <Route path="/food-display" element={<FoodDisplay />} /> {/* Route cho danh sách nhà hàng */}
          <Route path="/menu/:restaurant_id" element={<MenuRestaurant />} /> {/* Route cho thực đơn nhà hàng */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

