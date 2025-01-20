import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './BackPage.css';

const BackPage = ({ to }) => {
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  const handleBackClick = () => {
    navigate(to); // Điều hướng đến trang mà bạn chuyền vào đường dẫn
  };

  return (
    <button onClick={handleBackClick} className="back-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="34"
        viewBox="0 0 24 30"
        fill="none"
        className="back-button-icon"
      >
        <path
          d="M9.57 22.5875L3.5 15L9.57 7.41248M20.5 15H3.67"
          stroke="#292D32"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default BackPage;