import { elements } from "chart.js";
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem("access_token");  // Check if user is logged in
  
    if (!token) {
      // If no token, redirect to the login page
      return <Navigate to="/" />;
    }
  
    // If logged in, render the element passed to ProtectedRoute
    return element;
  };
  
  export default ProtectedRoute;
