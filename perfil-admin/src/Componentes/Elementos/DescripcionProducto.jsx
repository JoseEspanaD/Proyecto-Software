import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import './Header.css'; 

const DescripcionProducto = ({ product }) => {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [weight, setWeight] = useState(product.weight || '');
  const [price, setPrice] = useState(product.price || '');   
  const [category, setCategory] = useState(product.category || '');
  const [image, setImage] = useState(null); // Cambiado a null para el archivo
  const [status, setStatus] = useState(product.status || '');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Guarda el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('weight', weight);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      const response = await fetch(`http://localhost:5001/UpdateProduct/${product.id_product}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Producto actualizado correctamente');
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      alert('Error en el servidor');
    }
  };

  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto-img">
        <img src={`http://localhost:5001/uploads/${product.image}`} alt={product.name} className="producto-imagen" />
      </div>

      <div className="detalle-producto-info"> 
        <div className="cantidad-selector mb-3"> 
          <Form onSubmit={handleSubmit}>
            <h1>Editar Producto</h1>
            <Form.Group controlId="formBasicText">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" placeholder="Nombre" value={name}
                onChange={(e) => setName(e.target.value)} />
              
              <Form.Label>Descripción:</Form.Label>
              <Form.Control type="text" placeholder="Descripción" value={description}
                onChange={(e) => setDescription(e.target.value)} />
              
              <Form.Label>Peso:</Form.Label>
              <Form.Control type="number" placeholder="Peso" value={weight}
                onChange={(e) => setWeight(e.target.value)} /> 
              
              <Form.Label>Precio(Q):</Form.Label>
              <Form.Control type="number" step="0.01" placeholder="0.00" value={price}
                onChange={(e) => setPrice(e.target.value)} /> 
              
              <Form.Label>Categoria:</Form.Label>
              <Form.Control type="text" placeholder="Categoría" value={category}
                onChange={(e) => setCategory(e.target.value)} /> 
              
              <Form.Group controlId="formFile">
          <Form.Label>Subir Imagen:</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group> 
              
              <Form.Label>Estatus:</Form.Label>
              <Form.Control type="text" placeholder="Estatus" value={status}
                onChange={(e) => setStatus(e.target.value)} /> 
            </Form.Group>
            <Button variant="outline-danger" type="submit" className="mt-3">
              Actualizar Producto
            </Button> 
          </Form>  
        </div> 
      </div> 
    </div>
  );
};

export default DescripcionProducto;