import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container, Dropdown, ButtonGroup } from 'react-bootstrap'; 
function Clientestabla() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Clientes.js')  // Cambiado a .get()
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  const handleStatusChange = async (id_customer, newStatus) => {
    console.log(`Cambiando el estatus del cliente ${id_customer} `); // Agrega este log
    try {
      await axios.put(`http://localhost:5001/UpdateStatusclientes/${id_customer}`, { status: newStatus });
      setClientes(clientes.map(customer => 
        customer.id_customer === id_customer ? { ...customer, status: newStatus } : customer
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  let num = 1;
    return ( 
        
         
      <Container> 
            <h2 className="titulo-historial">Clientes Registrados</h2>
      <Table striped bordered hover className="table table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th> 
          <th>Correo electronico</th>
          <th>Status</th>
          <th>Telefono</th>
          <th>Direccion</th> 
          <th>Zona</th>
          <th>Municipio</th> 
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>  
        {clientes.map((cliente) => (
            <tr key={cliente.id_customer}>
              <td>{num++}</td>
              <td>{cliente.name}</td>
              <td>{cliente.e_mail}</td>
              <td>{cliente.status}</td>
              <td>{cliente.address}</td>
              <td>{cliente.phone}</td>
              <td>{cliente.nombre_zona}</td>
              <td>{cliente.nombre_municipio}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Cambiar Estatus
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(cliente.id_customer, 'deactivate')}>Desactivado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(cliente.id_customer, 'active')}>Activo</Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Clientestabla;