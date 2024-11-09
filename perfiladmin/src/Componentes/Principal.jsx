import React from 'react';   
import Inicio from './Opciones/Inicio'
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import { Container, Button } from 'react-bootstrap';
import './Estilo.css';
function Principal() {
    return (
     <div> 
      <div >
       <Sidebar />
        <div className="content "> 
        <Header />
        <Container>
        <Inicio />
        </Container>
        <Footer />
        </div> 
      </div>
      </div>
       
    );
  }
  export default Principal;