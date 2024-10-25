import React from 'react'; 
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header'; 
import Inicio from './Opciones/Inicio'
import { Container, Button } from 'react-bootstrap';
import './Estilo.css';
function Principal() {
    return (
     
      <div className="app-container">
        <Sidebar />
        <div className="content p-4">
        <Header />
        <Inicio />
        </div>
        <Footer />
      </div>
       
    );
  }
  export default Principal;