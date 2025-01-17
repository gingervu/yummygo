// import React from 'react';
// import './Toggle.css';  // Import file CSS đã tạo

// const Toggle = ({ checked, onChange }) => {
//   return (
//     <div className="Toggle">
//       <div 
//         className={`toggle-btn ${checked ? 'toggled' : ''}`} 
//         onClick={onChange}
//       >
//         <div className="thumb"></div>
//       </div>
//     </div>
//   );
// };

// export default Toggle;

import React from 'react';
import './Toggle.css';  // Import file CSS đã tạo

const Toggle = ({ checked, onChange }) => {
  return (
    <div className="Toggle">
      <div
        className={`toggle-btn ${checked ? 'toggled' : ''}`}
        onClick={onChange}
        role="switch"           // Đảm bảo khả năng truy cập
        aria-checked={checked}  // Thêm aria-checked để trợ giúp thiết bị hỗ trợ
        tabIndex="0"            // Thêm tabIndex để điều khiển bằng bàn phím
        onKeyPress={(e) => {
          // Nếu người dùng nhấn phím Enter hoặc Space, sẽ gọi onChange
          if (e.key === 'Enter' || e.key === ' ') {
            onChange();
          }
        }}
      >
        <div className="thumb"></div>
      </div>
    </div>
  );
};

export default Toggle;
