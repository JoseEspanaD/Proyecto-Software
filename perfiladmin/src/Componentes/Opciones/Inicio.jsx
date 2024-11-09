import React from 'react';  
import { Container, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
function Inicio() {
  const navigate = useNavigate();  

  // Función para navegar a Formulario.jsx con el estado de qué formulario mostrar
  const handleClick = (formulario) => {
    navigate('/Formularios', { state: { formulario } }); 
  };
  const handleClicktwo = (tablas) => {
    navigate('/Tablas', { state: { tablas } }); 
  };
  const handleClickone = (opciones) => {
    navigate('/Opciones', { state: { opciones } }); 
  };
    return ( 
     
       
        <Container> <br></br>
         <Button onClick={() => handleClick('categoria')} variant="light">Agregar Categoria</Button><br></br><br></br>
       <Button onClick={() => handleClick('Productos')} variant="light">Agregar Productos</Button><br></br><br></br> 
         <Button onClick={() => handleClickone('Verpedidos')} variant="light">Verificar Pedidos</Button><br></br><br></br> 
        <Button onClick={() => handleClicktwo('Clientes')}variant="light">Clientes Registrados</Button><br></br><br></br> 
      </Container>
        
      
       
    );
  }
  export default Inicio;