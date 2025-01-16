import React, { useState } from "react";
import "./LoginPopup.css";
import axios from "axios";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin, setShowSignUp, onLoginSuccess }) => {
  const [username, setUsername] = useState(""); // Tên tài khoản
  const [password, setPassword] = useState(""); // Mật khẩu
  const [role, setRoleLocal] = useState(""); // Vai trò
  const [error, setError] = useState(""); // Thông báo lỗi
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setLoading(true);
    setError("");

    try {
      // Gửi request đăng nhập tới API
      const response = await axios.post("http://127.0.0.1:8000/token", {
        user_name: username,
        password,
        role,
      });

      // Xử lý phản hồi từ BE
      if (response.status === 200) {
        alert(response.data.message || "Đăng nhập thành công!");

        // Gọi hàm callback khi đăng nhập thành công
        onLoginSuccess(role);

        // Đóng popup đăng nhập
        setShowLogin(false);
      }
    } catch (err) {
      console.error(err);

      // Xử lý lỗi từ backend
      if (err.response) {
        setError(err.response.data.detail || "Đăng nhập thất bại.");
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
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
            placeholder="Tên tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Chọn vai trò */}
          <select
            value={role}
            onChange={(e) => setRoleLocal(e.target.value)}
            required
          >
            <option value="">Chọn vai trò</option>
            <option value="customer">Khách hàng</option>
            <option value="driver">Tài xế</option>
            <option value="restaurant">Doanh nghiệp</option>
          </select>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="error">{error}</p>}

        {/* Nút hành động */}
        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

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