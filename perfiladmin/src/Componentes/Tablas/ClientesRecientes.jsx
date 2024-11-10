import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap'; 
function Clientestabla() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Clientes_recientes.js')  // Cambiado a .get()
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  
    return (
        
         
        <Container> 
            <h1 className="mb-4" style={{color: 'white'}} >Clientes Recientes </h1>
      <Table striped bordered hover className="table table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Correo electronico</th>
          <th>Status</th>
          <th>Telefono</th>
          <th>Direccion</th> 
          <th>Municipio</th> 
        </tr>
      </thead>
      <tbody> 
        {clientes.map((cliente) => (
            <tr key={cliente.id_customer}>
              <td>{cliente.id_customer}</td>
              <td>{cliente.name}</td>
              <td>{cliente.e_mail}</td>
              <td>{cliente.status}</td>
              <td>{cliente.address}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.municipio}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Clientestabla;