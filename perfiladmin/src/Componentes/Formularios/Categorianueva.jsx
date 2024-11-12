import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

function Categorianueva() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [showImageField, setShowImageField] = useState(false); // Estado para mostrar/ocultar el campo de imagen
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageOptionChange = (e) => {
    setShowImageField(e.target.value === 'yes'); // Muestra el campo si se selecciona "Sí"
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5001/Cateogory.js', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowModal(true); // Mostrar el modal si la respuesta es correcta
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmitt}>
        <h2 className="titulo-historial">Registrar Nueva Categoria</h2>
        <Form.Group controlId="formBasicText">
          <Form.Label style={{ color: 'white' }}>Nombre:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Label style={{ color: 'white' }}>Categoría:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Form.Label style={{ color: 'white' }}>¿Desea agregar una imagen?</Form.Label>
          <Form.Control as="select" onChange={handleImageOptionChange} defaultValue="no">
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </Form.Control>

          {showImageField && (
            <>
              <Form.Label style={{ color: 'white' }}>Imagen:</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </>
          )}
        </Form.Group>

        <Button variant="outline-danger" type="submit" className="mt-3">
          Registrar
        </Button>
      </Form>

      {/* Modal para mostrar el mensaje de éxito */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>Nueva categoría registrada correctamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Categorianueva;









 