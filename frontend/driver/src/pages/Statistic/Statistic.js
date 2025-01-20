import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Statistic.css";
import Sidebar from "../../components/Sidebar/Sidebar";

const Statistic = () => {

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
