import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container, Dropdown, ButtonGroup } from 'react-bootstrap';
function Admintabla() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Administradores.js')  // Cambiado a .get()
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Error fetching administradores:', error);
      });
  }, []);
  const handleStatusChange = async (id_admin, newStatus) => {
    console.log(`Cambiando el estatus del cliente ${id_admin} `); // Agrega este log
    try {
      await axios.put(`http://localhost:5001/UpdateStatusadmin/${id_admin}`, { status: newStatus });
      setAdmins(admins.map(administrator => 
        administrator.id_admin === id_admin ? { ...administrator, status: newStatus } : administrator
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  let num = 1;
    return (
        
          
        <Container> 
            <h2 className="titulo-historial">Administradores Registrados</h2>
        <Table striped bordered hover className="table table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Correo electronico</th>
          <th>Estatus</th> 
          <th>Telefono</th>  
          <th>Cambiar Estatus</th>
        </tr>
      </thead>
      <tbody> 
        {admins.map((admin) => (
            <tr key={admin.id_admin}>
              <td>{num++}</td>
              <td>{admin.name}</td>
              <td>{admin.e_mail}</td>
              <td>{admin.status === 'on-line' ? 'active' : admin.status}</td>

              <td>{admin.phone}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Cambiar Estatus
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(admin.id_admin, 'deactivate')}>Desactivado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(admin.id_admin, 'on-line')}>Activo</Dropdown.Item> 
                  </Dropdown.Menu>
                </Dropdown>
              </td>
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