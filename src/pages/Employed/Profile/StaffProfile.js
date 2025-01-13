import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import StaffSidebar from "../../../components/StaffSidebar/StaffSidebar";
import "./StaffProfile.css";



const StaffProfile = () => {


  const initialItems = [
    { label: "Tên quán", value: "Lotteria Nguyễn Tuân" },
    { label: "Phân loại", value: "Gà rán – Burger" },
    { label: "Địa chỉ", value: "82 Nguyễn Tuân, Thanh Xuân Trung,…" },
    { label: "SDT", value: "0123456789" },
  ];

  const [items] = useState(initialItems);

  return (
    <div className="staff-profile">
      {/* Header */}
      <Header />
      <StaffSidebar />
      {/* Nội dung chính */}
      <main>
        <h2>Hồ sơ quán</h2>
        <div className="container">
        {items.map((item, index) => (
            <div className="info-item" key={index}>
              <span className="label">{item.label}: </span>
              <span className="value">{item.value}</span>
            </div>
          ))}
          
        </div>
      </main>
    </div>
  );
};

export default StaffProfile;