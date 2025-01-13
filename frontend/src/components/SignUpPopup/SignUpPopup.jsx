import React, { useState } from "react";
import "./SignUpPopup.css";

const SignUpPopup = ({ setShowSignUp }) => {
  const [step, setStep] = useState(1); // Step 1: Chọn vai trò, Step 2: Điền thông tin
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Kiểm tra hợp lệ
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;

    if (!role) newErrors.role = "Vui lòng chọn vai trò.";
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

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Đăng ký thành công!");
      setShowSignUp(false); // Đóng popup
      resetForm();
    }
  };

  const resetForm = () => {
    setRole("");
    setFormData({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    setStep(1);
  };

  return (
    <div className="sign-up-popup">
      <div className="sign-up-popup-container">
        <div className="sign-up-popup-title">
          <h2>{step === 1 ? "Chọn vai trò" : "Đăng ký tài khoản"}</h2>
          <button onClick={() => setShowSignUp(false)}>✖</button>
        </div>

        {step === 1 && (
          <div className="sign-up-popup-role">
            <button onClick={() => handleRoleSelect("Khách hàng")}>Khách hàng</button>
            <button onClick={() => handleRoleSelect("Tài xế")}>Tài xế</button>
            <button onClick={() => handleRoleSelect("Doanh nghiệp")}>Doanh nghiệp</button>
            {errors.role && <p className="error">{errors.role}</p>}
          </div>
        )}

        {step === 2 && (
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
        )}
      </div>
    </div>
  );
};

export default SignUpPopup;
