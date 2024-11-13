import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

function AdministrarCategorias() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('on-line'); // Estado para el estatus
  const [showImageField, setShowImageField] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [editingCategory, setEditingCategory] = useState(null); // Estado para la categoría en edición

  // Función para obtener las categorías
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5001/Categorias_table');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Obtener categorías al cargar el componente
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('status', status); // Asegúrate de que el estatus se esté agregando aquí
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5001/Cateogory.js', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowModal(true);
        fetchCategories(); // Refrescar la lista de categorías
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setCategory(category.category);
    setStatus(category.status); // Asegúrate de que esto esté configurado correctamente
    setImage(null); // Limpiar la imagen si no se va a editar
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('status', status);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:5001/UpdateCategory.js/${editingCategory.category}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setShowModal(true);
        fetchCategories(); // Refrescar la lista de categorías
        setEditingCategory(null); // Limpiar la categoría en edición
      } else {
        alert('Error al actualizar la categoría');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor');
    }
  };

  return (
    <>
      <Form onSubmit={editingCategory ? handleUpdate : handleSubmitt}>
        <h2 className="titulo-historial">Administrar Categorías</h2>
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

          <Form.Label style={{ color: 'white' }}>Estatus:</Form.Label>
          <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="on-line">Disponible</option>
            <option value="no disponible">No Disponible</option>
          </Form.Control>

          <Form.Label style={{ color: 'white' }}>¿Desea agregar una imagen?</Form.Label>
          <Form.Control as="select" onChange={(e) => setShowImageField(e.target.value === 'yes')} defaultValue="no">
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
          {editingCategory ? 'Actualizar' : 'Registrar'}
        </Button>
      </Form>

      {/* Listado de categorías */}
      <h2 className="titulo-historial">Categorías Registradas</h2>
      <Table striped bordered hover className="mt-3" style={{ backgroundColor: 'black', color: 'white' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.category}>
              <td>{cat.name}</td>
              <td>{cat.status}</td>
              <td style={{ textAlign: 'left' }}>
                <Button variant="outline-info" onClick={() => handleEdit(cat)} style={{ margin: '0' }}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para mostrar el mensaje de éxito */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>{editingCategory ? 'Categoría actualizada correctamente!' : 'Nueva categoría registrada correctamente!'}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdministrarCategorias;









 