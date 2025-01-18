import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./AllOrders.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const AllOrders = () => {
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
          await axios.get(
            `http://127.0.0.1:8000/drivers/all-orders`,
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
    localStorage.removeItem("order_id");
    navigate("/driver-home"); // Điều hướng đến trang /
  };

  return (
    <div className="delivery-success">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        
      </main>
    </div>
  );
};

export default AllOrders;
