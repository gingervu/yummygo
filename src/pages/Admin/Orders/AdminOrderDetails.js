import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import OrderItems from "../../../components/OrderItems/OrderItems";
import ChatPopup from "../../../components/ChatPopup/ChatPopup";
import "./AdminOrderDetails.css";
import BackPage from "../../../components/BackPage/BackPage";


const AdminOrderDetails = () => {
  const { order_id } = useParams(); 
  const [isOpen, setIsOpen] = useState(false); // state to track if the popup is open
  const toggleChat = () => {
    setIsOpen(!isOpen); // Toggle the popup visibility
  };
  const [order, setOrder] = useState([]); // Lưu thông tin chi tiết đơn hàng
  const [orderInfo, setOrderInfo] = useState([]); // Lưu thông tin chi tiết đơn hàng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("access_token");
  // const orderItems = [
  //   { name: "Tên món 1", price: "40.000 đ", quantity: "x1" },
  //   { name: "Tên món 2", price: "30.000 đ", quantity: "x2" },
  //   // Thêm các món khác nếu cần
  // ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
    .get(`http://localhost:8000/orders/${order_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Thông tin chi tiết đơn hàng:", response.data);
      setOrder(response.data);
    })
    .catch((error) => {
      console.error("Có lỗi khi lấy chi tiết đơn hàng:", error);
      setError("Không thể lấy thông tin chi tiết đơn hàng.");
    })
    .finally(() => {
      setLoading(false);
    });
    axios
    .get(`http://localhost:8000/orders/info/${order_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Thông tin chi tiết đơn hàng:", response.data);
      setOrderInfo(response.data);
    })
    .catch((error) => {
      console.error("Có lỗi khi lấy chi tiết đơn hàng:", error);
      setError("Không thể lấy thông tin chi tiết đơn hàng.");
    })
    .finally(() => {
      setLoading(false);
    });
  }, [order_id]);





const total = 0;
  return (

    <div className="admin-order-details">
      <Header />
      <Sidebar />
      
      <main>
        <h2>Chi tiết đơn hàng {order_id}</h2>
        <table>
          <thead>
            <tr>
              <th>Mã món</th>
              <th>Tên món</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.name}</td> 
                <td>{item.price} VND</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Tổng tiền: {order.reduce((total, item) => total + item.price * item.quantity, 0)} VND</h3>

        <div className="driver-contact">
          <div className="driver-info">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <g opacity="0.7">
                  <rect width="40" height="40" rx="20" fill="#EADDFF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.0002 16C26.0002 19.3137 23.314 22 20.0002 22C16.6865 22 14.0002 19.3137 14.0002 16C14.0002 12.6863 16.6865 10 20.0002 10C23.314 10 26.0002 12.6863 26.0002 16ZM24.0002 16C24.0002 18.2091 22.2094 20 20.0002 20C17.7911 20 16.0002 18.2091 16.0002 16C16.0002 13.7909 17.7911 12 20.0002 12C22.2094 12 24.0002 13.7909 24.0002 16Z" fill="#4F378A" />
                  <path d="M20.0002 25C13.5259 25 8.00952 28.8284 5.9082 34.192C6.4201 34.7004 6.95934 35.1812 7.52353 35.6321C9.08827 30.7077 13.997 27 20.0002 27C26.0035 27 30.9122 30.7077 32.477 35.6321C33.0412 35.1812 33.5804 34.7004 34.0923 34.1921C31.991 28.8284 26.4746 25 20.0002 25Z" fill="#4F378A" />
                </g>
              </svg>
            </span>
            <p className="name">{orderInfo.driver_name}</p>
          </div>
          <div className="action">
            <button className="chat-btn" onClick={toggleChat}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M23.75 13.125V7.5C23.75 6.11929 22.6307 5 21.25 5H6.25C4.86929 5 3.75 6.11929 3.75 7.5V17.2826C3.75 18.6633 4.86929 19.7826 6.25 19.7826H8.20652V25L13.4239 19.7826H13.75M20.2038 22.9891L23.4647 26.25V22.9891H23.75C25.1307 22.9891 26.25 21.8698 26.25 20.4891V16.25C26.25 14.8693 25.1307 13.75 23.75 13.75H16.25C14.8693 13.75 13.75 14.8693 13.75 16.25V20.4891C13.75 21.8698 14.8693 22.9891 16.25 22.9891H20.2038Z" stroke="#686562" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Chat với tài xế</span></button>
                <ChatPopup isOpen={isOpen} toggleChat={toggleChat} />
            <div className="call-btn">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <g clipPath="url(#clip0_97_609)">
                    <path d="M1.95256 13.2929C0.889786 11.6458 0.42667 9.68302 0.641129 7.7346C0.855328 5.78617 1.73399 3.97095 3.12924 2.59418L4.30618 1.39057C4.84593 0.862896 5.57081 0.567444 6.32553 0.567444C7.0805 0.567444 7.80539 0.862896 8.34513 1.39057L13.4002 6.49923C13.9262 7.03445 14.2209 7.75483 14.2209 8.50525C14.2209 9.25567 13.9262 9.97606 13.4002 10.5113C12.8725 11.051 12.5771 11.7759 12.5771 12.5307C12.5771 13.2855 12.8725 14.0103 13.4002 14.5501L21.4243 22.5741C21.688 22.8418 22.0024 23.0544 22.3491 23.1995C22.6958 23.3446 23.0678 23.4193 23.4437 23.4193C23.8195 23.4193 24.1915 23.3446 24.5382 23.1995C24.8849 23.0544 25.1992 22.8418 25.463 22.5741C25.9983 22.0481 26.7187 21.7534 27.4691 21.7534C28.2195 21.7534 28.9399 22.0481 29.4751 22.5741L34.557 27.656C35.0847 28.1957 35.3801 28.9206 35.3801 29.6756C35.3801 30.4303 35.0847 31.1552 34.557 31.6949L33.3534 32.8716C31.9766 34.2669 30.1614 35.1455 28.213 35.36C26.2646 35.5742 24.3018 35.1113 22.6546 34.0485C14.4949 28.5117 7.46827 21.467 1.95256 13.2929Z" fill="#686562" />
                  </g>
                  <defs>
                    <clipPath id="clip0_97_609">
                      <rect width="36" height="36" fill="white" transform="matrix(0 1 -1 0 36 0)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </main>



      {/* <main>
       <div className="back">
      <BackPage to="/admin-orders" />
      </div>
        <h2>Chi tiết đơn hàng</h2>

        <div className="order-id">
          <p>Mã đơn: </p>
        </div>

        <div className="driver-contact">
          <div className="driver-info">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <g opacity="0.7">
                  <rect width="40" height="40" rx="20" fill="#EADDFF" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.0002 16C26.0002 19.3137 23.314 22 20.0002 22C16.6865 22 14.0002 19.3137 14.0002 16C14.0002 12.6863 16.6865 10 20.0002 10C23.314 10 26.0002 12.6863 26.0002 16ZM24.0002 16C24.0002 18.2091 22.2094 20 20.0002 20C17.7911 20 16.0002 18.2091 16.0002 16C16.0002 13.7909 17.7911 12 20.0002 12C22.2094 12 24.0002 13.7909 24.0002 16Z" fill="#4F378A" />
                  <path d="M20.0002 25C13.5259 25 8.00952 28.8284 5.9082 34.192C6.4201 34.7004 6.95934 35.1812 7.52353 35.6321C9.08827 30.7077 13.997 27 20.0002 27C26.0035 27 30.9122 30.7077 32.477 35.6321C33.0412 35.1812 33.5804 34.7004 34.0923 34.1921C31.991 28.8284 26.4746 25 20.0002 25Z" fill="#4F378A" />
                </g>
              </svg>
            </span>
            <p className="name">Nguyễn Văn A</p>
          </div>
          <div className="action">
            <button className="chat-btn" onClick={toggleChat}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path d="M23.75 13.125V7.5C23.75 6.11929 22.6307 5 21.25 5H6.25C4.86929 5 3.75 6.11929 3.75 7.5V17.2826C3.75 18.6633 4.86929 19.7826 6.25 19.7826H8.20652V25L13.4239 19.7826H13.75M20.2038 22.9891L23.4647 26.25V22.9891H23.75C25.1307 22.9891 26.25 21.8698 26.25 20.4891V16.25C26.25 14.8693 25.1307 13.75 23.75 13.75H16.25C14.8693 13.75 13.75 14.8693 13.75 16.25V20.4891C13.75 21.8698 14.8693 22.9891 16.25 22.9891H20.2038Z" stroke="#686562" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Chat với tài xế</span></button>
                <ChatPopup isOpen={isOpen} toggleChat={toggleChat} />
            <div className="call-btn">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <g clipPath="url(#clip0_97_609)">
                    <path d="M1.95256 13.2929C0.889786 11.6458 0.42667 9.68302 0.641129 7.7346C0.855328 5.78617 1.73399 3.97095 3.12924 2.59418L4.30618 1.39057C4.84593 0.862896 5.57081 0.567444 6.32553 0.567444C7.0805 0.567444 7.80539 0.862896 8.34513 1.39057L13.4002 6.49923C13.9262 7.03445 14.2209 7.75483 14.2209 8.50525C14.2209 9.25567 13.9262 9.97606 13.4002 10.5113C12.8725 11.051 12.5771 11.7759 12.5771 12.5307C12.5771 13.2855 12.8725 14.0103 13.4002 14.5501L21.4243 22.5741C21.688 22.8418 22.0024 23.0544 22.3491 23.1995C22.6958 23.3446 23.0678 23.4193 23.4437 23.4193C23.8195 23.4193 24.1915 23.3446 24.5382 23.1995C24.8849 23.0544 25.1992 22.8418 25.463 22.5741C25.9983 22.0481 26.7187 21.7534 27.4691 21.7534C28.2195 21.7534 28.9399 22.0481 29.4751 22.5741L34.557 27.656C35.0847 28.1957 35.3801 28.9206 35.3801 29.6756C35.3801 30.4303 35.0847 31.1552 34.557 31.6949L33.3534 32.8716C31.9766 34.2669 30.1614 35.1455 28.213 35.36C26.2646 35.5742 24.3018 35.1113 22.6546 34.0485C14.4949 28.5117 7.46827 21.467 1.95256 13.2929Z" fill="#686562" />
                  </g>
                  <defs>
                    <clipPath id="clip0_97_609">
                      <rect width="36" height="36" fill="white" transform="matrix(0 1 -1 0 36 0)" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="order-info-box">
          <OrderItems items={orderItems} />
          <div className="cost-if">
            <p><strong>Tổng: </strong></p>
            <p>130.000 đ</p>
          </div>
        </div>

        <div className="contact-box">
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
        </div>

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
            Phương thức thanh toán: <strong>Tiền mặt</strong>
          </p>
        </div>

        <div className="note-box">
          <p>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M11.6667 2.91666V7.29166M23.3333 2.91666V7.29166M10.2083 18.9583H21.875M10.2083 24.7917H17.5M23.3333 5.10416C28.1896 5.36666 30.625 7.21874 30.625 14.0729V23.0854C30.625 29.0937 29.1667 32.0979 21.875 32.0979H13.125C5.83333 32.0979 4.375 29.0937 4.375 23.0854V14.0729C4.375 7.21874 6.81042 5.38124 11.6667 5.10416H23.3333Z" stroke="#E97522" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Sốp không hành giúp em ạ
          </p>
        </div>

        
      </main> */}
    </div>
  );
};

export default AdminOrderDetails;