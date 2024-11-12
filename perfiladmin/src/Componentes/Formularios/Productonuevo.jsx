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
        const response = await fetch('http://localhost:5001/Categorias_table');
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
      <h1 className="mb-4" style={{color: 'white'}} >Nuevo Producto</h1>
      <Form.Group controlId="formBasicText">
        <Form.Label style={{color: 'white'}}>Nombre:</Form.Label>
        <Form.Control type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />

        <Form.Label style={{color: 'white'}}>Descripción:</Form.Label>
        <Form.Control type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />

        <Form.Label style={{color: 'white'}}>Peso:</Form.Label>
        <Form.Control type="number" placeholder="Peso" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <Form.Label style={{color: 'white'}}>Precio (Q):</Form.Label>
        <Form.Control type="number" step="0.01" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />

        <Form.Label style={{color: 'white'}}>Categoría:</Form.Label>
        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}> 
  <option value="">Selecciona una categoría</option>
  {categories.map((cat) => (
    <option key={cat.category} value={cat.category}>
      {cat.name}
    </option>
  ))}
</Form.Control>


        <Form.Label style={{color: 'white'}}>Imagen:</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>

      <Button variant="outline-danger" type="submit" className="mt-3">
        Registrar
      </Button>
    </Form>
  );
}

export default Productonuevo;
