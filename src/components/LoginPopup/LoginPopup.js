import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";


const LoginPopup = ({ setShowLogin, setShowSignUp, existingUsers, onLoginSuccess }) => {
  const [email, setEmail] = useState(""); // Trường email
  const [password, setPassword] = useState(""); // Trường mật khẩu
  const [error, setError] = useState(""); // Thông báo lỗi

  // Hàm xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      onLoginSuccess(user); // Đăng nhập thành công, kèm theo vai trò
    } else {
      setError("Email hoặc mật khẩu không đúng."); // Đăng nhập thất bại
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        {/* Tiêu đề */}
        <div className="login-popup-title">
          <h2>Đăng nhập</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        {/* Input form */}
        <div className="login-popup-inputs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="error">{error}</p>}

        {/* Nút hành động */}
        <button type="submit">Đăng nhập</button>

        {/* Chuyển sang đăng ký */}
        <p className="switch-to-signup">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => {
              setShowLogin(false); // Đóng popup đăng nhập
              setShowSignUp(true); // Mở popup đăng ký
            }}
          >
            Đăng ký ngay
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;