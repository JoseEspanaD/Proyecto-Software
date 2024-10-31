import React, { useState, useEffect } from 'react';
import Navbar from '../Componentes/Navbar';
import CarritoCompras from '../Componentes/CarritoCompras';
import ConfirmacionPedido from '../Componentes/ConfirmacionPedido';
import axios from 'axios';
import './StylesPaginas.css';

const PaginaCarrito = () => {
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Cargar los items del carrito desde localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    // Calcular el total
    const newTotal = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, []);

  const handleProcederPedido = (items, totalCarrito) => {
    if (totalCarrito >= 300) {
      setCartItems(items);
      setTotal(totalCarrito);
      setShowConfirmacion(true);
    } else {
      alert('El monto mínimo para realizar un pedido es de Q300');
    }
  };

  const handleConfirmPedido = async (pedidoData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/orders', pedidoData);
      if (response.status === 200) {
        alert('Pedido realizado con éxito');
        // Vaciar el carrito
        localStorage.removeItem('cart');
        setCartItems([]);
        setTotal(0);
        // Aquí podrías redirigir al usuario a una página de confirmación
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
  };

  return (
    <>
      <Navbar />
      <CarritoCompras 
        onProcederPedido={handleProcederPedido} 
        cartItems={cartItems}
        setCartItems={setCartItems}
        total={total}
        setTotal={setTotal}
      />
      <ConfirmacionPedido 
        show={showConfirmacion}
        onHide={() => setShowConfirmacion(false)}
        cartItems={cartItems}
        total={total}
        onConfirm={handleConfirmPedido}
      />
    </>
  );
};

export default PaginaCarrito;
