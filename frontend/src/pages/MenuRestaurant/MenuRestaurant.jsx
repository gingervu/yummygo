import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import "./MenuRestaurant.css";

const MenuRestaurant = () => {
    const { restaurant_id } = useParams(); // Lấy restaurant_id từ URL
    const [menuItems, setMenuItems] = useState([]); // Danh sách món ăn
    const [cart, setCart] = useState([]); // Giỏ hàng
    const [error, setError] = useState("");

    // Lấy danh sách món ăn của nhà hàng
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axiosInstance.get(`/items/menu/${restaurant_id}`);
                setMenuItems(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
                setError("Không thể tải danh sách món ăn.");
            }
        };
        fetchMenuItems();
    }, [restaurant_id]);

    // API Thêm món vào giỏ hàng
    const handleAddToCart = async (menuItem) => {
        try {
            const response = await axiosInstance.put(`/customers/send-order/${menuItem.item_id}`);
            const updatedCart = [...cart, response.data];
            setCart(updatedCart);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setError("Không thể thêm món vào giỏ hàng.");
        }
    };

    // API Xóa món khỏi giỏ hàng
    const handleRemoveFromCart = async (item_id) => {
        try {
            await axiosInstance.delete(`/items/delete/${item_id}`);
            setCart((prevCart) => prevCart.filter((item) => item.item_id !== item_id));
        } catch (error) {
            console.error("Error removing item from cart:", error);
            setError("Không thể xóa món khỏi giỏ hàng.");
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
                                <button onClick={() => handleAddToCart(item)}>Thêm vào giỏ</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có món ăn nào có sẵn.</p>
                )}
            </div>

            <div style={{ marginTop: "20px" }}>
                <h2>Giỏ Hàng</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.item_id}>
                                <h3>{item.name}</h3>
                                <p>Giá: {item.price} VND</p>
                                <button onClick={() => handleRemoveFromCart(item.item_id)}>Xóa khỏi giỏ</button>
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
