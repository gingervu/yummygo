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
            const response = await axiosInstance.get(`/items/available/${restaurant_id}`);
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../services/axiosConfig";

// const FoodDisplay = () => {
//     const [restaurants, setRestaurants] = useState([]); // Danh sách nhà hàng
//     const navigate = useNavigate();

//     // Lấy danh sách nhà hàng đang hoạt động
//     useEffect(() => {
//         const fetchActiveRestaurants = async () => {
//             try {
//                 const response = await axiosInstance.get("/restaurants/active");
//                 setRestaurants(response.data);
//             } catch (error) {
//                 console.error("Error fetching active restaurants:", error);
//             }
//         };
//         fetchActiveRestaurants();
//     }, []);

//     // Xử lý khi chọn nhà hàng và chuyển đến trang thực đơn
//     const handleRestaurantSelect = (restaurant_id) => {
//         navigate(`/menu/${restaurant_id}`); // Chuyển hướng đến MenuRestaurant với restaurant_id
//     };

//     return (
//         <div>
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
//         </div>
//     );
// };

// export default FoodDisplay;


