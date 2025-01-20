import React, { useState } from "react";
import "./SignUpPopup.css";
import axios from "axios";

const SignUpPopup = ({ setShowSignUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Để theo dõi trạng thái đang tải
  // Kiểm tra hợp lệ
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!formData.name) newErrors.name = "Tên không được để trống.";
    if (!formData.username) newErrors.username = "Tên tài khoản không được để trống.";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Bắt đầu trạng thái loading
      try {
        // Cấu trúc dữ liệu theo yêu cầu của API
        const requestData = {
          user: {
            user_name: formData.username,
            phone: formData.phoneNumber,
            email: formData.email,
            password: formData.password,
          },
          driver: {
            name: formData.name,
          },
        };
        const response = await axios.post("http://127.0.0.1:8000/register/driver", requestData);
        if (response.status === 200) {
          alert("Đăng ký tài xế thành công!");
          setShowSignUp(false); // Đóng popup
          resetForm();
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
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
  };

  return (
    <div className="sign-up-popup">
      <div className="sign-up-popup-container">
        <div className="sign-up-popup-title">
          <h2>Đăng ký tài xế</h2>
          <button onClick={() => setShowSignUp(false)}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sign-up-popup-inputs">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
              type="text"
              name="username"
              placeholder="Tên tài khoản"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button type="submit" className="submit-button">
            Hoàn thành
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPopup;