import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './StylesComponent.css';

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState([]);

  useEffect(() => {
    // Aquí haremos la llamada a la API para obtener los pedidos
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los pedidos:', error);
      });
  }, []);

  const handleVerDescripcion = (pedido) => {
    setPedidoSeleccionado(pedido);
    // Aquí haremos la llamada a la API para obtener los detalles del pedido
    axios.get(`http://localhost:5000/api/orders/${pedido.id_order}/items`)
      .then(response => {
        setDetallesPedido(response.data);
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error al obtener los detalles del pedido:', error);
      });
  };

  return (
    <div className="historial-pedidos-container">
      <h2 style={{ color: 'white' }}>Historial de Pedidos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id_order}>
              <td>{pedido.id_order}</td>
              <td>{new Date(pedido.date).toLocaleDateString()}</td>
              <td>{pedido.status}</td>
              <td>
                <Button variant="info" onClick={() => handleVerDescripcion(pedido)}>
                  Descripción
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido #{pedidoSeleccionado?.id_order}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {detallesPedido.map((item) => (
                <tr key={item.id_item}>
                  <td>{item.product_name}</td>
                  <td>Q{item.unit_price}</td>
                  <td>{item.amount}</td>
                  <td>Q{(item.unit_price * item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistorialPedidos;