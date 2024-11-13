import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import Descripcion from './Descripcion';
 

function Enproceso() {
  const [enproceso, setEnproceso] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Enproceso.js')
      .then(response => {
        setEnproceso(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);

  const handleStatusChange = async (id_order, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/UpdateStatus/${id_order}`, { status: newStatus });
      setEnproceso(enproceso.map(order => 
        order.id_order === id_order ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  let num = 1;
  return (
    <Container>
      <h1 className="mb-4" style={{color: 'white'}}>En proceso</h1>
      <Table striped bordered hover className="table table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Estatus</th>
            <th>Comentario</th>
            <th>Fecha De pedido</th>
            <th>Precio Total</th>
            <th>Nombre del Cliente</th>
            <th>Modificar Estatus</th>
            <th>Descripción</th>
            <th>Fecha Colocada en Proceso</th>
            <th>Tiempo para pasar Proceso</th>
          </tr>
        </thead>
        <tbody>
          {enproceso.map((enprocesos) => (
            <tr key={enprocesos.id_order}>
              <td>{num++}</td>
              <td>{enprocesos.status}</td>
              <td>{enprocesos.comment}</td>
              <td>{new Date(enprocesos.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit' })}</td>
              <td>{enprocesos.total_price}</td>
              <td>{enprocesos.name}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Cambiar Estatus
                  </Dropdown.Toggle>
                  <Dropdown.Menu> 
                    <Dropdown.Item onClick={() => handleStatusChange(enprocesos.id_order, 'Entregados')}>Entregados</Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td><Descripcion nombreCliente={enprocesos.name} 
    fechaPedido={enprocesos.date} id_order = {enprocesos.id_order} /></td>
              <td>{new Date(enprocesos.fecha_p).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit' })}</td>
              <td>{enprocesos.duracionp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Enproceso;
