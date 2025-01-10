import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './pages/Driver/DriverHome.js';
import OrderDetails from './pages/Driver/OrderDetails.js';
import AcceptOrder from './pages/Driver/AcceptOrder.js';
import PickupSuccess from './pages/Driver/PickupSuccess.js';
import DeliverToCustomer from './pages/Driver/DeliverToCustomer.js';
import DeliverySuccess from './pages/Driver/DeliverySuccess.js';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/" element={<DriverHome />} />

        {/* Các route */}
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
