import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./Statistic.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Toggle from "../../components/Toggle/Toggle";

const Statistic = () => {

    const token = localStorage.getItem("access_token");
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
