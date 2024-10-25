import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Inicio from './frontend/Paginas/Inicio';
import Perfil from './frontend/Paginas/Perfil';
import Productos from './frontend/Paginas/Productos';
import DetalleProducto from './frontend/Paginas/DetalleProducto';
import PaginaCarrito from './frontend/Paginas/PaginaCarrito';
import PaginaFavoritos from './frontend/Paginas/PaginaFavoritos';
import RegisterForm from './frontend/Login/RegisterForm';
import Registro from './frontend/Login/Registro';
import PrivateRoute from './backend/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} /> 
        <Route path = "/Register" element={<RegisterForm />}/>
        <Route path="/Inicio" element={<PrivateRoute>
                    <Inicio />
                  </PrivateRoute>} />
        <Route path="/Perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/Productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/DetalleProducto/:id" element={<PrivateRoute><DetalleProducto /></PrivateRoute>} />
        <Route path="/Carrito" element={<PrivateRoute><PaginaCarrito /></PrivateRoute>} />
        <Route path="/Favoritos" element={<PrivateRoute><PaginaFavoritos /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;