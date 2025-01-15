// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({ category }) => {
//     const { food_list } = useContext(StoreContext)
//     return (
//         <div className='food-display' id='food-display'>
//             <h2>
//                 Những món ăn/nhà hàng gần chỗ bạn
//             </h2>
//             <div className='food-display-list'>
//                 {food_list.map((item, index) => {
//                     if (category==="All" || category===item.category) {
//                         return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
//                     }

//                 })}
//             </div>
//         </div>
//     )
// }

// export default FoodDisplay



// // lấy danh sách nhà hàng
// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../services/axiosConfig"; // Import axios instance đã cấu hình

// const FoodDisplay = () => {
//     const [restaurants, setRestaurants] = useState([]); // Lưu trữ danh sách nhà hàng
//     const [menuItems, setMenuItems] = useState([]); // Lưu trữ danh sách món ăn của nhà hàng
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
//     const [cart, setCart] = useState([]); // Giỏ hàng
  
//     // Lấy danh sách các nhà hàng active
//     useEffect(() => {
//       const fetchActiveRestaurants = async () => {
//         try {
//           const response = await axiosInstance.get("/restaurants/active");
//           setRestaurants(response.data); // Lưu danh sách nhà hàng vào state
//         } catch (error) {
//           console.error("Error fetching active restaurants:", error);
//         }
//       };
  
//       fetchActiveRestaurants();
//     }, []);
  
//     // Lấy danh sách món ăn của nhà hàng khi người dùng chọn
//     const fetchMenuItems = async (restaurantId) => {
//       try {
//         const response = await axiosInstance.get(`/items/available/${restaurantId}`);
//         setMenuItems(response.data); // Lưu danh sách món ăn vào state
//       } catch (error) {
//         console.error("Error fetching menu items:", error);
//       }
//     };
  
//     // Hàm xử lý khi chọn nhà hàng
//     const handleRestaurantSelect = (restaurantId) => {
//       setSelectedRestaurant(restaurantId); // Lưu nhà hàng đã chọn
//       fetchMenuItems(restaurantId); // Lấy danh sách món ăn của nhà hàng đó
//     };
  
//     // Hàm xử lý khi thêm món ăn vào giỏ hàng
//     const addToCart = (menuItem) => {
//       setCart((prevCart) => [...prevCart, menuItem]); // Thêm món ăn vào giỏ hàng
//     };
  
//     // Hàm xử lý khi xóa món ăn khỏi giỏ hàng
//     const removeFromCart = (itemId) => {
//       setCart(cart.filter(item => item.id !== itemId)); // Xóa món ăn khỏi giỏ hàng
//     };
  
//     return (
//       <div>
//         <h1>Danh sách Nhà Hàng</h1>
//         <div>
//           {restaurants.length > 0 ? (
//             <ul>
//               {restaurants.map((restaurant) => (
//                 <li key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
//                   {restaurant.name}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Không có nhà hàng nào đang hoạt động.</p>
//           )}
//         </div>
  
//         {selectedRestaurant && (
//           <div>
//             <h2>Thực Đơn Của Nhà Hàng</h2>
//             <ul>
//               {menuItems.length > 0 ? (
//                 menuItems.map((item) => (
//                   <li key={item.id}>
//                     <h3>{item.name}</h3>
//                     <p>{item.description}</p>
//                     <p>Giá: {item.price}</p>
//                     <img src={item.img_url} alt={item.name} />
//                     <button onClick={() => addToCart(item)}>Thêm vào giỏ</button>
//                   </li>
//                 ))
//               ) : (
//                 <p>Không có món ăn nào có sẵn.</p>
//               )}
//             </ul>
//           </div>
//         )}
  
//         {/* Giỏ hàng */}
//         <div>
//           <h2>Giỏ Hàng</h2>
//           {cart.length > 0 ? (
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index}>
//                   <h3>{item.name}</h3>
//                   <p>{item.description}</p>
//                   <p>Giá: {item.price}</p>
//                   <button onClick={() => removeFromCart(item.id)}>Xóa khỏi giỏ</button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Giỏ hàng của bạn hiện tại trống.</p>
//           )}
//         </div>
//       </div>
//     );
//   };
  
// export default FoodDisplay;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig"; // Import axios instance đã cấu hình

const FoodDisplay = () => {
    const [restaurants, setRestaurants] = useState([]); // Lưu trữ danh sách nhà hàng
    const [menuItems, setMenuItems] = useState([]); // Lưu trữ danh sách món ăn của nhà hàng
    const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
    const [cart, setCart] = useState([]); // Giỏ hàng

    // Lấy danh sách các nhà hàng active
    useEffect(() => {
        const fetchActiveRestaurants = async () => {
            try {
                const response = await axiosInstance.get("/restaurants/active");
                setRestaurants(response.data); // Lưu danh sách nhà hàng vào state
            } catch (error) {
                console.error("Error fetching active restaurants:", error);
            }
        };

        fetchActiveRestaurants();
    }, []);

    // Lấy danh sách món ăn của nhà hàng khi người dùng chọn
    const fetchMenuItems = async (restaurantId) => {
        try {
            // Sử dụng endpoint mới: /menu/{restaurant_id}
            const response = await axiosInstance.get(`/items/menu/${restaurantId}`);  // Gọi API với endpoint /items/menu/{restaurant_id}
            setMenuItems(response.data); // Lưu danh sách món ăn vào state
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    // Hàm xử lý khi chọn nhà hàng
    const handleRestaurantSelect = (restaurantId) => {
        setSelectedRestaurant(restaurantId); // Lưu nhà hàng đã chọn
        fetchMenuItems(restaurantId); // Lấy danh sách món ăn của nhà hàng đó
    };

    // Hàm xử lý khi thêm món ăn vào giỏ hàng
    const addToCart = (menuItem) => {
        setCart((prevCart) => [...prevCart, menuItem]); // Thêm món ăn vào giỏ hàng
    };

    // Hàm xử lý khi xóa món ăn khỏi giỏ hàng
    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId)); // Xóa món ăn khỏi giỏ hàng
    };

    return (
        <div>
            <h1>Danh sách Nhà Hàng</h1>
            <div>
                {restaurants.length > 0 ? (
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li
                                key={restaurant.id}
                                onClick={() => handleRestaurantSelect(restaurant.id)}
                                style={{ cursor: "pointer", marginBottom: "10px" }}
                            >
                                {restaurant.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có nhà hàng nào đang hoạt động.</p>
                )}
            </div>

            {selectedRestaurant && (
                <div>
                    <h2>Thực Đơn Của Nhà Hàng</h2>
                    <ul>
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <li key={item.id}>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Giá: {item.price}</p>
                                    <img src={item.img_url} alt={item.name} />
                                    <button onClick={() => addToCart(item)}>Thêm vào giỏ</button>
                                </li>
                            ))
                        ) : (
                            <p>Không có món ăn nào có sẵn.</p>
                        )}
                    </ul>
                </div>
            )}

            {/* Giỏ hàng */}
            <div>
                <h2>Giỏ Hàng</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Giá: {item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Xóa khỏi giỏ</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Giỏ hàng của bạn hiện tại trống.</p>
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;

