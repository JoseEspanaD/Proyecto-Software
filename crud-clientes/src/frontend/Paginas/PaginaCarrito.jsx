import React from 'react';
import Navbar from '../Componentes/Navbar';
import CarritoCompras from '../Componentes/CarritoCompras';
import './StylesPaginas.css';

const PaginaCarrito = () => {
  return (
    <>
      <Navbar />
      <CarritoCompras />
    </>
  );
};

export default PaginaCarrito;