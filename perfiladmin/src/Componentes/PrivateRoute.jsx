import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => { 
  const token = localStorage.getItem('authToken');
  
  // If no token exists, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  return children; 
};

export default PrivateRoute;