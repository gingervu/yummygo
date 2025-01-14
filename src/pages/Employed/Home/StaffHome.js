import React from "react";
import Header from "../../../components/Header/Header";
import StaffSidebar from "../../../components/StaffSidebar/StaffSidebar";
import "./StaffHome.css";
import Toggle from "../../../components/Toggle/Toggle";



const StaffHome = () => {
  return (
    <div className="staff-home">
      {/* Header */}
      <Header />
      <StaffSidebar />
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

export default StaffHome;