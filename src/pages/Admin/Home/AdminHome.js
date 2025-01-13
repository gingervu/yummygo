import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminHome.css";
import Toggle from "../../../components/Toggle/Toggle";



const AdminHome = () => {
  
  return (
    <div className="admin-home">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        <div className="restaurant-status">
        <span className="restaurant-name">Nhà hàng Yummy</span>
        <Toggle />
        </div>
      </main>
    </div>
  );
};

export default AdminHome;