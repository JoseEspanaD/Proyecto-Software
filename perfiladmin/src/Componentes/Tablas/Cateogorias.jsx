import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import { Table, Container } from 'react-bootstrap'; 
function Admintabla() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Categorias_table')  // Cambiado a .get()
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  let num = 1;
    return (
        
         
        <Container> 
            <h1 className="mb-4" style={{color: 'white'}}>Administradores Registrados</h1>
        <Table striped bordered hover className="table table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Abreviación</th>
          <th>Status</th>
          <th>Cambiar Estatus</th>
          <th>Eliminar Categoria</th>  
        </tr>
      </thead>
      <tbody> 
        {categorias.map((categoria) => (
            <tr key={categoria.category}>
              <td>{num++}</td>
              <td>{categoria.name}</td>
              <td>{categoria.category}</td>
              <td>{categoria.status}</td>
              <td> </td>
              <td> </td> 
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