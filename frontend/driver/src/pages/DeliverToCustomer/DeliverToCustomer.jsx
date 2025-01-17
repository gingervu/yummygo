import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import OrderItems from "../../components/OrderItems/OrderItems";
import { useNavigate } from "react-router-dom";
import "./DeliverToCustomer.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const DeliverToCustomer = () => {
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
          `http://127.0.0.1:8000/orders/change-status/${orderId}?new_status=delivered`,
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

useEffect(() => {
  const fetchOrderItems = async () => {
    try {
      
      const orderId = localStorage.getItem("order_id"); // Get orderId from localStorage

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
    navigate("/driver/deliverysuccess"); // Điều hướng đến trang /
  };

  const formatCurrency = (number) => {
    return parseFloat(number)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      + "đ";
  };


  return (
    <div className="deliver-to-customer">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main >
        <h2>Bạn hãy giao đơn cho khách hàng thôi!</h2>

        {/* Thông tin đơn hàng */}
        <div className="order-info-box">
          <div className="restaurant-info">
            <h3><strong>{orderDetails.restaurant_name} | Mã đơn hàng: 1234</strong></h3>
            <OrderItems items={orderItems} />
          </div>
          <hr />
          <div className="cost-if">
            <p>Tổng tạm tính: </p>
            <p>{orderDetails.food_fee}</p>
          </div>
          <div className="cost-if">
            <p>Chi phí vận chuyển: </p>
            <p>{orderDetails.delivery_fee}</p>
          </div>
          <div className="cost-if">
            <p><strong>Tổng: </strong></p>
            <p>{formatCurrency(
              parseFloat(orderDetails.food_fee) + parseFloat(orderDetails.delivery_fee)
            )}</p>
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
            Bạn cần thu của khách hàng: <strong>{formatCurrency(
              parseFloat(orderDetails.food_fee) + parseFloat(orderDetails.delivery_fee)
            )}</strong>
          </p>
        </div>

        {/* Liên hệ */}
        <div className="contact-box">
          {/* Liên hệ với nhà hàng */}
          <div className="contact-section">
            <span>Liên hệ với nhà hàng:</span>
            <div className="contact-buttons">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_3_578)">
                    <path d="M1.08477 7.38497C0.494341 6.4699 0.237053 5.37946 0.356195 4.297C0.475195 3.21454 0.963339 2.20608 1.73848 1.44121L2.39234 0.772539C2.6922 0.479387 3.09491 0.315247 3.5142 0.315247C3.93362 0.315247 4.33634 0.479387 4.6362 0.772539L7.44455 3.61068C7.73678 3.90803 7.90052 4.30824 7.90052 4.72514C7.90052 5.14204 7.73678 5.54226 7.44455 5.8396C7.15141 6.13945 6.98727 6.54214 6.98727 6.96148C6.98727 7.38083 7.15141 7.78351 7.44455 8.08337L11.9024 12.5412C12.0489 12.6899 12.2236 12.808 12.4162 12.8886C12.6088 12.9692 12.8155 13.0107 13.0243 13.0107C13.2331 13.0107 13.4398 12.9692 13.6324 12.8886C13.825 12.808 13.9996 12.6899 14.1462 12.5412C14.4435 12.249 14.8437 12.0852 15.2606 12.0852C15.6775 12.0852 16.0777 12.249 16.3751 12.5412L19.1983 15.3644C19.4915 15.6643 19.6556 16.067 19.6556 16.4864C19.6556 16.9057 19.4915 17.3084 19.1983 17.6083L18.5297 18.262C17.7648 19.0371 16.7564 19.5253 15.6739 19.6444C14.5914 19.7634 13.501 19.5063 12.5859 18.9159C8.05271 15.8399 4.14905 11.9261 1.08477 7.38497Z" fill="#F5F5F5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_578">
                      <rect width="20" height="20" fill="white" transform="matrix(0 1 -1 0 20 0)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_3_573)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.3146 1.05096C12.9678 0.402068 11.492 0.0655036 9.99705 0.0663545C8.20026 0.0669515 6.43706 0.55488 4.89565 1.47817C3.35416 2.40151 2.09199 3.72567 1.24356 5.30961C0.39513 6.89356 -0.00778304 8.67797 0.0777354 10.4728C0.157364 12.144 0.65768 13.766 1.52961 15.1893L0.109277 18.9681C0.0188284 19.2087 0.0646741 19.4794 0.229321 19.6769C0.393967 19.8743 0.652013 19.968 0.904991 19.9223L5.85639 19.027C7.14113 19.6171 8.53793 19.9266 9.95352 19.9336C11.4485 19.941 12.9259 19.6109 14.2755 18.9679C15.6251 18.3247 16.8123 17.3854 17.7483 16.2197C18.6843 15.054 19.3451 13.6921 19.6816 12.2354C20.018 10.7788 20.0213 9.26497 19.6913 7.80686C19.3611 6.34876 18.7063 4.98396 17.7753 3.8142C16.8444 2.64444 15.6614 1.69989 14.3146 1.05096Z" fill="#F5F5F5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_573">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* Liên hệ với khách hàng */}
          <div className="contact-section">
            <span>Liên hệ với khách hàng:</span>
            <div className="contact-buttons">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_3_578)">
                    <path d="M1.08477 7.38497C0.494341 6.4699 0.237053 5.37946 0.356195 4.297C0.475195 3.21454 0.963339 2.20608 1.73848 1.44121L2.39234 0.772539C2.6922 0.479387 3.09491 0.315247 3.5142 0.315247C3.93362 0.315247 4.33634 0.479387 4.6362 0.772539L7.44455 3.61068C7.73678 3.90803 7.90052 4.30824 7.90052 4.72514C7.90052 5.14204 7.73678 5.54226 7.44455 5.8396C7.15141 6.13945 6.98727 6.54214 6.98727 6.96148C6.98727 7.38083 7.15141 7.78351 7.44455 8.08337L11.9024 12.5412C12.0489 12.6899 12.2236 12.808 12.4162 12.8886C12.6088 12.9692 12.8155 13.0107 13.0243 13.0107C13.2331 13.0107 13.4398 12.9692 13.6324 12.8886C13.825 12.808 13.9996 12.6899 14.1462 12.5412C14.4435 12.249 14.8437 12.0852 15.2606 12.0852C15.6775 12.0852 16.0777 12.249 16.3751 12.5412L19.1983 15.3644C19.4915 15.6643 19.6556 16.067 19.6556 16.4864C19.6556 16.9057 19.4915 17.3084 19.1983 17.6083L18.5297 18.262C17.7648 19.0371 16.7564 19.5253 15.6739 19.6444C14.5914 19.7634 13.501 19.5063 12.5859 18.9159C8.05271 15.8399 4.14905 11.9261 1.08477 7.38497Z" fill="#F5F5F5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_578">
                      <rect width="20" height="20" fill="white" transform="matrix(0 1 -1 0 20 0)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_3_573)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.3146 1.05096C12.9678 0.402068 11.492 0.0655036 9.99705 0.0663545C8.20026 0.0669515 6.43706 0.55488 4.89565 1.47817C3.35416 2.40151 2.09199 3.72567 1.24356 5.30961C0.39513 6.89356 -0.00778304 8.67797 0.0777354 10.4728C0.157364 12.144 0.65768 13.766 1.52961 15.1893L0.109277 18.9681C0.0188284 19.2087 0.0646741 19.4794 0.229321 19.6769C0.393967 19.8743 0.652013 19.968 0.904991 19.9223L5.85639 19.027C7.14113 19.6171 8.53793 19.9266 9.95352 19.9336C11.4485 19.941 12.9259 19.6109 14.2755 18.9679C15.6251 18.3247 16.8123 17.3854 17.7483 16.2197C18.6843 15.054 19.3451 13.6921 19.6816 12.2354C20.018 10.7788 20.0213 9.26497 19.6913 7.80686C19.3611 6.34876 18.7063 4.98396 17.7753 3.8142C16.8444 2.64444 15.6614 1.69989 14.3146 1.05096Z" fill="#F5F5F5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_573">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* Trung tâm trợ giúp */}
          <div className="contact-section">
            <span>Trung tâm trợ giúp:</span>
            <div className="contact-buttons">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_3_638)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 10C20 15.5229 15.5229 20 10 20C4.47716 20 0 15.5229 0 10C0 4.47716 4.47716 0 10 0C15.5229 0 20 4.47716 20 10ZM8.21429 7.5C8.21429 6.51377 9.01377 5.71429 10 5.71429C10.9862 5.71429 11.7857 6.51377 11.7857 7.5C11.7857 8.48623 10.9862 9.28571 10 9.28571C9.40827 9.28571 8.92857 9.76542 8.92857 10.3571V11.2807C8.92857 11.8724 9.40827 12.3521 10 12.3521C10.5917 12.3521 11.0714 11.8724 11.0714 11.2807C12.7204 10.8143 13.9286 9.29826 13.9286 7.5C13.9286 5.33031 12.1697 3.57143 10 3.57143C7.83031 3.57143 6.07143 5.33031 6.07143 7.5C6.07143 8.09173 6.55113 8.57143 7.14286 8.57143C7.73459 8.57143 8.21429 8.09173 8.21429 7.5ZM11.4286 15C11.4286 15.789 10.789 16.4286 10 16.4286C9.21101 16.4286 8.57143 15.789 8.57143 15C8.57143 14.211 9.21101 13.5714 10 13.5714C10.789 13.5714 11.4286 14.211 11.4286 15Z" fill="#F5F5F5" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3_638">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="action-btn-container">
          <button className="action-btn sucess-btn" onClick={handleButtonClick}>Giao hàng thành công</button>
        </div>
      </main>
    </div>
  );
};

export default DeliverToCustomer;
