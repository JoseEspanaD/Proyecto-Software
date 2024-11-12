import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    console.log('Token:', token); // Verifica el token

    // Si no hay token, redirigir a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/" />;
    }

    return children; // Si hay token, renderizar los hijos
};

export default PrivateRoute; 