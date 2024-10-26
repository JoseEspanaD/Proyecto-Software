import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Modal, } from 'react-bootstrap'; 
function Descripcion({ nombreCliente, fechaPedido,id_order }) {
  const [showModal, setShowModal] = useState(false);
  const [descripcion, setDescripcion] = useState([]);

  useEffect(() => {
    if (id_order) {
      axios.get(`http://localhost:5000/Descripcion.js/${id_order}`)
        .then(response => {
          setDescripcion(response.data);
        })
        .catch(error => {
          console.error('Error fetching descripción:', error);
        });
    }
  }, [id_order]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container> 
      <Button variant="primary" onClick={handleOpenModal}>
        Descripción
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton> 
        </Modal.Header>
        <h1>CARNESPA</h1>
        <h7>Carnes y embutidos fina selección</h7>
        <h4>Cliente: {nombreCliente}</h4>
        <h5>Fecha: {new Date(fechaPedido).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h5>
       
        <Modal.Body>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th> 
            <th>Precio Total</th> 
          </tr>
        </thead>
        <tbody>
          {descripcion.map((descripciones) => (
            <tr key={descripciones.id_articulo}>
              <td>{descripciones.id_articulo}</td>
              <td>{descripciones.name}</td>
              <td>{descripciones.price}</td>  
              <td>{descripciones.total_price}</td> 
            </tr>
          ))}
        </tbody>
      </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Descripcion;