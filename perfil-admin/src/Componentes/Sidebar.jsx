import React from 'react';
import { Nav } from 'react-bootstrap';
import logo from '../Assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
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
    <div className="sidebar d-flex flex-column p-3" style={{ width: '250px', height: '100vh' }}>
      <img src={logo} alt="Carnespa" className="logo" /> 
      <h1 className="text-white">CARNESPA</h1>
      <h3 className="text-white">Inicio</h3>
      <h4 className="text-white">Acciones</h4>

     < hr className="linea-divisoria" />
      <Nav className="flex-column">
        <Nav.Link href="/Principal" className="text-white">Inicio</Nav.Link>
        <Nav.Link onClick={() => handleClick('categoria')} className="text-white">Agregar Categoría</Nav.Link>
        <Nav.Link onClick={() => handleClick('Productos')}  className="text-white">Agregar Productos</Nav.Link>
        <Nav.Link onClick={() => handleClickone('Verpedidos')} className="text-white">Verificar Pedidos</Nav.Link>
        <Nav.Link onClick={() => handleClicktwo('Clientes')} className="text-success">Clientes Registrados</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
