// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem('role')?.trim();

  if (!role) {
    // If role is not available, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // If the user's role is not allowed, redirect to unauthorized page or login
    return <Navigate to="/login" replace />;
  }

  // If the user's role matches, render the component
  return children;
};

export default ProtectedRoute;
