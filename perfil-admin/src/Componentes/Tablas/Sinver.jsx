import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
import Descripcion from './Descripcion';

function Sinver() {
  const [sinver, setEnproceso] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Sinver.js')  // Cambiado a .get()
      .then(response => {
        setEnproceso(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  const handleStatusChange = async (id_order, newStatus) => {
    console.log(`Cambiando el estatus del pedido ${id_order} a ${newStatus}`); // Agrega este log
    try {
      await axios.put(`http://localhost:5001/UpdateStatus/${id_order}`, { status: newStatus });
      setEnproceso(sinver.map(order => 
        order.id_order === id_order ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  
    return (
        
         
        <Container> 
            <h1>Sin Ver</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Estatus</th>
          <th>Comentarios</th>
          <th>Fechas</th>
          <th>Precio total</th>
          <th>Numero de cliente</th>
          <th>Estatus</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody> 
        {sinver.map((sinvers) => (
            <tr key={sinvers.id_order}>
              <td>{sinvers.id_order}</td>
              <td>{sinvers.status}</td>
              <td>{sinvers.comment}</td>
              <td>{new Date(sinvers.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
              <td>{sinvers.total_price}</td>
              <td>{sinvers.name}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Cambiar Estatus
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(sinvers.id_order, 'En proceso')}>En proceso</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(sinvers.id_order, 'Entregados')}>Entregados</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(sinvers.id_order, 'Sin ver')}>Sin ver</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td><Descripcion nombreCliente={sinvers.name} 
    fechaPedido={sinvers.date} id_order = {sinvers.id_order}/></td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Sinver;