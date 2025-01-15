// // import React, { useContext } from 'react'
// // import './FoodDisplay.css'
// // import { StoreContext } from '../../context/StoreContext'
// // import FoodItem from '../FoodItem/FoodItem'

// // const FoodDisplay = ({ category }) => {
// //     const { food_list } = useContext(StoreContext)
// //     return (
// //         <div className='food-display' id='food-display'>
// //             <h2>
// //                 Những món ăn/nhà hàng gần chỗ bạn
// //             </h2>
// //             <div className='food-display-list'>
// //                 {food_list.map((item, index) => {
// //                     if (category==="All" || category===item.category) {
// //                         return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
// //                     }

// //                 })}
// //             </div>
// //         </div>
// //     )
// // }

// // export default FoodDisplay



// // // lấy danh sách nhà hàng
// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "../../services/axiosConfig"; // Import axios instance đã cấu hình

// // const FoodDisplay = () => {
// //     const [restaurants, setRestaurants] = useState([]); // Lưu trữ danh sách nhà hàng
// //     const [menuItems, setMenuItems] = useState([]); // Lưu trữ danh sách món ăn của nhà hàng
// //     const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
// //     const [cart, setCart] = useState([]); // Giỏ hàng

// //     // Lấy danh sách các nhà hàng active
// //     useEffect(() => {
// //       const fetchActiveRestaurants = async () => {
// //         try {
// //           const response = await axiosInstance.get("/restaurants/active");
// //           setRestaurants(response.data); // Lưu danh sách nhà hàng vào state
// //         } catch (error) {
// //           console.error("Error fetching active restaurants:", error);
// //         }
// //       };

// //       fetchActiveRestaurants();
// //     }, []);

// //     // Lấy danh sách món ăn của nhà hàng khi người dùng chọn
// //     const fetchMenuItems = async (restaurantId) => {
// //       try {
// //         const response = await axiosInstance.get(`/items/available/${restaurantId}`);
// //         setMenuItems(response.data); // Lưu danh sách món ăn vào state
// //       } catch (error) {
// //         console.error("Error fetching menu items:", error);
// //       }
// //     };

// //     // Hàm xử lý khi chọn nhà hàng
// //     const handleRestaurantSelect = (restaurantId) => {
// //       setSelectedRestaurant(restaurantId); // Lưu nhà hàng đã chọn
// //       fetchMenuItems(restaurantId); // Lấy danh sách món ăn của nhà hàng đó
// //     };

// //     // Hàm xử lý khi thêm món ăn vào giỏ hàng
// //     const addToCart = (menuItem) => {
// //       setCart((prevCart) => [...prevCart, menuItem]); // Thêm món ăn vào giỏ hàng
// //     };

// //     // Hàm xử lý khi xóa món ăn khỏi giỏ hàng
// //     const removeFromCart = (itemId) => {
// //       setCart(cart.filter(item => item.id !== itemId)); // Xóa món ăn khỏi giỏ hàng
// //     };

// //     return (
// //       <div>
// //         <h1>Danh sách Nhà Hàng</h1>
// //         <div>
// //           {restaurants.length > 0 ? (
// //             <ul>
// //               {restaurants.map((restaurant) => (
// //                 <li key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
// //                   {restaurant.name}
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <p>Không có nhà hàng nào đang hoạt động.</p>
// //           )}
// //         </div>

// //         {selectedRestaurant && (
// //           <div>
// //             <h2>Thực Đơn Của Nhà Hàng</h2>
// //             <ul>
// //               {menuItems.length > 0 ? (
// //                 menuItems.map((item) => (
// //                   <li key={item.id}>
// //                     <h3>{item.name}</h3>
// //                     <p>{item.description}</p>
// //                     <p>Giá: {item.price}</p>
// //                     <img src={item.img_url} alt={item.name} />
// //                     <button onClick={() => addToCart(item)}>Thêm vào giỏ</button>
// //                   </li>
// //                 ))
// //               ) : (
// //                 <p>Không có món ăn nào có sẵn.</p>
// //               )}
// //             </ul>
// //           </div>
// //         )}

// //         {/* Giỏ hàng */}
// //         <div>
// //           <h2>Giỏ Hàng</h2>
// //           {cart.length > 0 ? (
// //             <ul>
// //               {cart.map((item, index) => (
// //                 <li key={index}>
// //                   <h3>{item.name}</h3>
// //                   <p>{item.description}</p>
// //                   <p>Giá: {item.price}</p>
// //                   <button onClick={() => removeFromCart(item.id)}>Xóa khỏi giỏ</button>
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <p>Giỏ hàng của bạn hiện tại trống.</p>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// // export default FoodDisplay;

// LẤY ĐƯỢC ID NHÀ HÀNG NHƯNG CHƯA HIỂN THỊ MENU NHÀ HÀNG ĐÓ

// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../services/axiosConfig"; // Import axios instance đã cấu hình

// const FoodDisplay = () => {
//     const [restaurants, setRestaurants] = useState([]); // Lưu trữ danh sách nhà hàng
//     const [menuItems, setMenuItems] = useState([]); // Lưu trữ danh sách món ăn của nhà hàng
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
//     const [cart, setCart] = useState([]); // Giỏ hàng

//     // Lấy danh sách các nhà hàng active
//     useEffect(() => {
//         const fetchActiveRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get("/restaurants/active");
//                 setRestaurants(response.data); // Lưu danh sách nhà hàng vào state
//             } catch (error) {
//                 console.error("Error fetching active restaurants:", error);
//             }
//         };

//         fetchActiveRestaurants();
//     }, []);

//     // Lấy danh sách món ăn của nhà hàng khi người dùng chọn
//     const fetchMenuItems = async (restaurant_id) => {
//         try {
//             console.log("Fetching menu items for restaurant_id:", restaurant_id); // Log giá trị restaurant_id
//             const response = await axiosInstance.get(`/items/menu/${restaurant_id}`); // Gọi API với endpoint /items/menu/{restaurant_id}
//             setMenuItems(response.data); // Lưu danh sách món ăn vào state
//         } catch (error) {
//             console.error("Error fetching menu items:", error);
//         }
//     };

//     // Hàm xử lý khi chọn nhà hàng
//     const handleRestaurantSelect = (restaurant_id) => {
//         console.log("Selected restaurant_id:", restaurant_id); // Ghi lại ID của nhà hàng
//         setSelectedRestaurant(restaurant_id); // Lưu nhà hàng đã chọn
//         fetchMenuItems(restaurant_id); // Lấy danh sách món ăn của nhà hàng đó
//     };

//     // Hàm xử lý khi thêm món ăn vào giỏ hàng
//     const addToCart = (menuItem) => {
//         setCart((prevCart) => [...prevCart, menuItem]); // Thêm món ăn vào giỏ hàng
//     };

//     // Hàm xử lý khi xóa món ăn khỏi giỏ hàng
//     const removeFromCart = (itemId) => {
//         setCart(cart.filter(item => item.id !== itemId)); // Xóa món ăn khỏi giỏ hàng
//     };

//     return (
//         <div>
//             <h1>Danh sách Nhà Hàng</h1>
//             <div>
//                 {restaurants.length > 0 ? (
//                     <ul>
//                         {restaurants.map((restaurant) => (
//                             <li
//                                 key={restaurant.restaurant_id} // Sử dụng restaurant_id làm key
//                                 onClick={() => handleRestaurantSelect(restaurant.restaurant_id)} // Truyền đúng restaurant_id
//                                 style={{ cursor: "pointer", marginBottom: "10px" }}
//                             >
//                                 {restaurant.name}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Không có nhà hàng nào đang hoạt động.</p>
//                 )}
//             </div>

//             {selectedRestaurant && (
//                 <div>
//                     <h2>Thực Đơn Của Nhà Hàng</h2>
//                     <ul>
//                         {menuItems.length > 0 ? (
//                             menuItems.map((item) => (
//                                 <li key={item.id}>
//                                     <h3>{item.name}</h3>
//                                     <p>{item.description}</p>
//                                     <p>Giá: {item.price}</p>
//                                     <img src={item.img_url} alt={item.name} />
//                                     <button onClick={() => addToCart(item)}>Thêm vào giỏ</button>
//                                 </li>
//                             ))
//                         ) : (
//                             <p>Không có món ăn nào có sẵn.</p>
//                         )}
//                     </ul>
//                 </div>
//             )}

//             {/* Giỏ hàng */}
//             <div>
//                 <h2>Giỏ Hàng</h2>
//                 {cart.length > 0 ? (
//                     <ul>
//                         {cart.map((item, index) => (
//                             <li key={index}>
//                                 <h3>{item.name}</h3>
//                                 <p>{item.description}</p>
//                                 <p>Giá: {item.price}</p>
//                                 <button onClick={() => removeFromCart(item.id)}>Xóa khỏi giỏ</button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Giỏ hàng của bạn hiện tại trống.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FoodDisplay;


// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../services/axiosConfig"; // Import axios instance đã cấu hình

// const FoodDisplay = () => {
//     const [restaurants, setRestaurants] = useState([]); // Lưu trữ danh sách nhà hàng
//     const [menuItems, setMenuItems] = useState([]); // Lưu trữ danh sách món ăn của nhà hàng
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
//     const [selectedMenuItem, setSelectedMenuItem] = useState(null); // Món ăn được chọn
//     const [cart, setCart] = useState([]); // Giỏ hàng

//     // Lấy danh sách các nhà hàng active
//     useEffect(() => {
//         const fetchActiveRestaurants = async () => {
//             try {
//                 console.log("Fetching active restaurants...");
//                 const response = await axiosInstance.get("/restaurants/active");
//                 console.log("Active restaurants fetched:", response.data);
//                 setRestaurants(response.data); // Lưu danh sách nhà hàng vào state
//             } catch (error) {
//                 console.error("Error fetching active restaurants:", error);
//             }
//         };

//         fetchActiveRestaurants();
//     }, []);

//     // Lấy danh sách món ăn có sẵn của nhà hàng khi người dùng chọn
//     const fetchMenuItems = async (restaurant_id) => {
//         try {
//             console.log(`Fetching menu items for restaurant ${restaurant_id}...`);
//             const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
//             console.log("Menu items fetched:", response.data); // In ra dữ liệu menuItems
//             setMenuItems(response.data); // Lưu danh sách món ăn vào state
//         } catch (error) {
//             console.error(`Error fetching menu items for restaurant ${restaurant_id}:`, error);
//         }
//     };

//     // Hàm xử lý khi chọn nhà hàng
//     const handleRestaurantSelect = (restaurant_id) => {
//         console.log(`Restaurant selected: ${restaurant_id}`);
//         setSelectedRestaurant(restaurant_id); // Lưu nhà hàng đã chọn
//         fetchMenuItems(restaurant_id); // Lấy danh sách món ăn có sẵn của nhà hàng đó
//         setSelectedMenuItem(null); // Xóa món ăn đang được chọn
//     };

//     // Hàm xử lý khi chọn một món ăn để xem chi tiết
//     const handleMenuItemSelect = (menuItem) => {
//         console.log("Selected menu item:", menuItem);
//         setSelectedMenuItem(menuItem); // Lưu món ăn được chọn vào state
//     };

//     // Hàm xử lý khi thêm món ăn vào giỏ hàng
//     const addToCart = (menuItem) => {
//         console.log("Adding to cart:", menuItem);
//         setCart((prevCart) => [...prevCart, menuItem]); // Thêm món ăn vào giỏ hàng
//     };

//     // Hàm xử lý khi xóa món ăn khỏi giỏ hàng
//     const removeFromCart = (item_id) => {
//         console.log("Removing from cart:", item_id);
//         setCart((prevCart) => prevCart.filter((item) => item.item_id !== item_id));
//     };

//     return (
//         <div>
//             {/* Danh sách Nhà Hàng */}
//             <h1>Danh sách Nhà Hàng</h1>
//             <div>
//                 {restaurants.length > 0 ? (
//                     <ul>
//                         {restaurants.map((restaurant) => (
//                             <li
//                                 key={restaurant.restaurant_id}
//                                 onClick={() => handleRestaurantSelect(restaurant.restaurant_id)}
//                                 style={{ cursor: "pointer", marginBottom: "10px" }}
//                             >
//                                 {restaurant.name}
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Không có nhà hàng nào đang hoạt động.</p>
//                 )}
//             </div>

//             {/* Thực Đơn Của Nhà Hàng */}
//             {selectedRestaurant && (
//                 <div>
//                     <h2>Thực Đơn Của Nhà Hàng</h2>
//                     <div className="menu-items">
//                         {menuItems.length > 0 ? (
//                             menuItems.map((item) => (
//                                 <div
//                                     key={item.item_id}
//                                     className="menu-item"
//                                     style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}
//                                     onClick={() => handleMenuItemSelect(item)} // Nhấn để xem chi tiết món ăn
//                                 >
//                                     <h3>{item.name}</h3>
//                                     <p><strong>Giá:</strong> {item.price} VND</p>
//                                     <button onClick={(e) => { e.stopPropagation(); addToCart(item); }}>Thêm vào giỏ</button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>Không có món ăn nào có sẵn.</p>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* Chi tiết món ăn */}
//             {selectedMenuItem && (
//                 <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #aaa" }}>
//                     <h2>Chi Tiết Món Ăn</h2>
//                     <h3>{selectedMenuItem.name}</h3>
//                     <p>{selectedMenuItem.description || "Không có mô tả."}</p>
//                     <p><strong>Giá:</strong> {selectedMenuItem.price} VND</p>
//                     {selectedMenuItem.img_url ? (
//                         <img
//                             src={selectedMenuItem.img_url}
//                             alt={selectedMenuItem.name}
//                             style={{ maxWidth: "100%", height: "auto" }}
//                         />
//                     ) : (
//                         <p>Không có hình ảnh.</p>
//                     )}
//                     <button onClick={() => addToCart(selectedMenuItem)}>Thêm vào giỏ</button>
//                 </div>
//             )}

//             {/* Giỏ hàng */}
//             <div>
//                 <h2>Giỏ Hàng</h2>
//                 {cart.length > 0 ? (
//                     <ul>
//                         {cart.map((item) => (
//                             <li key={item.item_id}>
//                                 <h3>{item.name}</h3>
//                                 <p>{item.description || "Không có mô tả."}</p>
//                                 <p>Giá: {item.price} VND</p>
//                                 <button onClick={() => removeFromCart(item.item_id)}>Xóa khỏi giỏ</button>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Giỏ hàng của bạn hiện tại trống.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FoodDisplay;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";

const FoodDisplay = () => {
    const [restaurants, setRestaurants] = useState([]); // Danh sách nhà hàng
    const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
    const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Nhà hàng được chọn
    const [selectedMenuItem, setSelectedMenuItem] = useState(null); // Món ăn được chọn
    const [cart, setCart] = useState([]); // Giỏ hàng

    // Lấy danh sách nhà hàng đang hoạt động
    useEffect(() => {
        const fetchActiveRestaurants = async () => {
            try {
                const response = await axiosInstance.get("/restaurants/active");
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching active restaurants:", error);
            }
        };
        fetchActiveRestaurants();
    }, []);

    // Lấy danh sách món ăn available của nhà hàng
    const fetchMenuItems = async (restaurant_id) => {
        try {
            const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error(`Error fetching menu items for restaurant ${restaurant_id}:`, error);
        }
    };

    // Xử lý khi chọn nhà hàng
    const handleRestaurantSelect = (restaurant_id) => {
        setSelectedRestaurant(restaurant_id);
        fetchMenuItems(restaurant_id); // Gọi API lấy danh sách món ăn
        setSelectedMenuItem(null);
    };

    // Xử lý khi chọn món ăn để xem chi tiết
    const handleMenuItemSelect = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    // Xử lý thêm món ăn vào giỏ hàng
    const addToCart = (menuItem) => {
        setCart((prevCart) => [...prevCart, menuItem]);
    };

    // Xử lý xóa món ăn khỏi giỏ hàng
    const removeFromCart = (item_id) => {
        setCart((prevCart) => prevCart.filter((item) => item.item_id !== item_id));
    };

    return (
        <div>
            <h1>Danh sách Nhà Hàng</h1>
            <div>
                {restaurants.length > 0 ? (
                    <ul>
                        {restaurants.map((restaurant) => (
                            <li
                                key={restaurant.restaurant_id}
                                onClick={() => handleRestaurantSelect(restaurant.restaurant_id)}
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
                    <div className="menu-items">
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <div
                                    key={item.item_id}
                                    className="menu-item"
                                    style={{
                                        marginBottom: "20px",
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                    onClick={() => handleMenuItemSelect(item)}
                                >
                                    <h3>{item.name}</h3>
                                    <p><strong>Giá:</strong> {item.price} VND</p>
                                    <button onClick={(e) => { e.stopPropagation(); addToCart(item); }}>Thêm vào giỏ</button>
                                </div>
                            ))
                        ) : (
                            <p>Không có món ăn nào có sẵn.</p>
                        )}
                    </div>
                </div>
            )}

            {selectedMenuItem && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #aaa" }}>
                    <h2>Chi Tiết Món Ăn</h2>
                    <h3>{selectedMenuItem.name}</h3>
                    <p>{selectedMenuItem.description || "Không có mô tả."}</p>
                    <p><strong>Giá:</strong> {selectedMenuItem.price} VND</p>
                    {selectedMenuItem.img_url ? (
                        <img
                            src={selectedMenuItem.img_url}
                            alt={selectedMenuItem.name}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    ) : (
                        <p>Không có hình ảnh.</p>
                    )}
                    <button onClick={() => addToCart(selectedMenuItem)}>Thêm vào giỏ</button>
                </div>
            )}

            <div>
                <h2>Giỏ Hàng</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.item_id}>
                                <h3>{item.name}</h3>
                                <p>{item.description || "Không có mô tả."}</p>
                                <p>Giá: {item.price} VND</p>
                                <button onClick={() => removeFromCart(item.item_id)}>Xóa khỏi giỏ</button>
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


