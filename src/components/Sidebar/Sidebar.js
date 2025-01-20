import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token")
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (ví dụ: xóa token, reset state)
    axios.put("http://localhost:8000/drivers/update", {"status": "inactive"}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => console.log(response.data))
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("order_id");
    navigate("/");  // Điều hướng tới trang chính
  };

  const handleOrderButtonClick = async () => {
    const orderId = localStorage.getItem("order_id");

    if (!orderId) {
      // Nếu không có order_id, chuyển hướng đến /orderdetails
      navigate("/driver-orderdetails");
      return;
    }
    try {
      // Gọi API để lấy thông tin order
      const response = await axios.get(`http://127.0.0.1:8000/orders/info/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const status = response.data.order_status;
      console.log(status)
      // Điều hướng đến trang tương ứng theo status
      switch (status) {
        case "cart":
          navigate("/driver-orderdetails");
          break;
        case "preparing":
          navigate("/driver-orderaccept");
          break;
        case "delivering":
          navigate("/driver-pickupsuccess");
          break;
        case "delivered":
          navigate("/driver-delivertocustomer");
          break;
        default:
          console.error("Unknown status:", status);
          navigate("/driver-orderdetails"); // Default fallback
      }
    } catch (error) {
      console.error("Error fetching order info:", error);
      navigate("/driver-orderdetails");
    }
  };


  return (
    <div className="sidebar">

      {/* Links */}
      <ul className="sidebar-links">
        <li className="sidebar-item">
          <NavLink
            to="/driver-home"
            className="sidebar-link"
            activeclassname="active" // Dùng activeclassname thay vì xử lý thủ công
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.9902V14.9902M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Trang chủ
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/driver-statistic" className="sidebar-link"
            activeclassname="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984M12 6V18M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Thống kê
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/driver-history" className="sidebar-link"
            activeclassname="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7.20002 16.7999V14.3999M12 16.7999V11.9999M16.8 16.7999V7.1999M4.80002 21.5999C3.47454 21.5999 2.40002 20.5254 2.40002 19.1999V4.7999C2.40002 3.47442 3.47454 2.3999 4.80002 2.3999H19.2C20.5255 2.3999 21.6 3.47442 21.6 4.7999V19.1999C21.6 20.5254 20.5255 21.5999 19.2 21.5999H4.80002Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Lịch sử
          </NavLink>
        </li>
        <li className="sidebar-item">
          <button
            className="sidebar-link"
            onClick={handleOrderButtonClick} // Gọi API khi nhấn vào nút
            activeclassname="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001M9 8H21M17.5 20.75C17.5 21.4404 16.9404 22 16.25 22C15.5596 22 15 21.4404 15 20.75C15 20.0596 15.5596 19.5 16.25 19.5C16.9404 19.5 17.5 20.0596 17.5 20.75ZM9.5 20.75C9.5 21.4404 8.94036 22 8.25 22C7.55964 22 7 21.4404 7 20.75C7 20.0596 7.55964 19.5 8.25 19.5C8.94036 19.5 9.5 20.0596 9.5 20.75Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Đơn hàng
          </button>
        </li>


        <li className="sidebar-item">
          <NavLink to="/driver-profile" className="sidebar-link"
            activeclassname="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12L12 16.5M12 8.66455V8.625M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tài khoản
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.35294 16.2001V18.3001C9.35294 18.8571 9.57605 19.3912 9.97319 19.785C10.3703 20.1788 10.909 20.4001 11.4706 20.4001L18.8824 20.4001C19.444 20.4001 19.9826 20.1788 20.3798 19.785C20.7769 19.3912 21 18.8571 21 18.3001L21 5.7001C21 5.14314 20.7769 4.609 20.3798 4.21517C19.9826 3.82135 19.444 3.6001 18.8824 3.6001L11.4706 3.6001C10.909 3.6001 10.3703 3.82135 9.97319 4.21517C9.57605 4.609 9.35294 5.14314 9.35294 5.7001V7.8001M15.7059 12.0001L3 12.0001M3 12.0001L6.17647 15.1501M3 12.0001L6.17647 8.8501" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
