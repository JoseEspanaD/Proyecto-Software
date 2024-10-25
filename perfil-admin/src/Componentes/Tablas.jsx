import React from 'react'; 
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header'; 
import { useLocation } from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Clientestabla from './Tablas/Clientestabla';
import Enproceso from './Tablas/Enproceso';
import Entregados from './Tablas/Entregados';
import Sinver from './Tablas/Sinver';
import './Estilo.css';
function Tablas() {
  const location = useLocation();
  const tablaActual = location.state?.tablas || '';
    return (
     
      <div className="app-container">
        <Sidebar />
        <div className="content p-4">
        <Header />
        <Container> <br></br>
        {tablaActual === 'Clientes' && <Clientestabla />}
        {tablaActual === 'Enproceso' && <Enproceso />}
        {tablaActual === 'Entregados' && <Entregados />}
        {tablaActual === 'Sinver' && <Sinver/>}
        </Container>
        </div>
         <Footer />
      </div>
       
    );
  }
  export default Tablas;