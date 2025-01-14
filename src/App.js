import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.js';
import AdminHome from './pages/Admin/Home/AdminHome.js';
import AdminOrders from './pages/Admin/Orders/AdminOrders.js';
import AdminOrderDetails from './pages/Admin/Orders/AdminOrderDetails.js';
import AdminMenu from './pages/Admin/Menu/AdminMenu.js';
import EditMenu from './pages/Admin/Menu/EditMenu.js';
import AdminStaff from './pages/Admin/Staff/AdminStaff.js';
import AdminRevenue from './pages/Admin/Revenue/AdminRevenue.js';
import AdminProfile from './pages/Admin/Profile/AdminProfile.js';
import StaffHome from './pages/Employed/Home/StaffHome.js';
import StaffMenu from './pages/Employed/Menu/StaffMenu.js';
import StaffProfile from './pages/Employed/Profile/StaffProfile.js';
import StaffOrders from './pages/Employed/Orders/StaffOrders.js';
import StaffOrderDetails from './pages/Employed/Orders/StaffOrderDetails.js';


const App = () => {
  

  return (
    

<Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/" element={<Home />} />

        {/* Các route */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/admin-order-details" element={<AdminOrderDetails />} />
        <Route path="/admin-menu" element={<AdminMenu />} />
        <Route path="/admin-edit-menu" element={<EditMenu />} />
        <Route path="/admin-staff" element={<AdminStaff />} />
        <Route path="/admin-revenue" element={<AdminRevenue />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/staff" element={<StaffHome />} />
        <Route path="/staff-menu" element={<StaffMenu />} />
        <Route path="/staff-orders" element={<StaffOrders />} />
        <Route path="/staff-order-details" element={<StaffOrderDetails />} />
        <Route path="/staff-profile" element={<StaffProfile />} />
      </Routes>
    </Router>
    
  );
};




export default App;