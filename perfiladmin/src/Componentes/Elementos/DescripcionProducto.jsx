import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'; 
import './Header.css'; 

const DescripcionProducto = ({ product }) => {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [weight, setWeight] = useState(product.weight || '');
  const [price, setPrice] = useState(product.price || '');   
  const [category, setCategory] = useState(product.category || '');
  const [status, setStatus] = useState(product.status || '');
  const [image, setImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(`http://localhost:5001/uploads/${product.image}`);
  const [changeImage, setChangeImage] = useState(false);
  const [categories, setCategories] = useState([]); 
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5001/listarcategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
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

    if (changeImage && image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5001/UpdateProduct/${product.id_product}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setModalMessage('Producto actualizado correctamente');
      } else {
        setModalMessage('Error al actualizar el producto');
      }
      setShowModal(true); // Mostrar el modal
    } catch (error) {
      setModalMessage('Error en el servidor');
      setShowModal(true); // Mostrar el modal
    }
  };

  // Función para manejar cambios en el peso
  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (value === '' || value >= 0) {
      setWeight(value);
    }
  };

  // Función para manejar cambios en el precio
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || value >= 0) {
      setPrice(value);
    }
  };

  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto-img">
        <img src={imagePreview} alt={product.name} className="producto-imagen" />
      </div>

      <div className="detalle-producto-info"> 
        <div className="cantidad-selector mb-3"> 
          <Form onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>
            <Form.Group controlId="formBasicText">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control type="text" placeholder="Nombre" value={name}
                onChange={(e) => setName(e.target.value)} />
              
              <Form.Label>Descripción:</Form.Label>
              <Form.Control type="text" placeholder="Descripción" value={description}
                onChange={(e) => setDescription(e.target.value)} />
              
              <Form.Label>Peso:</Form.Label>
              <Form.Control type="number" placeholder="Peso" value={weight}
                onChange={handleWeightChange} /> 
              
              <Form.Label>Precio(Q):</Form.Label>
              <Form.Control type="number" step="0.01" placeholder="0.00" value={price}
                onChange={handlePriceChange} /> 
              
              <Form.Label>Categoría:</Form.Label>
              <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>

              <Form.Label>Estatus:</Form.Label>
              <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="1">Disponible</option>
                <option value="0">No Disponible</option>
              </Form.Control>

              <Form.Label>¿Quieres cambiar la imagen?</Form.Label>
              <Form.Select 
                aria-label="Seleccionar si cambiar imagen"
                value={changeImage ? "si" : "no"} 
                onChange={(e) => setChangeImage(e.target.value === "si")}
              >
                <option value="no">No</option>
                <option value="si">Sí</option>
              </Form.Select>

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

      {/* Modal para mostrar mensajes */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DescripcionProducto;

