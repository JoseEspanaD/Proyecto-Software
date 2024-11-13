import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button} from 'react-bootstrap';
import Descripcion from './Descripcion'; 

function Enproceso() {
  const [entregado, setEntregado] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/Entregados.js')  // Cambiado a .get()
      .then(response => {
        setEntregado(response.data);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);
  
  const handleStatusChange = async (id_order, newStatus) => {
    console.log(`Cambiando el estatus del pedido ${id_order} a ${newStatus}`); // Agrega este log
    try {
      await axios.put(`http://localhost:5001/UpdateStatus/${id_order}`, { status: newStatus });
      setEntregado(entregado.map(order => 
        order.id_order === id_order ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  let num = 1;
  
    return (
        
         
        <Container> 
            <h1 className="mb-4" style={{color: 'white'}}>Entregados</h1>
      <Table striped bordered hover className="table table-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Estatus</th>
          <th>Comentarios</th>
          <th>Fecha</th>
          <th>Precio total</th>
          <th>Numero de cliente</th>
          <th>Estatus</th>
          <th>Descripcion</th>
          <th>Fecha de Proceso</th>
          <th>Fecha de Entrega</th>
          <th>Tiempo para pasar Proceso</th>
          <th>Duracion de proceso a entrega</th>
        </tr>
      </thead>
      <tbody> 
        {entregado.map((entregados) => (
            <tr key={entregados.id_order}>
              <td>{num++}</td>
              <td>{entregados.status}</td>
              <td>{entregados.comment}</td>
              <td>{new Date(entregados.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit' })}</td>
              <td>{entregados.total_price}</td>
              <td>{entregados.name}</td>
              <td>
              <Button variant="secondary">Entregados</Button>
              </td>
              <td><Descripcion nombreCliente={entregados.name} 
    fechaPedido={entregados.date} id_order = {entregados.id_order} /></td>
              <td>{new Date(entregados.fecha_p).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit' })}</td>
              <td>{new Date(entregados.fecha_e).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit' })}</td>           
              <td>{entregados.duracionp}</td>
              <td>{entregados.duracion}</td>
            </tr>
          ))} 
         
      </tbody>
    </Table>
      </Container> 
    );
  }
  
  export default Enproceso; 