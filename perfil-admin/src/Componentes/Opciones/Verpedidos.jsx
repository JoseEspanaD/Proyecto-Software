import React from 'react';  
import { Container, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
function Verpedidos() {
  const navigate = useNavigate();  

  // Función para navegar a Formulario.jsx con el estado de qué formulario mostrar
  const handleClick = (tablas) => {
    navigate('/Tablas', { state: { tablas } }); 
  }; 
    return ( 
     
       
        <Container> <br></br> 
        <Button onClick={() => handleClick('Enproceso')} variant="light">En proceso</Button><br></br><br></br> 
        <Button onClick={() => handleClick('Entregados')} variant="light">Entregados</Button><br></br><br></br> 
        <Button onClick={() => handleClick('Sinver')}variant="light">Sin ver</Button><br></br><br></br> 
      </Container>
        
      
       
    );
  }
  export default Verpedidos;