// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../services/axiosConfig';

// const PlaceOrder = () => {
//   const { orderId } = useParams(); // Lấy orderId từ URL
//   const navigate = useNavigate(); // Dùng để điều hướng sau khi xử lý
//   const token = localStorage.getItem('access_token');

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [orderFee, setOrderFee] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails(orderId);
//     }
//   }, [orderId]);

//   // Lấy thông tin chi tiết đơn hàng
//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setOrderDetails(response.data);
//         fetchOrderFee(orderId); // Lấy phí đơn hàng
//       } else {
//         console.error('Không lấy được thông tin đơn hàng:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy thông tin đơn hàng:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Lấy phí đơn hàng
//   const fetchOrderFee = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/food-fee/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setOrderFee(response.data);
//       } else {
//         console.error('Không lấy được phí đơn hàng:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy phí đơn hàng:', error);
//     }
//   };

//   // Gửi đơn hàng
//   const sendOrder = async () => {
//     try {
//       const response = await axiosInstance.post(
//         `customers/send-order/${orderId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Đơn hàng đã được gửi thành công!');
//         navigate('/orders'); // Điều hướng tới danh sách đơn hàng
//       } else {
//         console.error('Gửi đơn hàng thất bại:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi gửi đơn hàng:', error);
//     }
//   };

//   // Hủy đơn hàng
//   const cancelOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.put(`/orders/cancel/${orderId}`, null, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
  
//       if (response.status === 200) {
//         alert("Đơn hàng đã được hủy thành công.");
//         // Cập nhật giao diện hoặc chuyển hướng nếu cần
//       } else {
//         console.error("Không thể hủy đơn hàng:", response.status);
//       }
//     } catch (error) {
//       console.error("Lỗi khi hủy đơn hàng:", error);
//     }
//   };
  

//   // Cập nhật thông tin đơn hàng
//   const updateOrder = async () => {
//     try {
//       const response = await axiosInstance.patch(
//         `orders/update`,
//         {
//           order_id: orderId,
//           // Dữ liệu cập nhật tùy ý (ví dụ: thêm thông tin địa chỉ)
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Cập nhật đơn hàng thành công!');
//         fetchOrderDetails(orderId); // Làm mới thông tin đơn hàng sau khi cập nhật
//       } else {
//         console.error('Cập nhật đơn hàng thất bại:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi cập nhật đơn hàng:', error);
//     }
//   };

//   if (isLoading) {
//     return <p>Đang tải...</p>;
//   }

//   if (!orderDetails) {
//     return <p>Không tìm thấy thông tin đơn hàng.</p>;
//   }

//   return (
//     <div>
//       <h2>Chi tiết đơn hàng</h2>
//       <ul>
//         {orderDetails.map((item, index) => (
//           <li key={index}>
//             <p>
//               {`Món ăn: ${item.item_name}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}
//             </p>
//           </li>
//         ))}
//         <li>
//           <p>{`Phí đơn hàng: ${orderFee} VND`}</p>
//         </li>
//       </ul>
//       <h3>{`Tổng giá: ${orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) + orderFee} VND`}</h3>
//       <div>
//         <button onClick={updateOrder}>Cập nhật đơn hàng</button>
//         <button onClick={cancelOrder}>Hủy đơn hàng</button>
//         <button onClick={sendOrder}>Gửi đơn hàng</button>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../services/axiosConfig';
// import AddressOrder from '../../components/AddressOrder/AddressOrder';
// import './PlaceOrder.css';

// const PlaceOrder = () => {
//   const { orderId } = useParams(); // Lấy orderId từ URL
//   const navigate = useNavigate(); // Dùng để điều hướng sau khi xử lý
//   const token = localStorage.getItem('access_token');

//   const [orderDetails, setOrderDetails] = useState(null);
//   const [orderFee, setOrderFee] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [formData, setFormData] = useState({ address: '', note: '' });
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     if (orderId) {
//       fetchOrderDetails(orderId);
//     }
//   }, [orderId]);

//   // Lấy thông tin chi tiết đơn hàng
//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setOrderDetails(response.data);
//         fetchOrderFee(orderId); // Lấy phí đơn hàng
//       } else {
//         console.error('Không lấy được thông tin đơn hàng:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy thông tin đơn hàng:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Lấy phí đơn hàng
//   const fetchOrderFee = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/food-fee/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setOrderFee(response.data);
//       } else {
//         console.error('Không lấy được phí đơn hàng:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy phí đơn hàng:', error);
//     }
//   };

//   // Cập nhật thông tin đơn hàng
//   const updateOrder = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `orders/update/${orderId}`,
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Cập nhật đơn hàng thành công!');
//         fetchOrderDetails(orderId); // Làm mới thông tin đơn hàng sau khi cập nhật
//       } else {
//         console.error('Cập nhật đơn hàng thất bại:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi cập nhật đơn hàng:', error);
//     }
//   };

//   // Huỷ đơn hàng
//   const cancelOrder = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `orders/cancel/${orderId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Đơn hàng đã được hủy thành công.');
//         navigate('/cart'); // Điều hướng về trang giỏ hàng
//       } else {
//         console.error('Không thể hủy đơn hàng:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi hủy đơn hàng:', error);
//     }
//   };

//   // Gửi đơn hàng
//   const sendOrder = async () => {
//     try {
//       const response = await axiosInstance.put(
//         `customers/send-order/${orderId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         alert('Đơn hàng đã được gửi thành công!');
//         navigate('/orders'); // Điều hướng tới danh sách đơn hàng
//       } else {
//         console.error('Gửi đơn hàng thất bại:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi gửi đơn hàng:', error);
//     }
//   };

//   // Cập nhật giá trị trong form
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   if (isLoading) {
//     return <p>Đang tải...</p>;
//   }

//   if (!orderDetails) {
//     return <p>Không tìm thấy thông tin đơn hàng.</p>;
//   }

//   return (
//     <div>
//       <h2>Chi tiết đơn hàng</h2>
//       <ul>
//         {orderDetails.map((item, index) => (
//           <li key={index}>
//             <p>
//               {`Món ăn: ${item.item_name}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}
//             </p>
//           </li>
//         ))}
//         <li>
//           <p>{`Phí đơn hàng: ${orderFee} VND`}</p>
//         </li>
//       </ul>
//       <h3>{`Tổng giá: ${orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) + orderFee} VND`}</h3>

//       <div>
//         <h3>Cập nhật thông tin đơn hàng</h3>
//         <form onSubmit={(e) => { e.preventDefault(); updateOrder(); }}>
//           <div>
//             <label htmlFor="address">Địa chỉ nhận đơn:</label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Nhập địa chỉ"
//             />
//           </div>
//           <div>
//             <label htmlFor="note">Ghi chú của bạn:</label>
//             <input
//               type="text"
//               id="note"
//               name="note"
//               value={formData.note}
//               onChange={handleInputChange}
//               placeholder="Nhập ghi chú"
//             />
//           </div>
//           <div>
//             <button type="submit">Cập nhật đơn hàng</button>
//           </div>
//         </form>
//       </div>

//       <div>
//         <button onClick={cancelOrder}>Hủy đơn hàng</button>
//         <button onClick={sendOrder}>Gửi đơn hàng</button>
//       </div>

//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


//       {/* <AddressOrder/> */}
//     </div>
//   );
// };

// export default PlaceOrder;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig';
import './PlaceOrder.css';
import AddressEditor from './AddressEditor.jsx';

const PlaceOrder = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const navigate = useNavigate(); // Dùng để điều hướng sau khi xử lý
  const token = localStorage.getItem('access_token');

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderFee, setOrderFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ address: '', note: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [addressInfo, setAddressInfo] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        setOrderDetails(response.data);
        fetchOrderFee(orderId);
      } else {
        console.error('Không lấy được thông tin đơn hàng:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderFee = async (orderId) => {
    try {
      const response = await axiosInstance.get(`orders/food-fee/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        setOrderFee(response.data);
      } else {
        console.error('Không lấy được phí đơn hàng:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi lấy phí đơn hàng:', error);
    }
  };

  const updateOrder = async () => {
    try {
      const response = await axiosInstance.put(
        `orders/update/${orderId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Cập nhật đơn hàng thành công!');
        fetchOrderDetails(orderId);
      } else {
        console.error('Cập nhật đơn hàng thất bại:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn hàng:', error);
    }
  };

  const cancelOrder = async () => {
    try {
      const response = await axiosInstance.put(
        `orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Đơn hàng đã được hủy thành công.');
        navigate('/cart');
      } else {
        console.error('Không thể hủy đơn hàng:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
    }
  };

  const sendOrder = async () => {
    try {
      const response = await axiosInstance.put(
        `customers/send-order/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Đơn hàng đã được gửi thành công!');
        navigate('/orders');
      } else {
        console.error('Gửi đơn hàng thất bại:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  if (!orderDetails) {
    return <p>Không tìm thấy thông tin đơn hàng.</p>;
  }

  return (
    <div className="order-details-container">
      <h2>Chi tiết đơn hàng</h2>
      <div className="order-list">
        {orderDetails.map((item, index) => (
          <div key={index} className="order-item">
            <div className="item-name">{item.item_name}</div>
            <div className="item-quantity">{`Số lượng: ${item.quantity}`}</div>
            <div className="item-price">{`${item.price} VND`}</div>
          </div>
        ))}
      </div>
      <div className="order-fee">
        <p>{`Phí đơn hàng: ${orderFee} VND`}</p>
      </div>
      {/* <h3>{`Tổng giá: ${orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) + orderFee} VND`}</h3> */}

      <div className="order-update">
        <h3>Cập nhật thông tin đơn hàng</h3>
        <AddressEditor orderId={orderId}
            onSave={(selectedAddress) => {
              console.log("Địa chỉ đã lưu: ", selectedAddress);
              // Xử lý logic sau khi lưu, ví dụ:
              setAddressInfo((prev) => ({
                ...prev,
                address: selectedAddress.address,
                x: selectedAddress.x,
                y: selectedAddress.y,
              }
            ));
            }}
          />
        <form onSubmit={(e) => { e.preventDefault(); updateOrder(); }}>
          <div className="form-group">
            <label htmlFor="note">Ghi chú của bạn:</label>
            <input
              type="text"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Nhập ghi chú"
            />
          </div>
          <div>
            <button type="submit" className="submit-btn">Cập nhật đơn hàng</button>
          </div>
        </form>
      </div>

      <div className="order-actions">
        <button onClick={cancelOrder} className="cancel-btn">Hủy đơn hàng</button>
        <button onClick={sendOrder} className="send-btn">Gửi đơn hàng</button>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default PlaceOrder;
