import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./PickupSuccess.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const PickupSuccess = () => {
  const [orderDetails, setOrderDetails] = useState({
      customer_name: "",
      restaurant_name: "",
      driver_name: "",
      restaurant_address: "",
      restaurant_category: "",
      address: "",
      distance: null,
      food_fee: null,
      delivery_fee: null,
      order_status: "",
      note: "",
    });
    const [orderItems, setOrderItems] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token"); // Token từ localStorage
  
  
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderId = localStorage.getItem("order_id"); // Get orderId from localStorage
        console.log("orderId:", orderId);
        if (orderId) {
          // Update the order status to "preparing"
          await axios.put(
            `http://127.0.0.1:8000/orders/change-status/${orderId}?new_status=delivering`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Fetch the order information
          const orderInfoResponse = await axios.get(
            `http://127.0.0.1:8000/orders/info/${orderId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const orderData = orderInfoResponse.data;

          setOrderDetails({
            customer_name: orderData.customer_name,
            restaurant_name: orderData.restaurant_name,
            driver_name: orderData.driver_name,
            restaurant_address: orderData.restaurant_address,
            restaurant_category: orderData.restaurant_category,
            address: orderData.address,
            distance: orderData.distance,
            food_fee: orderData.food_fee,
            delivery_fee: orderData.delivery_fee,
            order_status: orderData.order_status,
            note: orderData.note,
          });
          console.log("Order details:", orderData);
        } else {
          setError("Không tìm thấy orderId");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi khi lấy dữ liệu");
      }
    };

    fetchOrderData();
  }, [token]); // Re-run when token changes

  const handleButtonClick = () => {
    navigate("/driver/delivertocustomer"); // Điều hướng đến trang /
  };

  return (
    <div className="pickup-sucess">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main >
        <h2>Bạn đã lấy đơn! Giao đến cho khách hàng thôi!</h2>

        <div className="delivery-box">
          <div className="delivery-to">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 23 22" fill="none">
                  <path d="M10.3181 20.8757C1.61539 12.1105 0 11.211 0 7.9896C0 3.57705 5.14871 0 11.5 0C17.8513 0 23 3.57705 23 7.9896C23 11.211 21.3846 12.1105 12.6819 20.8757C12.1108 21.4489 10.8892 21.4489 10.3181 20.8757ZM11.5 11.3186C14.1464 11.3186 16.2917 9.82817 16.2917 7.9896C16.2917 6.15104 14.1464 4.6606 11.5 4.6606C8.85362 4.6606 6.70833 6.15104 6.70833 7.9896C6.70833 9.82817 8.85362 11.3186 11.5 11.3186Z" fill="#E97522" />
                </svg>
              </span>
              Giao đến: <strong>{orderDetails.restaurant_address}</strong>
            </p>
          </div>

          {/* Bản đồ */}
          <div className="map-container"></div>
        </div>

        <div className="action-btn-container">
          <button className="action-btn sucess-btn" onClick={handleButtonClick}>Đã đến nơi</button>
        </div>

      </main>
    </div>
  );
};

export default PickupSuccess;
