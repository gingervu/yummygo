import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
// import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Customer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(""); // Tên khách hàng
  const [email, setEmail] = useState(""); // Email khách hàng
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Lấy thông tin khách hàng từ API
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.user_name); // Gán tên từ API vào state
        setEmail(response.data.email); // Gán email từ API vào state
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin khách hàng:", error);
      }
    };

    fetchProfile();
  }, []);

  // Xử lý cập nhật thông tin khách hàng
  const handleSaveProfile = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.put(
        "http://localhost:8000/customers/update",
        { name: newName || name, email: newEmail || email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setName(response.data.name); // Cập nhật tên
        setEmail(response.data.email); // Cập nhật email
        console.log("Thông tin khách hàng đã được cập nhật.");
        setIsEditing(false); // Thoát chế độ chỉnh sửa
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật thông tin khách hàng:", error);
    }
  };

  // Xử lý xóa khách hàng
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.delete("http://localhost:8000/customers/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Khách hàng đã bị xóa.");
        localStorage.removeItem("access_token");
        navigate("/"); // Điều hướng về trang chính sau khi xóa
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa tài khoản khách hàng:", error);
    }
  };

  return (
    <div className="profile">
      {/* Header */}
      <Header />
      <Navbar />
      {/* Nội dung chính */}
      <main>
        <h2>Thông tin khách hàng</h2>

        {/* Khu vực chỉnh sửa thông tin */}
        <div className="profile-section">
          <h3>Tên</h3>
          <div className="input-group">
            <input
              type="text"
              value={isEditing ? newName : name}
              onChange={(e) => setNewName(e.target.value)}
              className="input-edit"
              disabled={!isEditing}
              placeholder={name}
            />
          </div>
          <h3>Email</h3>
          <div className="input-group">
            <input
              type="email"
              value={isEditing ? newEmail : email}
              onChange={(e) => setNewEmail(e.target.value)}
              className="input-edit"
              disabled={!isEditing}
              placeholder={email}
            />
          </div>
          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Hủy" : "Chỉnh sửa"}
          </button>
          {isEditing && (
            <button className="save-btn" onClick={handleSaveProfile}>
              Lưu
            </button>
          )}
        </div>

        {/* Nút xóa tài khoản */}
        <div className="delete">
          <button onClick={() => setShowPopup(true)}>Xóa tài khoản</button>
        </div>
      </main>

      {/* Popup xác nhận xóa tài khoản */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Bạn có chắc chắn muốn xóa tài khoản không?</h3>
            <button onClick={() => setShowPopup(false)}>Không</button>
            <button onClick={handleDeleteAccount}>Có</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
