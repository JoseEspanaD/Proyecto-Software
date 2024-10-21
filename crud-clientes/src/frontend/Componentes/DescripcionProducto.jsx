import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './StylesComponent.css'; 

const DescripcionProducto = ({ product, agregarAlCarrito }) => {
  //Estado local para manejar la cantidad seleccionada de productos
  const [cantidad, setCantidad] = useState(1);
  //Estado para manejar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  //Funcion para manejar el cambio de cantidad seleccionada de productos
  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

  //Funcion para manejar el click en "Añadir al carrito"
  const handleAgregarAlCarrito = () => {
    //Creamos un objeto con la informacion del producto y la cantidad seleccionada
    const productoConCantidad = {
      ...product,
      cantidad,
    }
    //Llamamos a la funcion agregarAlCarrito para agregar el producto al carrito
    agregarAlCarrito(productoConCantidad);
    //Mostramos el modal
    setShowModal(true);
  }

  //Funcion para manejar el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto-img">
        <img src={product.image} alt={product.name} className="producto-imagen" />
      </div>
      <div className="detalle-producto-info">
        <h2 className="producto-titulo">{product.name}</h2>
        <p className="producto-descripcion">{product.description}</p>
        <div className="producto-detalles">
          <p><span className="detalle-etiqueta">Peso por Unidad:</span> {product.weight}g</p>
          <p><span className="detalle-etiqueta">Precio por Unidad:</span> Q{product.price}</p>
        </div>
        <div className="selector-cantidad">
          <label htmlFor="cantidad">Cantidad:</label>
          <div className="cantidad-control">
            <button className="cantidad-boton" onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}>-</button>
            <input 
              type="number" 
              id="cantidad" 
              value={cantidad} 
              onChange={handleCantidadChange}
              min="1"
              className="cantidad-input" 
            />
            <button className="cantidad-boton" onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>
        </div>
        <button className="boton-agregar-carrito" onClick={handleAgregarAlCarrito}>Añadir al pedido</button>
        {/** Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Producto añadido</Modal.Title>
          </Modal.Header>
          <Modal.Body>El producto se ha añadido al pedido correctamente</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DescripcionProducto;
