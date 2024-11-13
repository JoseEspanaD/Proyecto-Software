import './Header.css'; 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';  
import Nav from 'react-bootstrap/Nav';
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
                {/* Opciones centradas */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav"> 
                        <NavLink className="nav-link text-white" to="/Register"><Button  variant="outline-info">Nuevo Administrador</Button></NavLink>
                        <Button  onClick={handleLogout} variant="outline-danger">Cerrar sesión</Button>  {' '} 
                          
                    </div>
                </div>

                 
            </div>
        </nav>
    );
}

export default Header; 