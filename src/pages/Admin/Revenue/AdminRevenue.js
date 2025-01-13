import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminRevenue.css";
import Toggle from "../../../components/Toggle/Toggle";


const AdminRevenue = () => {
  return (
    <div className="admin-revenue">
      {/* Header */}
      <Header />
      <Sidebar />
      {/* Nội dung chính */}
      <main>
        
      </main>
    </div>
  );
};

export default AdminRevenue;