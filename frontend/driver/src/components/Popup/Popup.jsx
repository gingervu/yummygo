import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

const Popup = ({ onClose, children }) => {
  // Thêm sự kiện đóng popup khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Kiểm tra sự tồn tại của popup-root
  const popupRoot = document.getElementById("popup-root");
  if (!popupRoot) {
    console.error("Popup root element not found in DOM!");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="popup">
      <div
        className="popup-overlay"
        onClick={onClose} // Đóng popup khi nhấn vào overlay
      >
        <div
          className="popup-container"
          onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện nhấn vào overlay truyền vào container
        >
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    </div>,
    popupRoot
  );
};

export default Popup;
