import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import './Header.css'; 

const DescripcionProducto = ({ product }) => {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [weight, setWeight] = useState(product.weight || '');
  const [price, setPrice] = useState(product.price || '');   
  const [category, setCategory] = useState(product.category || '');
  const [status, setStatus] = useState(product.status || '');
  const [image, setImage] = useState(null); // Nueva imagen si se selecciona
  const [imagePreview, setImagePreview] = useState(`http://localhost:5001/uploads/${product.image}`); // URL de la imagen existente
  const [changeImage, setChangeImage] = useState(false); // Controla si se muestra el campo para cambiar la imagen

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Guarda el archivo seleccionado como nueva imagen
    setImagePreview(URL.createObjectURL(file)); // Muestra la nueva imagen como preview
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
    
    // Solo agrega la imagen si el usuario seleccionó "Cambiar imagen" y hay una imagen nueva
    if (changeImage && image) {
      formData.append('image', image);
    }

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
        {/* Muestra la imagen previa o la nueva seleccionada */}
        <img src={imagePreview} alt={product.name} className="producto-imagen" />
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
              
              <Form.Label>Estatus:</Form.Label>
              <Form.Control type="text" placeholder="Estatus" value={status}
                onChange={(e) => setStatus(e.target.value)} /> 

              <Form.Label>¿Quieres cambiar la imagen?</Form.Label>
              <Form.Select 
                aria-label="Seleccionar si cambiar imagen"
                value={changeImage ? "si" : "no"} 
                onChange={(e) => setChangeImage(e.target.value === "si")}
              >
                <option value="no">No</option>
                <option value="si">Sí</option>
              </Form.Select>

              {/* Campo para subir imagen, solo se muestra si el usuario elige cambiar la imagen */}
              {changeImage && (
                <>
                  <Form.Label>Subir Imagen:</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </>
              )}
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
