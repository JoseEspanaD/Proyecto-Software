import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap';
function Enproceso() {
  const [entregado, setEntregado] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/Entregados.js')  // Cambiado a .get()
      .then(response => {
        setEntregado(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  
    return (
        
         
        <Container> 
            <h1>Entregados</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Estatus</th>
          <th>Comentarios</th>
          <th>Fechas</th>
          <th>Precio total</th>
          <th>Numero de cliente</th>
        </tr>
      </thead>
      <tbody> 
        {entregado.map((entregados) => (
            <tr key={entregados.id_customer}>
              <td>{entregados.id_order}</td>
              <td>{entregados.status}</td>
              <td>{entregados.comment}</td>
              <td>{entregados.date}</td>
              <td>{entregados.total_price}</td>
              <td>{entregados.id_customer}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Enproceso;