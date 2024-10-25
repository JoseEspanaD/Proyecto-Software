import React from 'react';
import { useLocation } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Categorianueva from './Formularios/Categorianueva';
import Productonuevo from './Formularios/Productonuevo'; 
import './Estilo.css';
import { Container } from 'react-bootstrap';
function Formularios() {
  const location = useLocation();
  const formularioActual = location.state?.formulario || '';
    return (
        
        <div className="app-container"> 
        <Sidebar />
        <div className="content p-4">
        <Header />
        <Container> 
        {formularioActual === 'categoria' && <Categorianueva />}
        {formularioActual === 'Productos' && <Productonuevo />}
      </Container>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default Formularios;