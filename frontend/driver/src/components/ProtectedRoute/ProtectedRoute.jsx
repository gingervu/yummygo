// frontend/driver/src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage

  return isAuthenticated ? element : <Navigate to="/driver/login" />;
};

export default ProtectedRoute;
