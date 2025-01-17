import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DriverLoginPopup = ({ setShowLogin, setShowSignUp, existingUsers, onLoginSuccess }) => {
  const [userName, setUserName] = useState(""); // Tên đăng nhập
  const [password, setPassword] = useState(""); // Trường mật khẩu
  const [error, setError] = useState(""); // Thông báo lỗi
  const navigate = useNavigate(); 
  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    
    const loginData = {
      user_name: userName,
      password: password,
      role: "driver"
    };
    try {
      // Gửi yêu cầu đăng nhập đến API
      const response = await axios.post("http://127.0.0.1:8000/token", loginData);    
      if (response.status === 200 ) {
        alert("Đăng nhập thành công!");
        setShowLogin(false); // Đóng popup
        // Lấy token từ phản hồi API
        const token = response.data["access_token"];
        // Lưu token vào localStorage
        localStorage.setItem("access_token", token);
        console.log("Token:", token)
        // Chuyển hướng
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    
      // Kiểm tra lỗi trả về từ phía server
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || "Đăng ký thất bại, vui lòng kiểm tra lại dữ liệu!"}`);
      } else if (error.request) {
        alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.");
      } else {
        alert(`Đã xảy ra lỗi: ${error.message}`);
      }  
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
            type="text"
            placeholder="Tên đăng nhập"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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

export default DriverLoginPopup;