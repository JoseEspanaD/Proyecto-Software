import React from 'react';
import ListadoCarrito from '../Componentes/ListadoCarrito';
import Navbar from '../Componentes/Navbar';

const Carrito = ({ carrito }) => {
  const calcularTotal = () => {
    return carrito.reduce((total, product) => {
      return total + product.price * product.cantidad;
    }, 0);
  };
  
  return (
    <>
      <Navbar />
      <div className="carrito container mt-4">
        <h2 className="mb-4">Tu Carrito</h2>

        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <div>
            <ListadoCarrito productos={carrito} />
            <h3 className="mt-4">Total: Q{calcularTotal().toFixed(2)}</h3>
          </div>
        )}
      </div> 
    </>
  );
};

export default Carrito;