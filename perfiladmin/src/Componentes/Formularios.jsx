import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import Categorianueva from './Formularios/Categorianueva';
import Productonuevo from './Formularios/Productonuevo'; 
import Perfiladmin from './Formularios/Perfiladmin';
import Clientenuevo from './Formularios/Clientenuevo';
import ZonasMunicipios from './Formularios/ZonasMunicipios';
import './Estilo.css';
import { Container } from 'react-bootstrap';

function Formularios() {
  const location = useLocation();
  const navigate = useNavigate();
  const formularioActual = location.state?.formulario || '';

  // Verificar si el usuario tiene un token válido
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
    if (!token) {
      // Si no hay token, redirige al login
      navigate('/');
      return;
    }
 
  }, [navigate]);

  return (
    <div>
      <Sidebar />
      <div className="content">
        <Header />
        <Container>
          {formularioActual === 'categoria' && <Categorianueva />}
          {formularioActual === 'Productos' && <Productonuevo />}
          {formularioActual === 'Perfiladmin' && <Perfiladmin />}
          {formularioActual === 'cliente' && <Clientenuevo />}
          {formularioActual === 'zonas' && <ZonasMunicipios />}
        </Container>
        <br></br><br></br>
      </div>
      <Footer />
    </div>
  );
}

export default Formularios;
