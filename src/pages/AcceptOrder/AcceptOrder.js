import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import OrderItems from "../../components/OrderItems/OrderItems";
import { useNavigate } from "react-router-dom";
import "./AcceptOrder.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const AcceptOrder = () => {
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
        const orderId = localStorage.getItem("order_id");
        console.log("id", orderId);
        if (orderId) {
          // Lưu order_id vào localStorage
          localStorage.setItem("order_id", orderId);
          // Cập nhật trạng thái đơn hàng
          const updateStatusResponse = await axios.put(
            `http://127.0.0.1:8000/orders/change-status/${orderId}?new_status=preparing`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Cập nhật trạng thái thành công:", updateStatusResponse.data);
          const orderInfoResponse = await axios.get(`http://127.0.0.1:8000/orders/info/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Cập nhật thông tin chi tiết đơn hàng
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
          console.log("Thông tin chi tiết đơn hàng:", orderInfoResponse.data);
        } else {
          setError("Không tìm thấy orderId");
        }

      } catch (err) {
        console.error(err);
        setError("Lỗi khi lấy dữ liệu");
      }
    };
    fetchOrderData();
  }, [token]); // Chạy lại khi token thay đổi

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const orderId = orderDetails.order_id;
        if (orderId) {
          const orderItemsResponse = await axios.get(`http://127.0.0.1:8000/orders/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Dữ liệu món ăn:", orderItemsResponse.data);
          // Chuyển đổi dữ liệu từ API thành định dạng mới
          const formattedItems = orderItemsResponse.data.map(item => ({
            name: item.name, // Tên món
            price: `${parseFloat(item.price).toLocaleString()} đ`, // Định dạng giá tiền
            quantity: `x${item.quantity}` // Định dạng số lượng
          }));

          // Cập nhật trạng thái orderItems
          setOrderItems(formattedItems);
        }
      } catch (err) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu đơn hàng:", err);
      }
    };

    fetchOrderItems();
  }, [orderDetails.order_id, token]); // Chạy lại khi order_id hoặc token thay đổi

  const handleButtonClick = () => {
    navigate("/driver-pickupsuccess"); // Điều hướng đến trang /
  };

  const formatCurrency = (number) => {
    return parseFloat(number)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      + "đ";
  };

  const orderId = localStorage.getItem("order_id"); // Token từ localStorage
  return (
    <div className="order-accept">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main >
        <h2>Bạn đã nhận đơn! Hãy di chuyển đến nhà hàng nào!</h2>

        <div className="pickup-box">
          <div className="pickup-from">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 23 22" fill="none">
                  <path d="M10.3181 20.8757C1.61539 12.1105 0 11.211 0 7.9896C0 3.57705 5.14871 0 11.5 0C17.8513 0 23 3.57705 23 7.9896C23 11.211 21.3846 12.1105 12.6819 20.8757C12.1108 21.4489 10.8892 21.4489 10.3181 20.8757ZM11.5 11.3186C14.1464 11.3186 16.2917 9.82817 16.2917 7.9896C16.2917 6.15104 14.1464 4.6606 11.5 4.6606C8.85362 4.6606 6.70833 6.15104 6.70833 7.9896C6.70833 9.82817 8.85362 11.3186 11.5 11.3186Z" fill="#E97522" />
                </svg>
              </span>
              Di chuyển đến: <strong>{orderDetails.restaurant_address}</strong>
            </p>
          </div>

          {/* Bản đồ */}
          <div className="map-container"></div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="order-box">
          <div className="restaurant-info">
            <h3><strong>{orderDetails.restaurant_name} | Mã đơn hàng: {orderId}</strong></h3>
            <OrderItems items={orderItems} />
          </div>
          <hr />
          <div className="cost-if">
            <p>Tổng tạm tính: </p>
            <p>{parseFloat(orderDetails.food_fee).toLocaleString()} đ</p>
          </div>
          <div className="cost-if">
            <p>Chi phí vận chuyển: </p>
            <p>{parseFloat(orderDetails.delivery_fee).toLocaleString()} đ</p>
          </div>
          <div className="cost-if">
            <p><strong>Tổng: </strong></p>
            <p>{
              (parseFloat(orderDetails.food_fee) + parseFloat(orderDetails.delivery_fee)).toLocaleString()
            } đ</p>
          </div>
        </div>

        {/* Thanh toán */}
        <div className="payment-box">
          <p>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                <g clipPath="url(#clip0_3_60)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.21429 0C1.43908 0 0 1.43908 0 3.21429V16.0714C0 17.8466 1.43908 19.2857 3.21429 19.2857H26.7857C28.5609 19.2857 30 17.8466 30 16.0714V3.21429C30 1.43908 28.5609 0 26.7857 0H3.21429ZM16.3392 3.11606C16.3392 2.37639 15.7396 1.77678 15 1.77678C14.2603 1.77678 13.6607 2.37639 13.6607 3.11606V3.97423C12.0277 4.1628 10.7599 5.55019 10.7599 7.23369C10.7599 8.77569 11.8336 10.1097 13.34 10.4392L15.9039 11C16.2874 11.0839 16.5615 11.4242 16.5615 11.8177C16.5615 12.2802 16.1865 12.6548 15.7252 12.6548H14.2748C13.9128 12.6548 13.6012 12.424 13.4858 12.0974C13.2393 11.4 12.4741 11.0345 11.7767 11.2809C11.0793 11.5274 10.7138 12.2926 10.9603 12.99C11.3763 14.1669 12.402 15.0582 13.6607 15.2799V16.1697C13.6607 16.9094 14.2603 17.509 15 17.509C15.7396 17.509 16.3392 16.9094 16.3392 16.1697V15.2799C17.9881 14.9893 19.2401 13.5489 19.2401 11.8177C19.2401 10.1664 18.0904 8.73643 16.4763 8.38335L13.9124 7.82248C13.6357 7.76196 13.4385 7.51693 13.4385 7.23369C13.4385 6.90081 13.7083 6.63096 14.0412 6.63096H15.7252C15.9728 6.63096 16.1938 6.73682 16.3489 6.91007C16.4217 6.99141 16.4781 7.08594 16.5143 7.18839C16.7608 7.88578 17.5259 8.25131 18.2233 8.00481C18.9207 7.75832 19.2862 6.99315 19.0398 6.29576C18.8849 5.85778 18.6465 5.46084 18.3448 5.12368C17.8322 4.55096 17.1312 4.14579 16.3392 4.00599V3.11606ZM5.89286 8.03571C6.78045 8.03571 7.5 8.75526 7.5 9.64286C7.5 10.5304 6.78045 11.25 5.89286 11.25C5.00526 11.25 4.28571 10.5304 4.28571 9.64286C4.28571 8.75526 5.00526 8.03571 5.89286 8.03571ZM24.1071 8.03571C24.9947 8.03571 25.7143 8.75526 25.7143 9.64286C25.7143 10.5304 24.9947 11.25 24.1071 11.25C23.2196 11.25 22.5 10.5304 22.5 9.64286C22.5 8.75526 23.2196 8.03571 24.1071 8.03571ZM9.64286 21.1607C10.3825 21.1607 10.9821 21.7603 10.9821 22.5V26.7857C10.9821 27.5254 10.3825 28.125 9.64286 28.125C8.90318 28.125 8.30357 27.5254 8.30357 26.7857V22.5C8.30357 21.7603 8.90318 21.1607 9.64286 21.1607ZM21.6964 22.5C21.6964 21.7603 21.0968 21.1607 20.3571 21.1607C19.6175 21.1607 19.0179 21.7603 19.0179 22.5V26.7857C19.0179 27.5254 19.6175 28.125 20.3571 28.125C21.0968 28.125 21.6964 27.5254 21.6964 26.7857V22.5ZM16.3393 24.1071C16.3393 23.3674 15.7397 22.7679 15 22.7679C14.2603 22.7679 13.6607 23.3674 13.6607 24.1071V28.3929C13.6607 29.1326 14.2603 29.7321 15 29.7321C15.7397 29.7321 16.3393 29.1326 16.3393 28.3929V24.1071Z" fill="#E97522" />
                </g>
                <defs>
                  <clipPath id="clip0_3_60">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Bạn cần trả cho nhà hàng: <strong>{parseFloat(orderDetails.food_fee).toLocaleString()} đ</strong>
          </p>
        </div>

 
        <div className="action-btn-container">
          <button className="action-btn sucess-btn" onClick={handleButtonClick}>Lấy đơn thành công</button>
        </div>
      </main>
    </div>
  );
};

export default AcceptOrder;
