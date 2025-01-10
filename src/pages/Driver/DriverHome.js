import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import "./DriverHome.css";

const DriverHome = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("waiting"); // Trạng thái: 'waiting', 'found', 'not_found'
  const navigate = useNavigate();

  // Hàm giả lập tìm đơn
  const handleFindOrder = () => {
    setPopupOpen(true); // Hiển thị popup
    setOrderStatus("waiting"); // Đang chờ tìm đơn

    // Giả lập tìm đơn sau 2 giây
    setTimeout(() => {
      const foundOrder = Math.random() > 0.5; // Tìm thấy đơn hay không (50%)
      if (foundOrder) {
        setOrderStatus("found");
      } else {
        setOrderStatus("not_found");
      }
    }, 1000);
  };

  // Đóng popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    setOrderStatus("waiting"); // Reset trạng thái về mặc định
  };

  // Điều hướng tới trang OrderDetails khi nhấn "Xem đơn"
  const handleViewOrder = () => {
    setPopupOpen(false);
    navigate("/orderdetails"); // Điều hướng tới trang chi tiết đơn
  };

  // Tìm lại đơn
  const handleTryAgain = () => {
    setPopupOpen(false); // Đóng popup hiện tại
    handleFindOrder(); // Mở lại popup và tìm đơn
  };

  return (
    <div className="driver-home">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main>
        <h1>Chào Trâm!</h1>
        <p>Bạn đã sẵn sàng cho những chuyến hàng hôm nay chưa?</p>
        <div className="action-btn-container">
          <button className="action-btn" onClick={handleFindOrder}>Chiến thôi!
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <g clipPath="url(#clip0_3_751)">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4286 18.5714H2.85714C1.27919 18.5714 0 17.2922 0 15.7142V7.14279C0 5.56484 1.27919 4.28564 2.85714 4.28564H11.4286C13.0065 4.28564 14.2857 5.56484 14.2857 7.14279V15.7142C14.2857 17.2922 13.0065 18.5714 11.4286 18.5714ZM22.8571 6.4285C21.6737 6.4285 20.7143 7.3879 20.7143 8.57136C20.7143 9.75482 21.6737 10.7142 22.8571 10.7142H25V30.6028C26.2885 29.3422 28.052 28.5653 29.9969 28.5653C33.9434 28.5653 37.1429 31.7645 37.1429 35.7111C37.1429 35.8742 37.1374 36.0359 37.1266 36.1962C38.916 35.5688 40 33.7305 40 31.4285C40 25.9236 35.4843 21.0815 29.2857 20.7341V17.998C29.916 18.3626 30.648 18.5714 31.4286 18.5714H34.2857C35.0746 18.5714 35.7143 17.9318 35.7143 17.1428V11.4285C35.7143 10.6395 35.0746 9.99993 34.2857 9.99993H31.4286C30.648 9.99993 29.916 10.2086 29.2857 10.5733V8.57136C29.2857 7.3879 28.3263 6.4285 27.1429 6.4285H22.8571ZM22.8866 36.4285C22.8631 36.1925 22.8511 35.9534 22.8511 35.7111C22.8511 34.4114 23.198 33.1928 23.8044 32.1428H23.5714C22.388 32.1428 21.4286 31.1834 21.4286 29.9999V28.5714C21.4286 24.232 17.9108 20.7142 13.5714 20.7142H7.85714C3.51777 20.7142 0 24.232 0 28.5714V34.2856C0 35.4691 0.959389 36.4285 2.14286 36.4285H2.8866C2.86309 36.1925 2.85104 35.9534 2.85104 35.7111C2.85104 31.7645 6.05037 28.5653 9.99691 28.5653C13.9435 28.5653 17.1428 31.7645 17.1428 35.7111C17.1428 35.9534 17.1308 36.1925 17.1073 36.4285H22.8866ZM5.70823 35.7111C5.70823 38.0799 7.62837 39.9999 9.99697 39.9999C12.3656 39.9999 14.2857 38.0799 14.2857 35.7111C14.2857 33.3425 12.3656 31.4225 9.99697 31.4225C7.62837 31.4225 5.70823 33.3425 5.70823 35.7111ZM25.7083 35.7111C25.7083 38.0796 27.6284 39.9999 29.9969 39.9999C32.3657 39.9999 34.2857 38.0796 34.2857 35.7111C34.2857 33.3425 32.3657 31.4225 29.9969 31.4225C27.6284 31.4225 25.7083 33.3425 25.7083 35.7111Z" fill="#F5F5F5" />
              </g>
              <defs>
                <clipPath id="clip0_3_751">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        {/* Popup */}
        {isPopupOpen && (
          <Popup onClose={handleClosePopup}>
            {orderStatus === "waiting" && (
              <div>
                <h2>Đang tìm đơn...</h2>
                <p>Hãy chờ để nhận đơn!</p>
                <div className="spinner"></div>
              </div>
            )}

            {orderStatus === "found" && (
              <div>
                <h2>Đã tìm thấy đơn hàng phù hợp!</h2>
                <p>Thông tin đơn hàng sẵn sàng để xem.</p>
                <button className="view-order-btn" onClick={handleViewOrder}>
                  Xem đơn
                </button>
              </div>
            )}

            {orderStatus === "not_found" && (
              <div>
                <h2>Chưa tìm thấy đơn phù hợp.</h2>
                <p>Bạn có muốn tiếp tục tìm đơn?</p>
                <div className="popup-buttons">
                  <button className="stop-btn" onClick={handleClosePopup}>
                    Dừng lại
                  </button>
                  <button className="try-again-btn" onClick={handleTryAgain}>
                    Tìm đơn
                  </button>
                </div>
              </div>
            )}
          </Popup>
        )}
      </main>
    </div>
  );
};

export default DriverHome;
