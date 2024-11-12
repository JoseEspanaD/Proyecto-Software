import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap'; 

function Clientestabla() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Clientes_recientes.js')  
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  let num = 1;
  return (
    <Container> 
      <h1 className="mb-4" style={{color: 'white'}} >Clientes Recientes </h1>
      <Table striped bordered hover className="table table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo electronico</th>
            <th>Status</th>
            <th>Telefono</th>
            <th>Direccion</th> 
            <th>Zona</th>
            <th>Municipio</th> 
          </tr>
        </thead>
        <tbody> 
          {clientes.map((cliente) => (
            <tr key={cliente.id_customer}>
              <td>{num++}</td>
              <td>{cliente.name}</td>
              <td>{cliente.e_mail}</td>
              <td>{cliente.status}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.address}</td>
              <td>{cliente.nombre_zona}</td>
              <td>{cliente.nombre_municipio}</td>
            </tr>
          ))} 
        </tbody>
      </Table>
    </Container> 
  );
}

export default Clientestabla;