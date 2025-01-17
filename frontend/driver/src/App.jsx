import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DriverHome from './pages/DriverHome/DriverHome.jsx';
import OrderDetails from './pages/OrderDetails/OrderDetails.jsx';
import AcceptOrder from './pages/AcceptOrder/AcceptOrder.jsx';
import PickupSuccess from './pages/PickupSuccess/PickupSuccess.jsx';
import DeliverToCustomer from './pages/DeliverToCustomer/DeliverToCustomer.jsx';
import DeliverySuccess from './pages/DeliverySuccess/DeliverySuccess.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Home from './pages/Home/Home.jsx';
import Statistic from './pages/Statistic/Statistic.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính Driver */}
        <Route path="/driver" element={<Home />} />

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
