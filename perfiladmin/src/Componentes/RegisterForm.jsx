import React from 'react';
import { useLocation } from 'react-router-dom';  
import Register from './Formularios/RegisterForm';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import './Estilo.css';
import { Container } from 'react-bootstrap';
function Formularios() {
  const location = useLocation();
  const formularioActual = location.state?.formulario || '';
    return (
        
        <div >  
          <Sidebar />
        <div className="content"> 
          <Header />
        <Container> 
        <Register />
      </Container>
      <Footer />
        </div> 
      </div>
    );
  }
  
  export default Formularios;
