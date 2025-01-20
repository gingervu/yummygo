import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddressEditor.css";

const AddressEditor = ({ orderId, onSave }) => {
  const [inputAddress, setInputAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]); // Chỉ log khi suggestions thay đổi
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputAddress(value);

    // Dừng API cũ và khởi động lại debounce
    clearTimeout(debounceTimeout);

    // Đặt timeout mới
    const timeout = setTimeout(() => {
      if (value.trim()) {
        fetchSuggestions(value.trim());
      } else {
        setSuggestions([]);
      }
    }, 300); // Thời gian chờ (300ms)

    setDebounceTimeout(timeout);
  };

  const fetchSuggestions = async (address) => {
    setLoadingSuggestions(true);
    try {
        const response = await axios.get("http://localhost:8000/address/search", {
            params: { address }, // Gửi dữ liệu qua query parameters
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token nếu cần
            },
          });
      console.log("response: ",response.data)
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy gợi ý địa chỉ: ", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setInputAddress(suggestion.address); // Hiển thị địa chỉ đã chọn trong input
    setSuggestions([]);
  };

  const handleSave = async () => {
    if (!selectedSuggestion) {
      alert("Vui lòng chọn một địa chỉ gợi ý!");
      return;
    }

    try {
        await axios.put(`http://localhost:8000/address/order-set?order_id=${orderId}`, selectedSuggestion, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });
                alert("Địa chỉ đã được lưu thành công!");
        onSave(selectedSuggestion); // Gửi dữ liệu đã lưu lên component cha
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ: ", error);
      alert("Đã xảy ra lỗi khi lưu địa chỉ.");
    }
  };

  return (
    <div className="address-editor">
      <label className="address-label">Địa chỉ:</label>
      <input
        type="text"
        value={inputAddress}
        onChange={handleInputChange}
        className="input-field"
        placeholder="Nhập địa chỉ"
      />
      {loadingSuggestions && <div className="loading">Đang tải gợi ý...</div>}
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {Array.isArray(suggestions) && suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.address}
            </li>
          ))}
        </ul>
      )}
      <button className="save-btn" onClick={handleSave}>
        Lưu
      </button>
    </div>
  );
};

export default AddressEditor;
