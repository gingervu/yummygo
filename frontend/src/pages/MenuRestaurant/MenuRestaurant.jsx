// đây là code FE khi controller chưa thay đổi dạng api, hãy sửa code cho phù hợp:
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../services/axiosConfig";
// import "./MenuRestaurant.css";

// const MenuRestaurant = () => {
//     const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
//     const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
//     const [cart, setCart] = useState([]); // Giỏ hàng
//     const [error, setError] = useState("");

//     // Lấy danh sách món ăn của nhà hàng
//     useEffect(() => {
//         const fetchMenuItems = async () => {
//             try {
//                 const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
//                 setMenuItems(response.data);
//             } catch (error) {
//                 console.error("Error fetching menu items:", error);
//                 setError("Không thể tải danh sách món ăn.");
//             }
//         };
//         fetchMenuItems();
//     }, [restaurant_id]);

//     // API Thêm món vào giỏ hàng
//     const handleAddToCart = async (menuItem) => {
//         try {
//             const response = await axiosInstance.put(`/customers/send-order/${menuItem.item_id}`);
//             const updatedCart = [...cart, response.data];
//             setCart(updatedCart);
//         } catch (error) {
//             console.error("Error adding item to cart:", error);
//             setError("Không thể thêm món vào giỏ hàng.");
//         }
//     };

//     // API Xóa món khỏi giỏ hàng
//     const handleRemoveFromCart = async (item_id) => {
//         try {
//             await axiosInstance.delete(`/items/delete/${item_id}`);
//             setCart((prevCart) => prevCart.filter((item) => item.item_id !== item_id));
//         } catch (error) {
//             console.error("Error removing item from cart:", error);
//             setError("Không thể xóa món khỏi giỏ hàng.");
//         }
//     };

//     return (
//         <div>
//             <h1>Thực đơn Nhà Hàng {restaurant_id}</h1>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <div>
//                 <h2>Danh sách Món Ăn</h2>
//                 {menuItems.length > 0 ? (
//                     <ul>
//                         {menuItems.map((item) => (
//                             <li key={item.item_id} style={{ marginBottom: "10px" }}>
//                                 <h3>{item.name}</h3>
//                                 <p>{item.description || "Không có mô tả."}</p>
//                                 <p>Giá: {item.price} VND</p>
//                                 <button onClick={() => handleAddToCart(item)}>Thêm vào giỏ</button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Không có món ăn nào có sẵn.</p>
//                 )}
//             </div>

//             <div style={{ marginTop: "20px" }}>
//                 <h2>Giỏ Hàng</h2>
//                 {cart.length > 0 ? (
//                     <ul>
//                         {cart.map((item) => (
//                             <li key={item.item_id}>
//                                 <h3>{item.name}</h3>
//                                 <p>Giá: {item.price} VND</p>
//                                 <button onClick={() => handleRemoveFromCart(item.item_id)}>Xóa khỏi giỏ</button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Giỏ hàng trống.</p>
//                 )}
//             </div>
//         </div>
//     );
// };


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import "./MenuRestaurant.css";

const MenuRestaurant = () => {
  const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
  const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng
  const [error, setError] = useState(""); // Xử lý lỗi
  const [customerId, setCustomerId] = useState(null); // ID khách hàng từ auth hoặc session
  const [orderId, setOrderId] = useState(null); // ID của đơn hàng

  // Lấy thông tin người dùng và danh sách món ăn khi component được mount
  useEffect(() => {
    const fetchCustomerId = () => {
      // Giả định lấy customer_id từ localStorage hoặc session
      const storedCustomerId = 1; // Thay bằng phương pháp lấy customerId thực tế
      setCustomerId(storedCustomerId);
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Không thể tải danh sách món ăn.");
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get(
          `/orders/current-cart/${restaurant_id}`
        );
        setCartItems(response.data || []);
        if (response.data && response.data.length > 0) {
          setOrderId(response.data[0].order_id); // Giả sử order_id là giống cho tất cả các món trong giỏ
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Không thể tải giỏ hàng.");
      }
    };

    fetchCustomerId();
    fetchMenuItems();
    fetchCartItems();
  }, [restaurant_id]);

  // Thêm món vào giỏ hàng
  const handleAddToCart = async (itemId) => {
    try {
      const response = await axiosInstance.post(
        `/orders/add-item`,
        null,
        {
          params: {
            item_id: itemId,
            restaurant_id: restaurant_id,
          },
        }
      );
      console.log("Item added to cart:", response.data);
      await updateCart();
    } catch (error) {
      console.error("Error adding item to cart:", error.response?.data || error.message);
      setError("Không thể thêm món vào giỏ hàng.");
    }
  };

  // Xóa món khỏi giỏ hàng
  const handleSubtractFromCart = async (itemId) => {
    if (!orderId) {
      setError("Không có đơn hàng để xóa món.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/orders/subtract-item",
        null,
        {
          params: {
            item_id: itemId,
            order_id: orderId,
          },
        }
      );
      console.log(`Item ${itemId} removed from cart.`);
      await updateCart(); // Hàm cập nhật giỏ hàng
    } catch (error) {
      // Kiểm tra lỗi trả về từ API
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail); // Hiển thị chi tiết lỗi từ API
      } else {
        setError("Không thể giảm số lượng món. Vui lòng thử lại.");
      }
      console.error("Error subtracting item from cart:", error.response?.data || error.message);
    }
  };

  // Cập nhật lại giỏ hàng
  const updateCart = async () => {
    try {
      const response = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`);
      setCartItems(response.data || []);
      if (response.data && response.data.length > 0) {
        setOrderId(response.data[0].order_id); // Giả sử order_id là giống cho tất cả các món trong giỏ
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      setError("Không thể cập nhật giỏ hàng.");
    }
  };

  return (
    <div>
      <h1>Thực đơn Nhà Hàng {restaurant_id}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Danh sách Món Ăn</h2>
        {menuItems.length > 0 ? (
          <ul>
            {menuItems.map((item) => (
              <li key={item.item_id} style={{ marginBottom: "10px" }}>
                <h3>{item.name}</h3>
                <p>{item.description || "Không có mô tả."}</p>
                <p>Giá: {item.price} VND</p>
                <button onClick={() => handleAddToCart(item.item_id)}>
                  Thêm vào giỏ
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có món ăn nào có sẵn.</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Giỏ Hàng</h2>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item) => (
              <li key={item.item_id}>
                <h3>{item.name}</h3>
                <p>Giá: {item.price} VND</p>
                <p>Số lượng: {item.quantity}</p>
                <button onClick={() => handleAddToCart(item.item_id)}>+</button>
                <button onClick={() => handleSubtractFromCart(item.item_id)}>-</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Giỏ hàng trống.</p>
        )}
      </div>
    </div>
  );
};

export default MenuRestaurant;


// Thêm món thành công
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../services/axiosConfig";
// import "./MenuRestaurant.css";
// import axios from "axios";


// const MenuRestaurant = () => {
//   const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
//   const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
//   const [cartItems, setCartItems] = useState([]); // Giỏ hàng
//   const [error, setError] = useState("");
//   const [customerId, setCustomerId] = useState(null); // customer_id từ auth hoặc session

//   useEffect(() => {
//     // Giả sử bạn lấy customer_id từ thông tin người dùng đã đăng nhập
//     const fetchCustomerId = () => {
//       // Lấy customerId từ nơi lưu trữ người dùng (localStorage, cookie, hoặc API)
//       setCustomerId(1); // Đây là ví dụ, bạn cần lấy từ session hoặc auth thực tế
//     };

//     fetchCustomerId();

//     const fetchMenuItems = async () => {
//       try {
//         const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
//         setMenuItems(response.data);
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setError("Không thể tải danh sách món ăn.");
//       }
//     };

//     const fetchCartItems = async () => {
//       try {
//         const response = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`);
//         setCartItems(response.data || []);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setError("Không thể tải giỏ hàng.");
//       }
//     };

//     fetchMenuItems();
//     fetchCartItems();
//   }, [restaurant_id, customerId]); // Giám sát customerId để gọi lại khi có sự thay đổi

//   // API Thêm món vào giỏ hàng
//   const handleAddToCart = async (itemId) => {
//     try {
//       if (!restaurant_id || !itemId) {
//         console.error("Missing restaurantId or itemId.");
//         return;
//       }
//       const response = await axios.post(
//         `http://localhost:8000/orders/add-item`,
//         null,
//         {
//           params: {
//             item_id: itemId,
//             restaurant_id: restaurant_id,
//           },
//         }
//       );
//       console.log("Item added to cart:", response.data);
  
//       // Gọi API để cập nhật lại giỏ hàng
//       const updatedCart = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`);
//       setCartItems(updatedCart.data || []);
//     } catch (error) {
//       console.error("Error adding item to cart:", error.response?.data || error.message);
//     }
//   };
  


//   // API Giảm món trong giỏ hàng
//   const handleSubtractFromCart = async (item_id) => {
//     const order_id = cartItems[0]?.order_id; // Giả sử tất cả các item thuộc cùng một order_id
//     if (!order_id) return;

//     try {
//       await axiosInstance.post(`/orders/subtract-item`, {
//         item_id,
//         order_id,
//         customer_id: customerId, // Thêm customer_id vào request body
//       });
//       // Cập nhật lại giỏ hàng sau khi giảm
//       const updatedCart = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`);
//       setCartItems(updatedCart.data || []);
//     } catch (error) {
//       console.error("Error subtracting item from cart:", error);
//       setError("Không thể giảm số lượng món.");
//     }
//   };

//   return (
//     <div>
//       <h1>Thực đơn Nhà Hàng {restaurant_id}</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div>
//         <h2>Danh sách Món Ăn</h2>
//         {menuItems.length > 0 ? (
//           <ul>
//             {menuItems.map((item) => (
//               <li key={item.item_id} style={{ marginBottom: "10px" }}>
//                 <h3>{item.name}</h3>
//                 <p>{item.description || "Không có mô tả."}</p>
//                 <p>Giá: {item.price} VND</p>
//                 <button onClick={() => handleAddToCart(item.item_id)}>
//                   Thêm vào giỏ
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Không có món ăn nào có sẵn.</p>
//         )}
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         <h2>Giỏ Hàng</h2>
//         {cartItems.length > 0 ? (
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.item_id}>
//                 <h3>{item.name}</h3>
//                 <p>Giá: {item.price} VND</p>
//                 <p>Số lượng: {item.quantity}</p>
//                 <button onClick={() => handleAddToCart(item.item_id)}>+</button>
//                 <button onClick={() => handleSubtractFromCart(item.item_id)}>-</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Giỏ hàng trống.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuRestaurant;
