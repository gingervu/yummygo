import React from 'react';
import './Toggle.css';  // Import file CSS đã tạo

const Toggle = ({ checked, onChange }) => {
  return (
    <div className="Toggle">
      <div
        className={`toggle-btn ${checked ? 'toggled' : ''}`}
        onClick={onChange}
      >
        <div className="thumb"></div>
      </div>
    </div>
  );
};

export default Toggle;