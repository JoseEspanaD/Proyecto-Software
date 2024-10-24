import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './frontend/Paginas/Inicio';
import Perfil from './frontend/Paginas/Perfil';
import Productos from './frontend/Paginas/Productos';
import DetalleProducto from './frontend/Paginas/DetalleProducto';
import PaginaCarrito from './frontend/Paginas/PaginaCarrito';
import PaginaFavoritos from './frontend/Paginas/PaginaFavoritos';
import Pedidos from './frontend/Paginas/Pedidos';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
        <Route path="/Carrito" element={<PaginaCarrito />} />
        <Route path="/Favoritos" element={<PaginaFavoritos />} />
        <Route path="/Pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;