import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const OrderDetails = () => {
  const [isOrderAvailable, setIsOrderAvailable] = useState(false); // Trạng thái kiểm tra có đơn hàng hay không
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái chờ dữ liệu
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token"); // Token từ localStorage

  const [orderDetails, setOrderDetails] = useState({
    restaurant_address: null,
    address: null,
    distance: null,
    food_fee: null,
    delivery_fee: null,
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderId = localStorage.getItem("order_id")
        if (orderId != null) {
          setIsOrderAvailable(true)
        }
        if (orderId) {
          // Gọi API orders/info/${orderId} để lấy thông tin chi tiết
          const orderInfoResponse = await axios
            .get(`http://127.0.0.1:8000/orders/info/${orderId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          setOrderDetails(orderInfoResponse.data);
          console.log(orderDetails);
        } else {
          setError("Không tìm thấy orderId");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi khi lấy dữ liệu");
      }finally{
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [token]);


  const handleReject = () => {
    navigate("/driver-home"); // Điều hướng đến trang /home
  };

  const handleAccept = () => {
    navigate("/driver-orderaccept"); // Điều hướng đến trang /
  };

  if (loading) {
    return (
      <div className="order-details-fail">
        <Header />
        <Sidebar />
        <main>
          <p>Đang tải thông tin đơn hàng...</p>
        </main>
      </div>
    );
  }

  if (!isOrderAvailable) {
    return (
      <div className="order-details-fail">
        <Header />
        <Sidebar />
        <main>
          <p className="no-order-message">Hiện chưa có đơn hàng nào.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="order-details">
      <Header />
      <Sidebar />

      <main >
        <h2>Tóm tắt thông tin đơn hàng</h2>
        <div className="order-summary-box">
          <div className="order-from">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 26 18" fill="none">
                  <path d="M1.86013 8.44082V12.0644C1.86013 15.688 4.11013 17.1406 9.72263 17.1406H16.4601C22.0726 17.1406 24.3226 15.688 24.3226 12.0644V8.44082M13.0976 9.07031C15.3851 9.07031 17.0726 7.86783 16.8476 6.39097L16.0226 1H10.1851L9.34763 6.39097C9.12263 7.86783 10.8101 9.07031 13.0976 9.07031ZM20.9851 9.07031C23.5101 9.07031 25.3601 7.74678 25.1101 6.12465L24.7601 3.90531C24.3101 1.80703 23.0601 1 19.7851 1H15.9726L16.8476 6.65729C17.0601 7.98889 18.9226 9.07031 20.9851 9.07031ZM5.14763 9.07031C7.21013 9.07031 9.07263 7.98889 9.27263 6.65729L10.1476 1H6.33513C3.06013 1 1.81013 1.80703 1.36013 3.90531L1.02263 6.12465C0.772631 7.74678 2.62263 9.07031 5.14763 9.07031ZM13.0976 13.1055C11.0101 13.1055 9.97263 13.7753 9.97263 15.123V17.1406H16.2226V15.123C16.2226 13.7753 15.1851 13.1055 13.0976 13.1055Z" stroke="#E97522" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Từ: <strong>{orderDetails.restaurant_address}</strong>
            </p>
          </div>
          <hr />
          <div className="order-info">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 23 22" fill="none">
                  <path d="M10.3181 20.8757C1.61539 12.1105 0 11.211 0 7.9896C0 3.57705 5.14871 0 11.5 0C17.8513 0 23 3.57705 23 7.9896C23 11.211 21.3846 12.1105 12.6819 20.8757C12.1108 21.4489 10.8892 21.4489 10.3181 20.8757ZM11.5 11.3186C14.1464 11.3186 16.2917 9.82817 16.2917 7.9896C16.2917 6.15104 14.1464 4.6606 11.5 4.6606C8.85362 4.6606 6.70833 6.15104 6.70833 7.9896C6.70833 9.82817 8.85362 11.3186 11.5 11.3186Z" fill="#E97522" />
                </svg>
              </span> {" "}
              Giao đến: <strong>{orderDetails.address}</strong>
            </p>
            <div className="order-distance">
              <p>
                <strong>{orderDetails.distance} km - {(parseFloat(orderDetails.delivery_fee) * 0.8).toLocaleString()} đ</strong>
              </p>
            </div>
          </div>
          <hr />
          <div className="cost-info">
            <p>Tổng tạm tính: </p>
            <p>{parseFloat(orderDetails.food_fee).toLocaleString()} đ</p>
          </div>
          <div className="cost-info">
            <p>Chi phí vận chuyển: </p>
            <p>{parseFloat(orderDetails.delivery_fee).toLocaleString()} đ</p>
          </div>
          <div className="cost-info">
            <p><strong>Tổng: </strong></p>
            <p>{
              (parseFloat(orderDetails.food_fee) + parseFloat(orderDetails.delivery_fee)).toLocaleString()
            } đ</p>
          </div>
          <hr />
          <div className="payment-method">
            <p>
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="none">
                  <g clipPath="url(#clip0_3_60)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.21429 0C1.43908 0 0 1.43908 0 3.21429V16.0714C0 17.8466 1.43908 19.2857 3.21429 19.2857H26.7857C28.5609 19.2857 30 17.8466 30 16.0714V3.21429C30 1.43908 28.5609 0 26.7857 0H3.21429ZM16.3392 3.11606C16.3392 2.37639 15.7396 1.77678 15 1.77678C14.2603 1.77678 13.6607 2.37639 13.6607 3.11606V3.97423C12.0277 4.1628 10.7599 5.55019 10.7599 7.23369C10.7599 8.77569 11.8336 10.1097 13.34 10.4392L15.9039 11C16.2874 11.0839 16.5615 11.4242 16.5615 11.8177C16.5615 12.2802 16.1865 12.6548 15.7252 12.6548H14.2748C13.9128 12.6548 13.6012 12.424 13.4858 12.0974C13.2393 11.4 12.4741 11.0345 11.7767 11.2809C11.0793 11.5274 10.7138 12.2926 10.9603 12.99C11.3763 14.1669 12.402 15.0582 13.6607 15.2799V16.1697C13.6607 16.9094 14.2603 17.509 15 17.509C15.7396 17.509 16.3392 16.9094 16.3392 16.1697V15.2799C17.9881 14.9893 19.2401 13.5489 19.2401 11.8177C19.2401 10.1664 18.0904 8.73643 16.4763 8.38335L13.9124 7.82248C13.6357 7.76196 13.4385 7.51693 13.4385 7.23369C13.4385 6.90081 13.7083 6.63096 14.0412 6.63096H15.7252C15.9728 6.63096 16.1938 6.73682 16.3489 6.91007C16.4217 6.99141 16.4781 7.08594 16.5143 7.18839C16.7608 7.88578 17.5259 8.25131 18.2233 8.00481C18.9207 7.75832 19.2862 6.99315 19.0398 6.29576C18.8849 5.85778 18.6465 5.46084 18.3448 5.12368C17.8322 4.55096 17.1312 4.14579 16.3392 4.00599V3.11606ZM5.89286 8.03571C6.78045 8.03571 7.5 8.75526 7.5 9.64286C7.5 10.5304 6.78045 11.25 5.89286 11.25C5.00526 11.25 4.28571 10.5304 4.28571 9.64286C4.28571 8.75526 5.00526 8.03571 5.89286 8.03571ZM24.1071 8.03571C24.9947 8.03571 25.7143 8.75526 25.7143 9.64286C25.7143 10.5304 24.9947 11.25 24.1071 11.25C23.2196 11.25 22.5 10.5304 22.5 9.64286C22.5 8.75526 23.2196 8.03571 24.1071 8.03571ZM9.64286 21.1607C10.3825 21.1607 10.9821 21.7603 10.9821 22.5V26.7857C10.9821 27.5254 10.3825 28.125 9.64286 28.125C8.90318 28.125 8.30357 27.5254 8.30357 26.7857V22.5C8.30357 21.7603 8.90318 21.1607 9.64286 21.1607ZM21.6964 22.5C21.6964 21.7603 21.0968 21.1607 20.3571 21.1607C19.6175 21.1607 19.0179 21.7603 19.0179 22.5V26.7857C19.0179 27.5254 19.6175 28.125 20.3571 28.125C21.0968 28.125 21.6964 27.5254 21.6964 26.7857V22.5ZM16.3393 24.1071C16.3393 23.3674 15.7397 22.7679 15 22.7679C14.2603 22.7679 13.6607 23.3674 13.6607 24.1071V28.3929C13.6607 29.1326 14.2603 29.7321 15 29.7321C15.7397 29.7321 16.3393 29.1326 16.3393 28.3929V24.1071Z" fill="#E97522" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_60">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span> Phương thức thanh toán:{" "}
              <strong>Tiền mặt</strong>
            </p>
          </div>
        </div>

        <div className="action-btn-container">
          <button className="action-btn reject-btn" onClick={handleReject}>Từ chối</button>
          <button className="action-btn accept-btn" onClick={handleAccept}>Nhận đơn</button>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;