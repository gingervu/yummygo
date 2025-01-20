import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminProfile.css";
import axios from "axios";
import AddressEditor from "./AddressEditor";
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [restaurantInfo, setRestaurantInfo] = useState(null); // Thông tin nhà hàng
  const [userInfo, setUserInfo] = useState(null); // Thông tin tài khoản nhà hàng
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

  const [editIndex, setEditIndex] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const [restaurantResponse, userResponse] = await Promise.all([
          axios.get("/restaurants/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setRestaurantInfo(restaurantResponse.data);
        setUserInfo(userResponse.data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu: ", err);
        setError("Không thể tải dữ liệu từ API");
      } finally {
      }
    };

    fetchData();
  }, []);


  const handleEdit = (index, currentValue) => {
    setEditIndex(index);
    setNewValue(currentValue);
  };

  const handleSave = async (index, key) => {
    const token = localStorage.getItem("access_token");
    try {
      if (key === "phone" || key === "email") {
        await axios.put(
          "/users/update",
          { [key] : newValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserInfo({ ...userInfo, [key]: newValue });
      } else {
        await axios.put(
          "/restaurants/update",
          { [key] : newValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRestaurantInfo({ ...restaurantInfo, [key]: newValue });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin: ", error);
    }
    setEditIndex(null);
    setNewValue('');
  };

  const shortenText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };


  const profileItems = [
    { label: "Tên quán", value: restaurantInfo?.name, key: "name" },
    { label: "Phân loại", value: restaurantInfo?.category, key: "category" },
    { label: "Địa chỉ", value: shortenText(restaurantInfo?.address, 50), key: "address" },
    { label: "SĐT", value: userInfo?.phone, key: "phone" },
    { label: "Email", value: userInfo?.email, key: "email" },
  ];

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.delete("http://localhost:8000/restaurants/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 ) {
      console.log("Tài khoản đã bị xóa.");
      localStorage.clear();
      navigate("/"); // Điều hướng về trang chính sau khi xóa
    }} catch (error) {
      console.error("Có lỗi xảy ra khi xóa tài khoản:", error);
    }
  };

  return (
    <div className="admin-profile">
      <Header />
      <Sidebar />
      <main>
        <h2>Hồ sơ quán</h2>
        <div className="container">
          {profileItems.map((item, index) => (
            <div className="info-item" key={index}>
              <span className="label">{item.label}: </span>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="input-edit"
                  />
                  <button
                    className="save-btn"
                    onClick={() => handleSave(index, item.key)}
                  >
                    Lưu
                  </button>
                </>
              ) : (
                <>
                  <span className="value">{item.value}</span>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index, item.value)}
                  >
                    Sửa
                  </button>
                </>
              )}
            </div>
          ))}
          <div>
          <AddressEditor
            initialAddress={restaurantInfo?.address}
            onSave={(selectedAddress) => {
              console.log("Địa chỉ đã lưu: ", selectedAddress);
              // Xử lý logic sau khi lưu, ví dụ:
              setRestaurantInfo((prev) => ({
                ...prev,
                address: selectedAddress.address,
                x: selectedAddress.x,
                y: selectedAddress.y,
              }));
            }}
          />
        </div>
        </div>
        <div className="delete">
          <button onClick={() => setShowPopup(true)}>Xóa tài khoản</button>
      </div>
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
      </main>
    </div>
  );
};

export default AdminProfile;

// import React, { useState, useEffect } from "react";
// import Header from "../../../components/Header/Header";
// import Sidebar from "../../../components/Sidebar/Sidebar";
// import AddressEditor from "./AddressEditor";
// import "./AdminProfile.css";
// import axios from "axios";

// const AdminProfile = () => {
//   const [restaurantInfo, setRestaurantInfo] = useState(null); // Thông tin nhà hàng
//   const [userInfo, setUserInfo] = useState(null); // Thông tin tài khoản nhà hàng
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("access_token");
//         const [restaurantResponse, userResponse] = await Promise.all([
//           axios.get("/restaurants/me", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),
//           axios.get("/users/me", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }),
//         ]);

//         setRestaurantInfo(restaurantResponse.data);
//         setUserInfo(userResponse.data);
//       } catch (err) {
//         console.error("Lỗi khi tải dữ liệu: ", err);
//         setError("Không thể tải dữ liệu từ API");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddressUpdate = (newAddress) => {
//     setRestaurantInfo((prev) => ({ ...prev, address: newAddress }));
//   };

//   if (loading) return <div>Đang tải dữ liệu...</div>;
//   if (error) return <div>{error}</div>;

//   const profileItems = [
//     { label: "Tên quán", value: restaurantInfo?.name, key: "name" },
//     { label: "Phân loại", value: restaurantInfo?.category, key: "category" },
//     { label: "SDT", value: userInfo?.phone, key: "phone" },
//     { label: "Email", value: userInfo?.email, key: "email" },
//   ];

//   return (
//     <div className="admin-profile">
//       <Header />
//       <Sidebar />
//       <main>
//         <h2>Hồ sơ quán</h2>
//         <div className="container">
//           {profileItems.map((item, index) => (
//             <div className="info-item" key={index}>
//               <span className="label">{item.label}: </span>
//               <span className="value">{item.value}</span>
//             </div>
//           ))}
//           {/* Phần địa chỉ sử dụng AddressEditor */}
//           <AddressEditor
//             address={restaurantInfo?.address}
//             onUpdate={handleAddressUpdate}
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminProfile;
