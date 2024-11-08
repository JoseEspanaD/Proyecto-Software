import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './StylesComponent.css';

const ListaFavoritos = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('id_customer');
    const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    setFavoriteItems(favorites);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedFavorites = favoriteItems.filter(item => item.id !== id);
    setFavoriteItems(updatedFavorites);
    const userId = localStorage.getItem('id_customer');
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
  };

  const handleViewDetail = (id) => {
    navigate(`/DetalleProducto/${id}`);
  };

  return (
    <div className="favoritos-container">
      <br />
      <h2 className="mb-4" style={{color: 'white'}}>Mis Favoritos</h2>
      {favoriteItems.length === 0 ? (
        <h4 className="mb-4" style={{color: 'white'}}>No tienes productos favoritos...</h4>
      ) : (
        <div className='tabla-favoritos'>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {favoriteItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} style={{width: '50px', marginRight: '10px'}} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button variant="info" onClick={() => handleViewDetail(item.id)} className="me-2">
                      <FaEye />
                    </Button>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ListaFavoritos;