import React, { useState } from "react";
import "./SignUpPopup.css";
import axios from 'axios';

const SignUpPopup = ({ setShowSignUp }) => {
  const [step, setStep] = useState(1); // Quản lý bước (1: tài khoản, 2: nhà hàng)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [accountData, setAccountData] = useState(null); // Lưu thông tin tài khoản
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    category: "",
    address: "",
  });

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

  const handleRestaurantChange = (e) => {
    setRestaurantData({
      ...restaurantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setAccountData({
        user_name: formData.username,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        
      });
      setStep(2); // Chuyển sang bước điền thông tin nhà hàng
    }
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantData.name || !restaurantData.category || !restaurantData.address) {
      alert("Vui lòng điền đầy đủ thông tin nhà hàng.");
      return;
    }

    const payload = {
      user: {
        user_name: formData.username,
        phone: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      },
      restaurant: {
        name: restaurantData.name,
        category: restaurantData.category,
        address: restaurantData.address,
      },
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/register/restaurant", payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );
      if (response.status === 200 ) {
        alert("Đăng ký nhà hàng thành công!");
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
    setRestaurantData({
      name: "",
      category: "",
      address: "",
    });
    setErrors({});
    
  };

  return (
    <div className="sign-up-popup">
      <div className="sign-up-popup-container">
      {step === 1 ? (
        <>
        <div className="sign-up-popup-title">
          <h2>Đăng ký nhà hàng</h2>
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
              Tiếp tục
            </button>
          </form>
          </>
          ) : (
            <>
            <div className="sign-up-popup-title">
              <h2>Đăng ký nhà hàng</h2>
              <button onClick={() => setShowSignUp(false)}>✖</button>
            </div>
            <form onSubmit={handleRestaurantSubmit}>
              <div className="sign-up-popup-inputs">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên nhà hàng"
                  value={restaurantData.name}
                  onChange={handleRestaurantChange}
                />
                <select
                  name="category"
                  value={restaurantData.category}
                  onChange={handleRestaurantChange}
                >
                  <option value="">Chọn loại hình nhà hàng</option>
                  <option value="Bún - Phở - Cháo">Bún - Phở - Cháo</option>
                  <option value="Bánh Mì - Xôi">Bánh Mì - Xôi</option>
                  <option value="Gà rán - Burger">Gà rán - Burger</option>
                  <option value="Cơm">Cơm</option>
                  <option value="Hải sản">Hải sản</option>
                  <option value="Đồ chay">Đồ chay</option>
                  <option value="Cà phê">Cà phê</option>
                  <option value="Trà sữa">Trà sữa</option>
                  <option value="Tráng miệng">Tráng miệng</option>
                  <option value="Ăn vặt">Ăn vặt</option>
                  <option value="Pizza - Mì Ý">Pizza - Mì Ý</option>
                  <option value="Bánh Việt Nam">Bánh Việt Nam</option>
                  <option value="Lẩu - Nướng">Lẩu - Nướng</option>
                </select>
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={restaurantData.address}
                  onChange={handleRestaurantChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Hoàn thành
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPopup;