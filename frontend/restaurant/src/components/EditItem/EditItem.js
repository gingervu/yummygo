import React, { useState } from "react";
import "./EditItem.css";

const EditItem = ({ id, name, description, price, img_url, onEdit, onDelete }) => {
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [editItem, setEditItem] = useState({
    name,
    description,
    price,
    img_url: null,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEditItem((prev) => ({
      ...prev,
      img_url: e.target.files[0], // Handle image file change
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(id, editItem); // Call the onEdit function to update the item
    setEditPopupVisible(false); // Close the popup after submission
  };

  const handleDeleteConfirm = () => {
    onDelete(id); // Call the onDelete function to delete the item
    setDeletePopupVisible(false); // Close the popup
  };

  return (
    <div className="edit-item">
      <div className="edit-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <span>{price.toLocaleString("vi-VN")} VNĐ</span>
        <span>{img_url}</span>
      </div>
      <div className="edit-button">
        {/* Edit Button */}
        <button className="edit-btn" onClick={() => setEditPopupVisible(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 25.9001H25.2M17.5 5.60005L22.4 9.80005M4.90005 18.2001L18.7033 3.91471C20.1895 2.4285 22.5992 2.42849 24.0854 3.91471C25.5716 5.40093 25.5716 7.81056 24.0854 9.29678L9.80005 23.1001L2.80005 25.2001L4.90005 18.2001Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Delete Button */}
        <button className="delete-btn" onClick={() => setDeletePopupVisible(true)}>
          ✖
        </button>
      </div>

      {/* Edit Popup */}
      {isEditPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Sửa món {name}</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Tên món:</label>
                <input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mô tả:</label>
                <input
                  type="text"
                  name="description"
                  value={editItem.description}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Giá:</label>
                <input
                  type="number"
                  name="price"
                  value={editItem.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ảnh món:</label>
                <input
                  type="file"
                  name="img_url"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <div className="form-actions">
                <button type="submit">Cập nhật</button>
                <button type="button" onClick={() => setEditPopupVisible(false)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Bạn có chắc muốn xóa món {name}?</h3>
            <div className="popup-actions">
              <button onClick={handleDeleteConfirm}>Có</button>
              <button onClick={() => setDeletePopupVisible(false)}>Không</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditItem;