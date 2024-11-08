import React, { useState } from 'react';  
import { Form, Button } from 'react-bootstrap'; 
function Productonuevo() {
  const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');   
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(''); 

    const handleSubmitt = async (e) => {
        e.preventDefault();
        const formData = { name, description, weight, price, category,image };
    
        try {
            const response = await fetch('http://localhost:5001/Nuevoproduct.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text(); 
            alert('Nuevo Producto!');
        } catch (error) {
            alert('Error en el registro');
        }
    };
    return (
     
       
        <Form onSubmit={handleSubmitt}>
          <h1>Nuevo Producto</h1>
          <Form.Group controlId="formBasicText">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)}/>
            <Form.Label>Descripción:</Form.Label>
            <Form.Control type="text" placeholder="Descripción" value={description}
            onChange={(e) => setDescription(e.target.value)}/>
            <Form.Label>Peso:</Form.Label>
            <Form.Control type="number" placeholder="Peso" value={weight}
            onChange={(e) => setWeight(e.target.value)} /> 
            <Form.Label>Precio(Q):</Form.Label>
            <Form.Control type="number" step="0.01" placeholder="0.00" value={price}
            onChange={(e) => setPrice(e.target.value)} /> 
            <Form.Label>Categoria:</Form.Label>
            <Form.Control type="Text" placeholder="E" value={category}
            onChange={(e) => setCategory(e.target.value)} /> 
            <Form.Label>Imagen:</Form.Label>
            <Form.Control type="text" placeholder="URL" value={image}
            onChange={(e) => setImage(e.target.value)} /> 
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Registro
          </Button> 
        </Form>  
        
    );
  }
  export default Productonuevo;