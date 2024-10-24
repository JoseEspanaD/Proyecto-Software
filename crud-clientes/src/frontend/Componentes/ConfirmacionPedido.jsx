import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const ConfirmacionPedido = ({ show, onHide, cartItems, total, onConfirm }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [comentarios, setComentarios] = useState('');
  const fechaPedido = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      nombre,
      direccion,
      municipio,
      comentarios,
      fechaPedido,
      cartItems,
      total
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control 
              type="text" 
              value={direccion} 
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Municipio (Ciudad de Guatemala)</Form.Label>
            <Form.Control 
              as="select"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              required
            >
              <option value="">Seleccione un municipio</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Mixco">Mixco</option>
              <option value="Villa Nueva">Villa Nueva</option>
              {/* Añadir más municipios de la Ciudad de Guatemala */}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comentarios adicionales</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              value={comentarios} 
              onChange={(e) => setComentarios(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha del pedido: {fechaPedido}</Form.Label>
          </Form.Group>
          <h5>Resumen del pedido:</h5>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                {item.name} - Cantidad: {item.quantity} - Subtotal: Q{item.price * item.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h5 className="mt-3">Total: Q{total.toFixed(2)}</h5>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Confirmar Pedido
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmacionPedido;