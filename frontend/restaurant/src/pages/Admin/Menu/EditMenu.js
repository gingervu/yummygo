import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import EditItem from "../../../components/EditItem/EditItem";
import BackPage from "../../../components/BackPage/BackPage";
import "./EditMenu.css";

const EditMenu = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    img_url: null,
  });

  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("access_token");

  // Lấy danh sách món ăn từ API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/items/all", {
            headers: {
              Authorization: `Bearer ${token}`, // Token trong header
            },
          });
        setItems(response.data); // Giả định API trả về một mảng các món
      } catch (error) {
        console.error("Lỗi khi tải danh sách món:", error);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (id, editItem) => {
    console.log(id)
    axios.put(`http://localhost:8000/items/update/${id}`, editItem, {
        headers: {
            Authorization: `Bearer ${token}`, // Token trong header
        },
        }).then((response) => window.location.reload())
        .catch((error) => {
        console.error("Có lỗi xảy ra khi thay đổi thôn tin món:", error);
        });
    
  };

  const handleItemDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:8000/items/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token trong header
        },
      }).then((response) => window.location.reload())
      .catch((error) => {
        console.error("Có lỗi xảy ra khi xóa món:", error);
      });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewItem((prev) => ({ ...prev, img_url: e.target.files[0] }));
  };

  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        // const formData = new FormData();
        // formData.append("name", newItem.name);
        // formData.append("description", newItem.description);
        // formData.append("price", newItem.price);
        // if (newItem.file) {
        //   formData.append("img_url", newItem.img_url); // Gửi file ảnh
        // }
        const response = await axios.post("http://localhost:8000/items/create", 
          {"name": newItem.name, "description": newItem.description, "price": Number(newItem.price)}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Thêm món thành công")
        window.location.reload();
        setShowPopup(false); // Đóng popup
      } catch (error) {
        console.error("Lỗi khi thêm món mới:", error);
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin món ăn!");
    }
  };
  
  return (
    <div className="edit-menu">
      <Header />
      <Sidebar />
      <main>
        <div className="back">
          <BackPage to="/admin-menu" />
        </div>
        <h2>Chỉnh sửa thực đơn quán</h2>
        <button className="change-btn" onClick={() => setShowPopup(true)}>
          Thêm món
        </button>

        <div className="items-container">
          {items.map((item) => (
            <EditItem key={item.item_id} id={item.item_id} name={item.name} description={item.description} price={Number(item.price)} onEdit={handleItemChange} onDelete={handleItemDelete}/>
          ))}
        </div>

        {/* Popup thêm món */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Thêm món mới</h3>
              <div className="form-group">
                <label>Tên món:</label>
                <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Mô tả:</label>
                <input type="text" name="description" value={newItem.description} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Giá:</label>
                <input type="number" name="price" value={newItem.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Ảnh món:</label>
                <input type="file" name="img_url" onChange={handleImageChange} accept="image/*" />
              </div>
              <div className="form-actions">
                <button onClick={handleAddItem}>Thêm</button>
                <button onClick={() => setShowPopup(false)}>Hủy</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EditMenu;
