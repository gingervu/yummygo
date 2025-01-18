import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './pages/DriverHome/DriverHome.js';
import OrderDetails from './pages/OrderDetails/OrderDetails.js';
import AcceptOrder from './pages/AcceptOrder/AcceptOrder.js';
import PickupSuccess from './pages/PickupSuccess/PickupSuccess.js';
import DeliverToCustomer from './pages/DeliverToCustomer/DeliverToCustomer.js';
import DeliverySuccess from './pages/DeliverySuccess/DeliverySuccess.js';
import Profile from './pages/Profile/Profile.js';
import Home from './pages/Home/Home.js';
import Statistic from './pages/Statistic/Statistic.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/" element={<Home />} />

        {/* Các route */}
        <Route path="/driver/home" element={<ProtectedRoute element={<DriverHome />}/>} />
        <Route path="/driver/orderdetails" element={<ProtectedRoute element={<OrderDetails />}/>} />
        <Route path="/driver/orderaccept" element={<ProtectedRoute element={<AcceptOrder />}/>} />
        <Route path="/driver/pickupsuccess" element={<ProtectedRoute element={<PickupSuccess />}/>} />
        <Route path="/driver/delivertocustomer" element={<ProtectedRoute element={<DeliverToCustomer />}/>} />
        <Route path="/driver/deliverysuccess" element={<ProtectedRoute element={<DeliverySuccess />}/>} />
        <Route path="/driver/profile" element={<ProtectedRoute element={<Profile />}/>} />
        <Route path="/driver/statistic" element={<ProtectedRoute element={<Statistic />}/>} />
      </Routes>
    </Router>
  );
};

export default App;
