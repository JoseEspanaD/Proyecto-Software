import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, renderizar el componente protegido
  return children;
};
 
export default PrivateRoute;
