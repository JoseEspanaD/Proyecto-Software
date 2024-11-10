import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import logo from '../../Assets/logo.jpeg';
import { Table, Container, Button, Modal } from 'react-bootstrap'; 

function Descripcion({ nombreCliente, fechaPedido, id_order }) {
  const [showModal, setShowModal] = useState(false);
  const [descripcion, setDescripcion] = useState([]);

  useEffect(() => {
    if (id_order) {
      axios.get(`http://localhost:5001/Descripcion.js/${id_order}`)
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

  // Función para calcular el total de la columna "Precio Unitario Q"
  const totalUnitario = descripcion.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  // Función para calcular el total de la columna "Precio Total"
  const totalGeneral = descripcion.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0);

  return (
    <Container>
      <Button variant="primary" onClick={handleOpenModal}>
        Descripción
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Body className="bg-danger text-white">
          <div className="d-flex align-items-start mb-4">
            <img src={logo} alt="Carnespa Logo" style={{ width: '100px', marginRight: '20px' }} />
            <div>
              <h1>CARNESPA</h1>
              <p>Carnes y embutidos fina selección</p>
            </div>
          </div>
          <h4 className="modal-subtitle">Cliente: {nombreCliente}</h4>
          <h4 className="modal-subtitle">Fecha: {new Date(fechaPedido).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</h4>
          <Table striped bordered hover variant="danger" className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Productos</th>
                <th>Precio Unitario Q</th>
                <th>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {descripcion.map((item) => (
                <tr key={item.id_item}>
                  <td>{item.id_item}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.total_price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total:</strong></td>
                <td><strong>Q {totalUnitario.toFixed(2)}</strong></td>
                <td><strong>Q {totalGeneral.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="bg-danger text-white">
          <Button variant="outline-dark" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Descripcion;

