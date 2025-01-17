import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Statistic.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";  // Chỉ cần nếu bạn sử dụng axios
// import Toggle from "../../components/Toggle/Toggle"; // Loại bỏ nếu không sử dụng

const Statistic = () => {
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        if (token) {
            axios.get("/api/statistic", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                console.log(response.data); // Xử lý dữ liệu nhận được
            })
            .catch(error => {
                console.error("Error fetching data", error);
            });
        }
    }, [token]);  // Đảm bảo token được khai báo trong dependency array

    return (
        <div className="statistic">
            {/* Header */}
            <Header />
            <Sidebar />
            {/* Nội dung chính */}
        </div>
    );
};

export default Statistic;
