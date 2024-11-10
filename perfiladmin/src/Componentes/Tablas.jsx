import React from 'react';  
import { useLocation } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import Clientestabla from './Tablas/Clientestabla';
import Enproceso from './Tablas/Enproceso';
import Entregados from './Tablas/Entregados';
import Sinver from './Tablas/Sinver'; 
import Admintabla from './Tablas/Admintabla';
import Categorias from './Tablas/Cateogorias';
import './Estilo.css';
function Tablas() {
  const location = useLocation();
  const tablaActual = location.state?.tablas || '';
    return (
     
      <div > 
        <Sidebar />
        <div className="content  "> 
        <Header />
        <Container> <br></br> 
        {tablaActual === 'Clientes' && <Clientestabla />}
        {tablaActual === 'Enproceso' && <Enproceso />}
        {tablaActual === 'Entregados' && <Entregados />}
        {tablaActual === 'Sinver' && <Sinver/>}
        {tablaActual === 'Admin' && <Admintabla/>}
        {tablaActual === 'Categorias' && <Categorias/>}
        </Container>
        <Footer />
        </div> 
      </div>
       
    );
  }
  export default Tablas;