import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function Productonuevo() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías

  useEffect(() => {
    // Carga las categorías al montar el componente
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/categories');
        const data = await response.json();
        setCategories(data); // Almacena las categorías en el estado
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('weight', weight);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5001/Nuevoproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Nuevo Producto!');
      } else {
        alert('Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el servidor');
    }
  };

  return (
    <Form onSubmit={handleSubmitt}>
      <h1>Nuevo Producto</h1>
      <Form.Group controlId="formBasicText">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

        <Form.Label>Descripción:</Form.Label>
        <Form.Control type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Form.Label>Peso:</Form.Label>
        <Form.Control type="number" placeholder="Peso" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <Form.Label>Precio (Q):</Form.Label>
        <Form.Control type="number" step="0.01" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />

        <Form.Label>Categoría:</Form.Label>
        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}> 
          {categories.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.name}
            </option>
          ))}
        </Form.Control>

        <Form.Label>Imagen:</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>

      <Button variant="outline-danger" type="submit" className="mt-3">
        Registrar
      </Button>
    </Form>
  );
}

export default Productonuevo;
