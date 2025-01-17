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
        const token = localStorage.getItem('access_token');
        const response = await axiosInstance.get(`/items/menu/${restaurant_id}`,
          {headers: {Authorization: `Bearer ${token}`}}
        );
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError("Không thể tải danh sách món ăn.");
      }
    };

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`,
          {headers: {Authorization: `Bearer ${token}`}, withCredentials: true,});
        setCartItems(response.data || []);
        if (response.data && response.data.length > 0) {
          setOrderId(response.data[0].order_id); // order_id là giống cho tất cả các món trong giỏ
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
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Vui lòng đăng nhập để thêm món vào giỏ.");
        return;
      }
  
      // Kiểm tra token đã được lấy chưa
      console.log("Adding item to cart with token:", token);
  
      const response = await axiosInstance.post(
        "/orders/add-item",
        null,  // Không cần body, chỉ cần params
        {
          params: {
            item_id: itemId,
            restaurant_id: restaurant_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,  // Gửi token vào header Authorization
          },
        }
      );
  
      console.log("Item added to cart:", response.data);
      await updateCart();
    } catch (error) {
      console.error("Error adding item to cart:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        setError(`Lỗi: ${error.response.data.detail || error.response.data.message}`);
      } else {
        setError("Không thể thêm món vào giỏ hàng.");
      }
    }
  };
  
  

  // Xóa món khỏi giỏ hàng
  const handleSubtractFromCart = async (itemId) => {
    if (!orderId) {
      setError("Không có đơn hàng để xóa món.");
      return;
    }
  
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Vui lòng đăng nhập để thực hiện thao tác này.");
        return;
      }
  
      // Kiểm tra token đã được lấy chưa
      console.log("Removing item from cart with token:", token);
  
      const response = await axiosInstance.post(
        "/orders/subtract-item", // API route cho việc xóa món
        null,  // Không cần body, chỉ cần params
        {
          params: {
            item_id: itemId,
            order_id: orderId, // Sử dụng orderId để xác định đơn hàng
          },
          headers: {
            Authorization: `Bearer ${token}`,  // Gửi token vào header Authorization
          },
        }
      );
  
      console.log(`Item ${itemId} removed from cart.`, response.data);
      await updateCart();  // Cập nhật lại giỏ hàng sau khi xóa món
    } catch (error) {
      console.error("Error subtracting item from cart:", error.response?.data || error.message);
      if (error.response && error.response.data) {
        setError(`Lỗi: ${error.response.data.detail || error.response.data.message}`);
      } else {
        setError("Không thể xóa món khỏi giỏ hàng.");
      }
    }
  };
  
  
  

  // Cập nhật lại giỏ hàng
  const updateCart = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axiosInstance.get(`/orders/current-cart/${restaurant_id}`,
        {headers: {Authorization:`Bearer ${token}`}}
      );
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

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import "./MenuRestaurant.css";

// // const MenuRestaurant = () => {
// //   const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
// //   const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
// //   const [cartItems, setCartItems] = useState([]); // Giỏ hàng
// //   const [error, setError] = useState(""); // Xử lý lỗi
// //   const [customerId, setCustomerId] = useState(null); // ID khách hàng từ auth hoặc session
// //   const [orderId, setOrderId] = useState(null); // ID của đơn hàng

// //   // Lấy thông tin người dùng và danh sách món ăn khi component được mount
// //   useEffect(() => {
// //     const fetchCustomerId = () => {
// //       // Giả định lấy customer_id từ localStorage hoặc session
// //       const storedCustomerId = 1; // Thay bằng phương pháp lấy customerId thực tế
// //       setCustomerId(storedCustomerId);
// //     };

// //     const fetchMenuItems = async () => {
// //       try {
// //         const token = localStorage.getItem('access_token');
// //         const response = await axios.get(
// //           `http://localhost:8000/items/menu/${restaurant_id}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //         setMenuItems(response.data);
// //       } catch (error) {
// //         console.error("Error fetching menu items:", error);
// //         setError("Không thể tải danh sách món ăn.");
// //       }
// //     };

// //     const fetchCartItems = async () => {
// //       try {
// //         const token = localStorage.getItem('access_token');
// //         const response = await axios.get(
// //           "http://localhost:8000/orders/current-cart/${restaurant_id}",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //             withCredentials: true, // Đảm bảo cookie sẽ được gửi
// //           }
// //         );
// //         setCartItems(response.data || []);
// //         if (response.data && response.data.length > 0) {
// //           setOrderId(response.data[0].order_id); // order_id là giống cho tất cả các món trong giỏ
// //         }
// //       } catch (error) {
// //         console.error("Error fetching cart items:", error);
// //         setError("Không thể tải giỏ hàng.");
// //       }
// //     };

// //     fetchCustomerId();
// //     fetchMenuItems();
// //     fetchCartItems();
// //   }, [restaurant_id]);

// //   // Thêm món vào giỏ hàng
// //   const handleAddToCart = async (itemId) => {
// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const response = await axios.post(
// //         `http://localhost:8000/orders/add-item`,
// //         null,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //           params: {
// //             item_id: itemId,
// //             restaurant_id: restaurant_id,
// //           },
// //         }
// //       );
// //       console.log("Item added to cart:", response.data);
// //       await updateCart();
// //     } catch (error) {
// //       console.error("Error adding item to cart:", error.response?.data || error.message);
// //       setError("Không thể thêm món vào giỏ hàng.");
// //     }
// //   };

// //   // Xóa món khỏi giỏ hàng
// //   const handleSubtractFromCart = async (itemId) => {
// //     if (!orderId) {
// //       setError("Không có đơn hàng để xóa món.");
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const response = await axios.post(
// //         "http://localhost:8000/orders/subtract-item",
// //         null,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //           params: {
// //             item_id: itemId,
// //             order_id: orderId,
// //           },
// //         }
// //       );
// //       console.log(`Item ${response.itemId} removed from cart.`);
// //       await updateCart(); // Hàm cập nhật lại giỏ hàng
// //     } catch (error) {
// //       if (error.response && error.response.data && error.response.data.detail) {
// //         setError(error.response.data.detail); // Hiển thị chi tiết lỗi từ API
// //       } else {
// //         setError("Không thể giảm số lượng món. Vui lòng thử lại.");
// //       }
// //       console.error("Error subtracting item from cart:", error.response?.data || error.message);
// //     }
// //   };

// //   // Cập nhật lại giỏ hàng
// //   const updateCart = async () => {
// //     try {
// //       const token = localStorage.getItem('access_token');
// //       const response = await axios.get(
// //         `http://localhost:8000/orders/current-cart/${restaurant_id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setCartItems(response.data || []);
// //       if (response.data && response.data.length > 0) {
// //         setOrderId(response.data[0].order_id); // Giả sử order_id là giống cho tất cả các món trong giỏ
// //       }
// //     } catch (error) {
// //       console.error("Error updating cart:", error);
// //       setError("Không thể cập nhật giỏ hàng.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Thực đơn Nhà Hàng {restaurant_id}</h1>
// //       {error && <p style={{ color: "red" }}>{error}</p>}
// //       <div>
// //         <h2>Danh sách Món Ăn</h2>
// //         {menuItems.length > 0 ? (
// //           <ul>
// //             {menuItems.map((item) => (
// //               <li key={item.item_id} style={{ marginBottom: "10px" }}>
// //                 <h3>{item.name}</h3>
// //                 <p>{item.description || "Không có mô tả."}</p>
// //                 <p>Giá: {item.price} VND</p>
// //                 <button onClick={() => handleAddToCart(item.item_id)}>
// //                   Thêm vào giỏ
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>Không có món ăn nào có sẵn.</p>
// //         )}
// //       </div>

// //       <div style={{ marginTop: "20px" }}>
// //         <h2>Giỏ Hàng</h2>
// //         {cartItems.length > 0 ? (
// //           <ul>
// //             {cartItems.map((item) => (
// //               <li key={item.item_id}>
// //                 <h3>{item.name}</h3>
// //                 <p>Giá: {item.price} VND</p>
// //                 <p>Số lượng: {item.quantity}</p>
// //                 <button onClick={() => handleAddToCart(item.item_id)}>+</button>
// //                 <button onClick={() => handleSubtractFromCart(item.item_id)}>-</button>
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>Giỏ hàng trống.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MenuRestaurant;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./MenuRestaurant.css";

// const MenuRestaurant = () => {
//   const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
//   const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
//   const [cartItems, setCartItems] = useState([]); // Giỏ hàng
//   const [error, setError] = useState(""); // Xử lý lỗi
//   const [orderId, setOrderId] = useState(null); // ID của đơn hàng

//   // Lấy thông tin người dùng và danh sách món ăn khi component được mount
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         const response = await axios.get(`/api/items/menu/${restaurant_id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setMenuItems(response.data);
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//         setError("Không thể tải danh sách món ăn.");
//       }
//     };

//     const fetchCartItems = async () => {
//       try {
//         const token = localStorage.getItem('access_token');
//         const response = await axios.get(`/api/orders/current-cart/${restaurant_id}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setCartItems(response.data.items || []);
//         if (response.data.items && response.data.items.length > 0) {
//           setOrderId(response.data.items[0].order_id); // order_id là giống cho tất cả các món trong giỏ
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         setError("Không thể tải giỏ hàng.");
//       }
//     };

//     fetchMenuItems();
//     fetchCartItems();
//   }, [restaurant_id]);

//   // Thêm món vào giỏ hàng
//   const handleAddToCart = async (itemId) => {
//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setError("Vui lòng đăng nhập để thêm món vào giỏ.");
//         return;
//       }

//       const response = await axios.post(
//         "/api/orders/add-item",
//         null,  // Không cần body, chỉ cần params
//         {
//           params: {
//             item_id: itemId,
//             restaurant_id: restaurant_id,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,  // Gửi token vào header Authorization
//           },
//         }
//       );

//       console.log("Item added to cart:", response.data);
//       await updateCart();
//     } catch (error) {
//       console.error("Error adding item to cart:", error.response?.data || error.message);
//       if (error.response && error.response.data) {
//         setError(`Lỗi: ${error.response.data.detail || error.response.data.message}`);
//       } else {
//         setError("Không thể thêm món vào giỏ hàng.");
//       }
//     }
//   };

//   // Xóa món khỏi giỏ hàng
//   const handleSubtractFromCart = async (itemId) => {
//     if (!orderId) {
//       setError("Không có đơn hàng để xóa món.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         setError("Vui lòng đăng nhập để thực hiện thao tác này.");
//         return;
//       }

//       const response = await axios.post(
//         "/api/orders/subtract-item", // API route cho việc xóa món
//         null,  // Không cần body, chỉ cần params
//         {
//           params: {
//             item_id: itemId,
//             order_id: orderId, // Sử dụng orderId để xác định đơn hàng
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,  // Gửi token vào header Authorization
//           },
//         }
//       );

//       console.log(`Item ${itemId} removed from cart.`, response.data);
//       await updateCart();  // Cập nhật lại giỏ hàng sau khi xóa món
//     } catch (error) {
//       console.error("Error subtracting item from cart:", error.response?.data || error.message);
//       if (error.response && error.response.data) {
//         setError(`Lỗi: ${error.response.data.detail || error.response.data.message}`);
//       } else {
//         setError("Không thể xóa món khỏi giỏ hàng.");
//       }
//     }
//   };

//   // Cập nhật lại giỏ hàng
//   const updateCart = async () => {
//     try {
//       const token = localStorage.getItem('access_token');
//       const response = await axios.get(`/api/orders/current-cart/${restaurant_id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCartItems(response.data.items || []);
//       if (response.data.items && response.data.items.length > 0) {
//         setOrderId(response.data.items[0].order_id); // Giả sử order_id là giống cho tất cả các món trong giỏ
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       setError("Không thể cập nhật giỏ hàng.");
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