import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(""); // Tên tài khoản
  const [status, setStatus] = useState(""); // Tên tài khoản
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [newValue, setNewValue] = useState(name);
  const [showPopup, setShowPopup] = useState(false);

  

  // Lấy thông tin tài khoản từ API
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get("http://localhost:8000/drivers/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setName(response.data.name); // Gán tên từ API vào state
        setStatus(response.data.status);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin tài khoản:", error);
      }
    };

    fetchProfile();
  }, []);

  

  const handleEdit = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
  };

  const handleSave = async () => {
    setName(newValue); // Cập nhật giá trị mới
    setIsEditing(false); // Tắt chế độ chỉnh sửa
    const token = localStorage.getItem("access_token");
    const data = {
      name: newValue,
      status: status
    };
    try {
      const response = await axios.put(
        "http://localhost:8000/drivers/update", data, // Gửi tên mới
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 ) {
      console.log("Tên tài khoản đã được cập nhật.");
      setIsEditing(false); // Thoát chế độ chỉnh sửa
    } }catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật tên tài khoản:", error);
    }
  };


  // Xử lý xóa tài khoản
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.delete("http://localhost:8000/drivers/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 ) {
      console.log("Tài khoản đã bị xóa.");
      localStorage.removeItem("access_token");
      navigate("/"); // Điều hướng về trang chính sau khi xóa
    }} catch (error) {
      console.error("Có lỗi xảy ra khi xóa tài khoản:", error);
    }
  };

  return (
    <div className="profile">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <h2>Tài khoản</h2>
        <div className="profile-name">
          <div className="container">
            <span className="label">Tên: </span>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="input-edit"
                />
                <button className="save-btn" onClick={handleSave}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                    <path d="M10.1172 28.9844V21.6016C10.1172 20.6955 10.8517 19.9609 11.7578 19.9609H23.2422C24.1483 19.9609 24.8828 20.6955 24.8828 21.6016V29.8047M24.8828 6.01563V9.29688C24.8828 10.203 24.1483 10.9375 23.2422 10.9375L11.7578 10.9375C10.8517 10.9375 10.1172 10.203 10.1172 9.29687L10.1172 4.375M29.8012 10.1137L24.8863 5.19877C24.3588 4.67132 23.6435 4.375 22.8975 4.375H7.1875C5.63418 4.375 4.375 5.63418 4.375 7.1875V27.8125C4.375 29.3658 5.63418 30.625 7.1875 30.625H27.8125C29.3658 30.625 30.625 29.3658 30.625 27.8125V12.1025C30.625 11.3565 30.3287 10.6412 29.8012 10.1137Z" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                
              </>
            ) : (
              <>
                <span className="value">{name}</span>
                <button className="edit-btn" onClick={handleEdit}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 25.9001H25.2M17.5 5.60005L22.4 9.80005M4.90005 18.2001L18.7033 3.91471C20.1895 2.4285 22.5992 2.42849 24.0854 3.91471C25.5716 5.40093 25.5716 7.81056 24.0854 9.29678L9.80005 23.1001L2.80005 25.2001L4.90005 18.2001Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
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

export default Profile;
