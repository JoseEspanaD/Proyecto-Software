import React from 'react';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import { useLocation } from 'react-router-dom';  
import Inicio from './Opciones/Inicio';
import Verpedidos from './Opciones/Verpedidos'; 
import './Estilo.css';
import { Container } from 'react-bootstrap';
function Opciones() {
  const location = useLocation();
  const opcionesActual = location.state?.opciones || '';
    return (
        
        <div>  
          <Sidebar />
        <div className="content"> 
          <Header />
        <Container> 
        {opcionesActual === 'Inicio' && <Inicio />}
        {opcionesActual === 'Verpedidos' && <Verpedidos />}
      </Container>
      <Footer />
        </div> 
      </div>
    );
  }
  
  export default Opciones;