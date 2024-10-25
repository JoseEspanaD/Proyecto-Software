import React from 'react';
import { useLocation } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Inicio from './Opciones/Inicio';
import Verpedidos from './Opciones/Verpedidos'; 
import './Estilo.css';
import { Container } from 'react-bootstrap';
function Opciones() {
  const location = useLocation();
  const opcionesActual = location.state?.opciones || '';
    return (
        
        <div className="app-container"> 
        <Sidebar />
        <div className="content p-4">
        <Header />
        <Container> 
        {opcionesActual === 'Inicio' && <Inicio />}
        {opcionesActual === 'Verpedidos' && <Verpedidos />}
      </Container>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Opciones;