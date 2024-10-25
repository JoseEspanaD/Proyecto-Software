import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap';
function Enproceso() {
  const [enproceso, setEnproceso] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/Enproceso.js')  // Cambiado a .get()
      .then(response => {
        setEnproceso(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  
    return (
        
         
        <Container> 
            <h1>En proceso</h1>
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
        {enproceso.map((enprocesos) => (
            <tr key={enprocesos.id_customer}>
              <td>{enprocesos.id_order}</td>
              <td>{enprocesos.status}</td>
              <td>{enprocesos.comment}</td>
              <td>{enprocesos.date}</td>
              <td>{enprocesos.total_price}</td>
              <td>{enprocesos.id_customer}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Enproceso;