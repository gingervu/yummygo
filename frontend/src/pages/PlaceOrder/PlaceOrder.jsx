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
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosConfig';

const PlaceOrder = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const navigate = useNavigate(); // Dùng để điều hướng sau khi xử lý
  const token = localStorage.getItem('access_token');

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderFee, setOrderFee] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  // Lấy thông tin chi tiết đơn hàng
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        setOrderDetails(response.data);
        fetchOrderFee(orderId); // Lấy phí đơn hàng
      } else {
        console.error('Không lấy được thông tin đơn hàng:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy phí đơn hàng
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

  // Gửi đơn hàng
  const sendOrder = async () => {
    try {
      const response = await axiosInstance.post(
        `customers/send-order/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Đơn hàng đã được gửi thành công!');
        navigate('/orders'); // Điều hướng tới danh sách đơn hàng
      } else {
        console.error('Gửi đơn hàng thất bại:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng:', error);
    }
  };

  // Hủy đơn hàng
  const cancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.put(`/orders/cancel/${orderId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        alert("Đơn hàng đã được hủy thành công.");
        navigate('/cart'); // Điều hướng tới danh sách giỏ hàng sau khi hủy
      } else {
        console.error("Không thể hủy đơn hàng:", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };
  

  // Cập nhật thông tin đơn hàng
  const updateOrder = async () => {
    try {
      const response = await axiosInstance.patch(
        `orders/update`,
        {
          order_id: orderId,
          // Dữ liệu cập nhật tùy ý (ví dụ: thêm thông tin địa chỉ)
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('Cập nhật đơn hàng thành công!');
        fetchOrderDetails(orderId); // Làm mới thông tin đơn hàng sau khi cập nhật
      } else {
        console.error('Cập nhật đơn hàng thất bại:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn hàng:', error);
    }
  };

  if (isLoading) {
    return <p>Đang tải...</p>;
  }

  if (!orderDetails) {
    return <p>Không tìm thấy thông tin đơn hàng.</p>;
  }

  return (
    <div>
      <h2>Chi tiết đơn hàng</h2>
      <ul>
        {orderDetails.map((item, index) => (
          <li key={index}>
            <p>
              {`Món ăn: ${item.item_name}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}
            </p>
          </li>
        ))}
        <li>
          <p>{`Phí đơn hàng: ${orderFee} VND`}</p>
        </li>
      </ul>
      <h3>{`Tổng giá: ${orderDetails.reduce((acc, item) => acc + item.price * item.quantity, 0) + orderFee} VND`}</h3>
      <div>
        <button onClick={updateOrder}>Cập nhật đơn hàng</button>
        <button onClick={() => cancelOrder(orderId)}>Hủy đơn hàng</button>
        <button onClick={sendOrder}>Gửi đơn hàng</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
