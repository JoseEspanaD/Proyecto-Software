import React, { useState } from 'react';  
import { Form, Button } from 'react-bootstrap'; 
function Categorianueva() {
  const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');  
    const [message, setMessage] = useState('');

    const handleSubmitt = async (e) => {
        e.preventDefault();
        const formData = { name, password, e_mail: email, address };
    
        try {
            const response = await fetch('http://localhost:5000/Registros.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text(); 
            alert('WELCOME!');
        } catch (error) {
            setMessage('Error en el registro');
        }
    };
    return (
     
       
        <Form onSubmit={handleSubmitt}>
          <h1>Nueva</h1>
          <Form.Group controlId="formBasicText">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)}/>
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="prueba@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" placeholder="Direccion" value={address}
            onChange={(e) => setAddress(e.target.value)} /> 
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Registro
          </Button> 
        </Form>  
       
    );
  }
  export default Categorianueva;
 