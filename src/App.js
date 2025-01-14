import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './pages/DriverHome/DriverHome.js';
import OrderDetails from './pages/OrderDetails/OrderDetails.js';
import AcceptOrder from './pages/AcceptOrder/AcceptOrder.js';
import PickupSuccess from './pages/PickupSuccess/PickupSuccess.js';
import DeliverToCustomer from './pages/DeliverToCustomer/DeliverToCustomer.js';
import DeliverySuccess from './pages/DeliverySuccess/DeliverySuccess.js';
import Home from './pages/Home/Home.js';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/" element={<Home />} />

        {/* Các route */}
        <Route path="/home" element={<DriverHome />} />
        <Route path="/orderdetails" element={<OrderDetails />} />
        <Route path="/orderaccept" element={<AcceptOrder />} />
        <Route path="/pickupsuccess" element={<PickupSuccess />} />
        <Route path="/delivertocustomer" element={<DeliverToCustomer />} />
        <Route path="/deliverysuccess" element={<DeliverySuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
