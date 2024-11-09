import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap';
function Admintabla() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Administradores.js')  // Cambiado a .get()
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  
    return (
        
         
        <Container> 
            <h1>Administradores Registrados</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Correo electronico</th>
          <th>Status</th>
          <th>Direccion</th>
          <th>Telefono</th> 
          <th>Municipio</th> 
        </tr>
      </thead>
      <tbody> 
        {admins.map((admin) => (
            <tr key={admin.id_admin}>
              <td>{admin.id_admin}</td>
              <td>{admin.name}</td>
              <td>{admin.e_mail}</td>
              <td>{admin.status}</td>
              <td>{admin.address}</td>
              <td>{admin.phone}</td>
              <td>{admin.municipio}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
    <br></br>
    <br></br>
      </Container> 
    );
  }
  
  export default Admintabla;