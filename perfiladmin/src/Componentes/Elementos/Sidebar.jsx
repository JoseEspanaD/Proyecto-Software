import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import logo from '../../Assets/logo.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();  
  const location = useLocation();

  // Estado para manejar la opción activa
  const [activeLink, setActiveLink] = React.useState('');

  // Efecto para actualizar el enlace activo basado en la ruta actual
  useEffect(() => {
    const path = location.pathname;
    if (path === '/Principal') {
      setActiveLink('Inicio');
    } else if (path === '/Formularios') {
      const formulario = location.state?.formulario || '';
      setActiveLink(formulario);
    } else if (path === '/Opciones') {
      setActiveLink('VerificarPedidos');
    } else if (path === '/Tablas') {
      const tablas = location.state?.tablas || '';
      if (tablas === 'Clientes') {
        setActiveLink('Clientes');
      } else if (tablas === 'Admin') {
        setActiveLink('Administradores');
      }
    } else if (path === '/Productosdis') {
      setActiveLink('ProductosDisponibles');
    }
  }, [location]);

  // Función para navegar a Formulario.jsx con el estado de qué formulario mostrar
  const handleClick = (formulario) => {
    setActiveLink(formulario); // Establece la opción activa
    navigate('/Formularios', { state: { formulario } }); 
  };

  // Función para determinar si un enlace es activo
  const isActive = (formulario) => {
    return activeLink === formulario ? 'active' : '';
  };

  return (
    <div className="sidebar d-flex flex-column p-2" style={{ width: '250px', height: '100vh' }}>
      <img src={logo} alt="Carnespa" className="logo" /> 
      <hr className="linea-divisoria" />
      <Nav className="flex-column">
        <Nav.Link href="/Principal" className={`text-white ${isActive('Inicio')}`} onClick={() => setActiveLink('Inicio')}>Inicio</Nav.Link>
        <Nav.Link onClick={() => handleClick('categoria')} className={`text-white ${isActive('categoria')}`}>Agregar Categoría</Nav.Link>
        <Nav.Link onClick={() => handleClick('Productos')} className={`text-white ${isActive('Productos')}`}>Agregar Productos</Nav.Link>
        <Nav.Link onClick={() => { setActiveLink('VerificarPedidos'); navigate('/Opciones'); }} className={`text-white ${isActive('VerificarPedidos')}`}>Verificar Pedidos</Nav.Link>
        <Nav.Link onClick={() => { setActiveLink('Clientes'); navigate('/Tablas', { state: { tablas: 'Clientes' } }); }} className={`text-white ${isActive('Clientes')}`}>Clientes Registrados</Nav.Link>
        <Nav.Link onClick={() => { setActiveLink('ProductosDisponibles'); navigate('/Productosdis'); }} className={`text-white ${isActive('ProductosDisponibles')}`}>Productos Disponibles</Nav.Link>
        <Nav.Link onClick={() => { setActiveLink('Administradores'); navigate('/Tablas', { state: { tablas: 'Admin' } }); }} className={`text-white ${isActive('Administradores')}`}>Administradores</Nav.Link>
        <Nav.Link onClick={() => handleClick('cliente')} className={`text-white ${isActive('cliente')}`}>Agregar Cliente</Nav.Link>
        <Nav.Link onClick={() => handleClick('zonas')} className={`text-white ${isActive('zonas')}`}>Modificar Cobertura</Nav.Link>
        <Nav.Link onClick={() => handleClick('MonitoreoAdministradores')} className={`text-white ${isActive('MonitoreoAdministradores')}`}>Monitoreo de Administradores</Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
