import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ConfirmacionPedido = ({ show, onHide, cartItems, total, onConfirm }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [comentarios, setComentarios] = useState('');
  const fechaPedido = new Date().toLocaleDateString();

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:5000/api/user', {
            headers: { 'Authorization': token }
            });
            const userData = response.data;
            setNombre(userData.name);
            setDireccion(userData.address);
            setMunicipio(userData.municipio);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
        };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    
    const response = await axios.post('http://localhost:5000/api/orders', 
      {
        nombre,
        direccion,
        municipio,
        comentarios,
        fechaPedido,
        cartItems,
        total
      },
      {
        headers: { 'Authorization': token }
      }
    );
    
    console.log('Respuesta del servidor:', response);
    
    // Procesamos la respuesta y mostramos el mensaje de éxito
    onConfirm(response.data);
    
    // Limpiar el carrito del usuario usando el id_customer
    const userId = localStorage.getItem('id_customer'); // Obtener el ID del cliente
    localStorage.removeItem(`cart_${userId}`); // Limpiar el carrito del usuario
    onHide(); // Cerrar el modal de confirmación
    alert('El pedido se ha procesado con éxito');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
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
            <Form.Label>Municipio</Form.Label>
            <Form.Control 
              type="text" 
              value={municipio} 
              onChange={(e) => setMunicipio(e.target.value)}
              required 
            />
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
