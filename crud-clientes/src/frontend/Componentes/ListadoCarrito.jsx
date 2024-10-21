import React from 'react';
import { Table } from 'react-bootstrap';

const ListadoCarrito = ({ productos }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((product) => (
          <tr key={product.id}>
            <td><img src={product.image} alt={product.name} width="50" /></td>
            <td>{product.name}</td>
            <td>Q{product.price}</td>
            <td>{product.cantidad}</td>
            <td>Q{(product.price * product.cantidad)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListadoCarrito;