import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap';
function Sinver() {
  const [sinver, setEnproceso] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/Sinver.js')  // Cambiado a .get()
      .then(response => {
        setEnproceso(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  
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
        </tr>
      </thead>
      <tbody> 
        {sinver.map((sinvers) => (
            <tr key={sinvers.id_customer}>
              <td>{sinvers.id_order}</td>
              <td>{sinvers.status}</td>
              <td>{sinvers.comment}</td>
              <td>{sinvers.date}</td>
              <td>{sinvers.total_price}</td>
              <td>{sinvers.id_customer}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Sinver;