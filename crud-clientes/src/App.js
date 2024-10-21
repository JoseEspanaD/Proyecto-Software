// App.js
import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './frontend/Paginas/Inicio';
import Perfil from './frontend/Paginas/Perfil';
import Productos from './frontend/Paginas/Productos';
import DetalleProducto from './frontend/Paginas/DetalleProducto';
import Carrito from './frontend/Paginas/Carrito';

const App = () => {
  //Implementamos el funcionamiento del carrito de compras
  //Estado del carrito
  const [carrito, setCarrito] = useState([]);

  //Funcion para agregar productos al carrito
  
  const agregarAlCarrito = (product) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(item => item.id === product.id);

      if (productoExistente) {
        //Si el producto ya esta en el carrito, actualizamos la cantidad
        return prevCarrito.map((item) => {
          //Si los IDs coinciden, actualizamos la cantidad
          if (item.id === product.id) {
            const nuevoProducto = {
              ...item, //Mantenemos las demás propiedades del product iguales
              cantidad: item.cantidad + product.cantidad //Sumamos la cantidad del product existente con la nueva cantidad
            };
            return nuevoProducto; //Retornamos el producto actualizado

          } else {
            //Si no es el mismo producto, lo dejamos igual
            return item;
          }
        });

      } else {
        //Si el producto no esta en el carrito, lo agregamos
        return [...prevCarrito, product];
      }
    });
  };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/DetalleProducto/:id" element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/Carrito" element={<Carrito carrito={carrito} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
