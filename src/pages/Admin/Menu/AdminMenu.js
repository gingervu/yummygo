import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import MenuItem from "../../../components/MenuItem/MenuItem";
import "./AdminMenu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminMenu = () => {
    const navigate = useNavigate();

    const [items, setItems] = useState([]); // State lưu danh sách món ăn
    const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
    const [error, setError] = useState(null); // State để lưu lỗi nếu có

    const token = localStorage.getItem("access_token");

    const handleButtonClick = () => {
        navigate("/admin-edit-menu"); // Điều hướng đến trang /admin-edit-menu
    };

    useEffect(() => {
        // Gọi API để lấy dữ liệu menu
    axios
        .get("/items/all", {
          headers: {
            Authorization: `Bearer ${token}`, // Đảm bảo gửi token trong header
          },
        })
        .then((response) => {
          console.log("Dữ liệu thực đơn trả về từ API:", response.data);
          setItems(response.data); // Lưu danh sách món ăn vào state
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi lấy dữ liệu thực đơn:", error);
          setError("Không thể tải dữ liệu từ API");
        })
        .finally(() => {
          setLoading(false); // Tắt trạng thái loading
        });
    }, []);

    const handleToggle = async (id) => {
        axios
        .put(
          `/items/change-status/${id}`,
          {}, // Body request rỗng
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        )
        .then((response) => {
          console.log("Cập nhật trạng thái món ăn thành công:", response.data);
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.item_id === id
                ? {
                    ...item,
                    status: item.status === "available" ? "unavailable" : "available",
                  }
                : item
            )
          ); // Cập nhật trạng thái trong state items
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi cập nhật trạng thái:", error);
        });
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
                    {items.map((item) => (
                        <MenuItem
                            key={item.item_id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            checked={item.status === "available"}
                            onChange={() => handleToggle(item.item_id)} // Truyền callback thay vì gọi trực tiếp
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminMenu;
