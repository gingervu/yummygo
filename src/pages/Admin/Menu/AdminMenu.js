import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MenuItem from "../../../components/MenuItem/MenuItem";
import "./AdminMenu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios để gọi API

const AdminMenu = () => {
    const navigate = useNavigate(); // Khởi tạo hook navigate

    const [items, setItems] = useState([]); // State lưu danh sách món ăn
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
    const [error, setError] = useState(null); // State để lưu lỗi nếu có

    const handleButtonClick = () => {
        navigate("/admin-edit-menu"); // Điều hướng đến trang /admin-edit-menu
    };

    useEffect(() => {
        // Gọi API để lấy dữ liệu menu
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
                const response = await axios.get("/items/all", {
                    headers: {
                        Authorization: `Bearer ${token}` // Thêm Authorization vào header
                    }
                }); // Gọi API
                setItems(response.data); // Cập nhật state với dữ liệu từ API
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu: ", err);
                setError("Không thể tải dữ liệu từ API");
            } finally {
                setLoading(false); // Tắt trạng thái loading
            }
        };

        fetchItems();
    }, []);

    const handleToggle = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, isToggled: !item.isToggled } : item
        ));
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className="admin-menu">
            <Header />
            <Sidebar />
            <main>
                <h2>Thực đơn quán</h2>
                <button className="change-btn" onClick={handleButtonClick}>
                    Chỉnh sửa thực đơn
                </button>
                <div className="items-container">
                    {items.map(item => (
                        <MenuItem 
                            key={item.item_id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            isToggled={item.isToggled} 
                            onToggle={() => handleToggle(item.id)} 
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminMenu;
