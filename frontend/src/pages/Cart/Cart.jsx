// thành công xem đc hàng loạt đơn hàng và bấm vào chi tiết thì cho ra đơn hàng ở nhà hàng đó

// import React, { useState, useEffect } from 'react';
// import axiosInstance from "../../services/axiosConfig";

// const Cart = ({ customerId }) => {
//   const [orders, setOrders] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Lưu thông tin chi tiết đơn hàng
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     // Lấy danh sách đơn hàng trong giỏ
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const response = await axiosInstance.get('orders/cart', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       // Kiểm tra mã trạng thái HTTP
//       if (response.status === 200) {
//         console.log('Dữ liệu giỏ hàng:', response.data);
//         if (Array.isArray(response.data)) {
//           const groupedOrders = groupOrdersByRestaurant(response.data);
//           setOrders(groupedOrders);
//           calculateTotal(response.data);
//         } else {
//           console.error('Dữ liệu giỏ hàng không phải là mảng:', response.data);
//         }
//       } else {
//         console.error(`Lỗi API: Mã trạng thái ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy giỏ hàng:', error);
//     }
//   };

//   const groupOrdersByRestaurant = (orders) => {
//     return orders.reduce((acc, order) => {
//       // Nếu chưa có nhóm cho restaurant_id này thì tạo mới
//       if (!acc[order.restaurant_id]) {
//         acc[order.restaurant_id] = [];
//       }
//       acc[order.restaurant_id].push(order);
//       return acc;
//     }, {});
//   };

//   const calculateTotal = (orders) => {
//     let total = 0;
//     if (Array.isArray(orders)) {
//       orders.forEach(order => {
//         total += order.food_fee || 0; // Giả sử 'food_fee' là giá trị món ăn
//       });
//     } else {
//       console.error('orders không phải là mảng:', orders);
//     }
//     setTotalPrice(total);
//   };

//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/${orderId}`, 
//         { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       );

//       // Kiểm tra mã trạng thái HTTP
//       if (response.status === 200) {
//         const orderDetails = response.data;

//         // Kiểm tra nếu orderDetails là một mảng hoặc đối tượng hợp lệ
//         if (Array.isArray(orderDetails)) {
//           setSelectedOrderDetails(orderDetails); // Lưu thông tin chi tiết đơn hàng vào state
//         } else {
//           console.error('Thông tin chi tiết đơn hàng không phải là mảng:', orderDetails);
//           setSelectedOrderDetails([orderDetails]); // Chuyển đổi thành mảng nếu cần
//         }
//       } else {
//         console.error('API trả về mã trạng thái không hợp lệ:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Giỏ Hàng</h2>
//       <div>
//         <h3>Danh sách các món trong giỏ hàng:</h3>
//         {Object.keys(orders).length > 0 ? (
//           Object.keys(orders).map((restaurantId) => (
//             <div key={restaurantId}>
//               <h4>Nhà hàng ID: {restaurantId}</h4>
//               <ul>
//                 {orders[restaurantId].map((order) => (
//                   <li key={order.order_id}>
//                     <span>{`Đơn hàng ID: ${order.order_id}, Nhà hàng ID: ${order.restaurant_id}`}</span>
//                     <button onClick={() => fetchOrderDetails(order.order_id)}>
//                       Xem chi tiết
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p>Giỏ hàng của bạn đang trống.</p>
//         )}
//       </div>

//       {selectedOrderDetails && (
//         <div>
//           <h3>Thông tin chi tiết đơn hàng</h3>
//           <ul>
//             {selectedOrderDetails.map((item, index) => (
//               <li key={index}>
//                 <p>{`Món ID: ${item.item_id}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <h3>Tổng tiền: {totalPrice} VND</h3>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// giống như trên

// import React, { useState, useEffect } from 'react';
// import axiosInstance from "../../services/axiosConfig";
// import './Cart.css';
// import { Link } from 'react-router-dom';

// const Cart = ({ customerId }) => {
//   const [orders, setOrders] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Lưu thông tin chi tiết đơn hàng
//   const [orderFees, setOrderFees] = useState({}); // Lưu phí của mỗi đơn hàng
//   const token = localStorage.getItem("access_token");

//   useEffect(() => {
//     // Lấy danh sách đơn hàng trong giỏ
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const response = await axiosInstance.get('orders/cart', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       // Kiểm tra mã trạng thái HTTP
//       if (response.status === 200) {
//         console.log('Dữ liệu giỏ hàng:', response.data);
//         if (Array.isArray(response.data)) {
//           const groupedOrders = groupOrdersByRestaurant(response.data);
//           setOrders(groupedOrders);
//           await calculateTotal(response.data); // Tính tổng tiền cho tất cả đơn hàng
//         } else {
//           console.error('Dữ liệu giỏ hàng không phải là mảng:', response.data);
//         }
//       } else {
//         console.error(`Lỗi API: Mã trạng thái ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy giỏ hàng:', error);
//     }
//   };

//   const groupOrdersByRestaurant = (orders) => {
//     return orders.reduce((acc, order) => {
//       // Nếu chưa có nhóm cho restaurant_id này thì tạo mới
//       if (!acc[order.restaurant_id]) {
//         acc[order.restaurant_id] = [];
//       }
//       acc[order.restaurant_id].push(order);
//       return acc;
//     }, {});
//   };

//   // Hàm tính tổng tiền cho các đơn hàng
//   const calculateTotal = async (orders) => {
//     let total = 0;
//     const fees = {}; // Đối tượng lưu phí cho mỗi đơn hàng

//     // Duyệt qua từng đơn hàng và tính phí
//     for (const order of orders) {
//       try {
//         const response = await axiosInstance.get(`orders/food-fee/${order.order_id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         });

//         if (response.status === 200) {
//           const fee = response.data; // Lấy phí đơn hàng từ API
//           fees[order.order_id] = fee; // Lưu phí cho đơn hàng
//           total += fee; // Cộng phí vào tổng tiền
//         } else {
//           console.error(`Không thể lấy phí cho đơn hàng ID ${order.order_id}: ${response.status}`);
//         }
//       } catch (err) {
//         console.error(`Lỗi khi lấy phí cho đơn hàng ID ${order.order_id}:`, err);
//       }
//     }

//     // Cập nhật trạng thái phí cho từng đơn hàng
//     setOrderFees(fees);
//     setTotalPrice(total); // Cập nhật tổng tiền
//   };

//   const fetchOrderDetails = async (orderId) => {
//     try {
//       const response = await axiosInstance.get(`orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });

//       // Kiểm tra mã trạng thái HTTP
//       if (response.status === 200) {
//         const orderDetails = response.data;

//         // Kiểm tra nếu orderDetails là một mảng hoặc đối tượng hợp lệ
//         if (Array.isArray(orderDetails)) {
//           setSelectedOrderDetails(orderDetails); // Lưu thông tin chi tiết đơn hàng vào state
//         } else {
//           console.error('Thông tin chi tiết đơn hàng không phải là mảng:', orderDetails);
//           setSelectedOrderDetails([orderDetails]); // Chuyển đổi thành mảng nếu cần
//         }
//       } else {
//         console.error('API trả về mã trạng thái không hợp lệ:', response.status);
//       }
//     } catch (error) {
//       console.error('Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
//     }
//   };

//   //tự thêm
//   const handlePlaceOrder = (orderId) => {
//     navigate(`/placeorder/${orderId}`);
//   };

//   return (
//     <div>
//       <h2>Giỏ Hàng</h2>
//       <div>
//         <h3>Danh sách các món trong giỏ hàng:</h3>
//         {Object.keys(orders).length > 0 ? (
//           Object.keys(orders).map((restaurantId) => (
//             <div key={restaurantId}>
//               <h4>Nhà hàng ID: {restaurantId}</h4>
//               <ul>
//                 {orders[restaurantId].map((order) => (
//                   <li key={order.order_id}>
//                     <span>{`Đơn hàng ID: ${order.order_id}, Nhà hàng ID: ${order.restaurant_id}`}</span>
//                     <button onClick={() => fetchOrderDetails(order.order_id)}>
//                       Xem chi tiết
//                     </button>
//                     {/* <div>{`Phí đơn hàng: ${orderFees[order.order_id] || 'Đang tải...'} VND`}</div> */}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))
//         ) : (
//           <p>Giỏ hàng của bạn đang trống.</p>
//         )}
//       </div>

//       {selectedOrderDetails && (
//         <div>
//           <h3>Thông tin chi tiết đơn hàng</h3>
//           <ul>
//             {selectedOrderDetails.map((item, index) => (
//               <li key={index}>
//                 <p>{`Món ID: ${item.item_id}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}</p>
                
//               </li>
              
//             ))}
//             {selectedOrderDetails.length > 0 && (
//               <li>
//                 <p>Phí đơn hàng: {orderFees[selectedOrderDetails[0].order_id] || 'Đang tải...'} VND</p>
//               </li>
              
//             )}
//             <button onClick={() => handlePlaceOrder(selectedOrderDetails[0].order_id)}>Đặt hàng</button>
//           </ul>
//         </div>
//       )}

//       <div>
//         <h3>Tổng tiền giỏ hàng: {totalPrice} VND</h3>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// test chuyển hướng đến PlaceOrder
import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); // Chi tiết đơn hàng
  const [orderFees, setOrderFees] = useState({}); // Lưu phí cho từng đơn hàng
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    // Lấy danh sách đơn hàng trong giỏ
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("orders/cart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const groupedOrders = groupOrdersByRestaurant(response.data);
          setOrders(groupedOrders);
          await calculateTotal(response.data); // Tính tổng tiền cho tất cả đơn hàng
        } else {
          console.error("Dữ liệu giỏ hàng không hợp lệ:", response.data);
        }
      } else {
        console.error(`Lỗi API: ${response.status}`);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  const groupOrdersByRestaurant = (orders) => {
    return orders.reduce((acc, order) => {
      if (!acc[order.restaurant_id]) {
        acc[order.restaurant_id] = [];
      }
      acc[order.restaurant_id].push(order);
      return acc;
    }, {});
  };

  const calculateTotal = async (orders) => {
    let total = 0;
    const fees = {};

    for (const order of orders) {
      try {
        const response = await axiosInstance.get(
          `orders/food-fee/${order.order_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const fee = response.data;
          fees[order.order_id] = fee;
          total += fee;
        } else {
          console.error(`Không thể lấy phí cho đơn hàng ID ${order.order_id}`);
        }
      } catch (error) {
        console.error(`Lỗi khi lấy phí cho đơn hàng ID ${order.order_id}:`, error);
      }
    }

    setOrderFees(fees);
    setTotalPrice(total);
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axiosInstance.get(`orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        const orderDetails = response.data;

        if (Array.isArray(orderDetails)) {
          setSelectedOrderDetails(orderDetails);
        } else {
          console.error("Thông tin chi tiết đơn hàng không hợp lệ:", orderDetails);
          setSelectedOrderDetails([orderDetails]);
        }
      } else {
        console.error("API trả về lỗi:", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chi tiết đơn hàng:", error);
    }
  };

  const handlePlaceOrder = (orderId) => {
    navigate(`/placeorder/${orderId}`);
  };

  return (
    <div className="cart">
      <h2>Giỏ Hàng</h2>
      <div>
        <h3>Danh sách các món trong giỏ hàng:</h3>
        {Object.keys(orders).length > 0 ? (
          Object.keys(orders).map((restaurantId) => (
            <div key={restaurantId}>
              <h4>Nhà hàng ID: {restaurantId}</h4>
              <ul>
                {orders[restaurantId].map((order) => (
                  <li key={order.order_id}>
                    <span>{`Đơn hàng ID: ${order.order_id}, Nhà hàng ID: ${order.restaurant_id}`}</span>
                    <button onClick={() => fetchOrderDetails(order.order_id)}>
                      Xem chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Giỏ hàng của bạn đang trống.</p>
        )}
      </div>

      {selectedOrderDetails && (
        <div>
          <h3>Thông tin chi tiết đơn hàng</h3>
          <ul>
            {selectedOrderDetails.map((item, index) => (
              <li key={index}>
                <p>{`Món ID: ${item.item_id}, Số lượng: ${item.quantity}, Giá: ${item.price} VND`}</p>
              </li>
            ))}
            {selectedOrderDetails.length > 0 && (
              <li>
                <p>
                  Phí đơn hàng:{" "}
                  {orderFees[selectedOrderDetails[0].order_id] || "Đang tải..."}{" "}
                  VND
                </p>
              </li>
            )}
            <button
              onClick={() => handlePlaceOrder(selectedOrderDetails[0].order_id)}
            >
              Đặt hàng
            </button>
          </ul>
        </div>
      )}

      <div>
        <h3>Tổng tiền giỏ hàng: {totalPrice} VND</h3>
      </div>
    </div>
  );
};

export default Cart;
