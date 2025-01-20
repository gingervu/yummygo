import React from "react";
import ReactDOM from "react-dom";
import "./Popup.css";

const Popup = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("popup-root")

  );
};

export default Popup;
