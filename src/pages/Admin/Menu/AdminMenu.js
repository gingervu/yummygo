import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

import MenuItem from "../../../components/MenuItem/MenuItem";
import "./AdminMenu.css";
import { useNavigate } from "react-router-dom";


const AdminMenu = () => {

    const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleButtonClick = () => {
    navigate("/admin-edit-menu"); // Điều hướng đến trang /
  };
  
    const [items, setItems] = useState([
        { id: 1, name: 'Tên món 1', description: 'Miêu tả', price: 40000, isToggled: true },
        { id: 2, name: 'Tên món 2', description: 'Miêu tả', price: 50000, isToggled: true },
        { id: 3, name: 'Tên món 3', description: 'Miêu tả', price: 35000, isToggled: true },
        { id: 4, name: 'Tên món 4', description: 'Miêu tả', price: 30000, isToggled: false },
        { id: 5, name: 'Tên món 5', description: 'Miêu tả', price: 40000, isToggled: true },
    ]);

    const handleToggle = (id) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, isToggled: !item.isToggled } : item
        ));
    };

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
                    key={item.id} 
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