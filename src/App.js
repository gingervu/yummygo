import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './pages/Driver/DriverHome.js';
import OrderWaiting from './pages/Driver/OrderWaiting.js';
import OrderFound from './pages/Driver/OrderFound.js';
import OrderDetails from './pages/Driver/OrderDetails.js';
import AcceptOrder from './pages/Driver/AcceptOrder.js';
import RejectOrder from './pages/Driver/RejectOrder.js';
import PickupSuccess from './pages/Driver/PickupSuccess.js';
import DeliverToCustomer from './pages/Driver/DeliverToCustomer.js';
import DeliverySuccess from './pages/Driver/DeliverySuccess.js';
import OrderNotFound from './pages/Driver/OrderNotFound.js';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/driver" element={<DriverHome />} />

        {/* Các route liên quan đến đơn hàng */}
        <Route path="/driver/orderwaiting" element={<OrderWaiting />} />
        <Route path="/driver/orderfound" element={<OrderFound />} />
        <Route path="/driver/ordernotfound" element={<OrderNotFound />} />
        <Route path="/driver/orderdetails/:id" element={<OrderDetails />} />
        <Route path="/driver/orderaccept" element={<AcceptOrder />} />
        <Route path="/driver/orderreject" element={<RejectOrder />} />
        <Route path="/driver/pickupsuccess" element={<PickupSuccess />} />
        <Route path="/driver/delivertocustomer" element={<DeliverToCustomer />} />
        <Route path="/driver/deliverysuccess" element={<DeliverySuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
