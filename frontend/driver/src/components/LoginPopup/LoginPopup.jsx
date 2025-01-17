import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const DriverLoginPopup = ({ setShowLogin, setShowSignUp }) => {
  // State
  const [userName, setUserName] = useState(""); // Tên đăng nhập
  const [password, setPassword] = useState(""); // Mật khẩu
  const [error, setError] = useState(""); // Thông báo lỗi
  const navigate = useNavigate();

  // Hàm xử lý lỗi
  const handleLoginError = (error) => {
    if (error.response) {
      setError(error.response.data.message || "Thông tin đăng nhập không chính xác!");
    } else if (error.request) {
      setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.");
    } else {
      setError(`Đã xảy ra lỗi: ${error.message}`);
    }
  };

  // Hàm đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    const loginData = { user_name: userName, password, role: "driver" };

    try {
      const response = await axios.post("http://127.0.0.1:8000/token", loginData);
      const token = response.data["access_token"];
      localStorage.setItem("access_token", token);
      alert("Đăng nhập thành công!");
      closePopup();
      navigate("/driver/home");
    } catch (error) {
      handleLoginError(error);
    }
  };

  // Hàm đóng popup và reset trạng thái
  const closePopup = () => {
    setShowLogin(false);
    setUserName("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        {/* Tiêu đề */}
        <div className="login-popup-title">
          <h2>Đăng nhập</h2>
          <img src={assets.cross_icon} alt="Close" onClick={closePopup} />
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

        {/* Hiển thị lỗi */}
        {error && <p className="error">{error}</p>}

        {/* Nút hành động */}
        <button type="submit">Đăng nhập</button>

        {/* Chuyển sang giao diện đăng ký */}
        <p className="switch-to-signup">
          Chưa có tài khoản?{" "}
          <span
            onClick={() => {
              closePopup();
              setShowSignUp(true);
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
