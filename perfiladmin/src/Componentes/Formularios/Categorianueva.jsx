import React, { useState } from 'react';  
import { Form, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
function Categorianueva() {
  const [name, setName] = useState(''); 
  const [abbreviation, setAbbreviation] = useState(''); 
  const [message,setMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmitt = async (e) => {
    e.preventDefault();
    const formData = { name, abbreviation };
    try {
      const response = await fetch('http://localhost:5001/Cateogory.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
     
    if (response.status === 23505) { 
      const data = await response.json();
      alert(data.message);  
    } else if (response.ok) {
      alert('Categoria Agregada!');
    } else {
      setMessage('Error en el registro');
    }
    } catch (error) {
      setMessage('Error en el registro');
    }
    };
    const handleClick = (tablas) => {
      navigate('/Tablas', { state: { tablas } }); 
    };
    return (
     
       
        <Form onSubmit={handleSubmitt}>
          <h1 className="mb-4" style={{color: 'white'}}>Nueva Categoria</h1>
          <Form.Group controlId="formBasicText">
            <Form.Label style={{color: 'white'}}>Nombre:</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)}/>
            <Form.Label style={{color: 'white'}}>Abreviación:</Form.Label>
            <Form.Control type="text" placeholder="cl" value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}/>  
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Registro
          </Button> 
          <Button variant="outline-danger" onClick={() => handleClick('Categorias')} className="mt-3">
            Registro
          </Button> 
        </Form>  
       
    );
  }
  export default Categorianueva;
 