import React from 'react';
import './Header.css'; // Importa el archivo CSS  
import { useNavigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');  // Eliminar el token de autenticación
        navigate('/');  // Redirigir al login
    };
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* Logotipo en la parte izquierda */}
                <a className="navbar-brand" href="#"> 
                </a>

                <Button onClick={handleLogout} variant="outline-danger">Cerrar sesión</Button>
                <a href="/Register"><Button  variant="outline-info">Nuevo Administrador</Button></a>
                
                {/* Opciones centradas */}
                 
                 
            </div>
        </nav>
    );
}

export default Header;