import React from 'react';
import { useLocation } from 'react-router-dom'; 
//import Sidebar from './Elementos/Sidebar'; 
//import Footer from './Elementos/Footer';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import Categorianueva from './Formularios/Categorianueva';
import Productonuevo from './Formularios/Productonuevo'; 
import './Estilo.css';
import { Container } from 'react-bootstrap';
function Formularios() {
  const location = useLocation();
  const formularioActual = location.state?.formulario || '';
    return (
        
        <div > 
        <Sidebar />
        <div className="content ">
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