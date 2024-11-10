import React, { useState } from 'react'; 
import { Form, Button } from 'react-bootstrap';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState(''); 
    const [message, setMessage] = useState('');
    const [phone, setPhone] = useState('');
    const [municipio, setMunicipio] = useState('');

    const handleSubmitt = async (e) => {
        e.preventDefault();
        const formData = { name, password, e_mail: email, address,phone,municipio  };
    
        try {
            const response = await fetch('http://localhost:5001/Registros.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text(); 
            alert('Nuevo Administrador Registrado!');
        } catch (error) {
            setMessage('Error en el registro');
        }
    }; 

    return ( 
             
            <Form onSubmit={handleSubmitt}>
          <h1 className="mb-4" style={{color: 'white'}}>Login</h1>
          <Form.Group controlId="formBasicText">
            <Form.Label className="mb-4" style={{color: 'white'}}>Nombre:</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)}/>
            <Form.Label>Correo Electronico:</Form.Label>
            <Form.Control type="email" placeholder="prueba@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            <Form.Label>Dirección:</Form.Label>
            <Form.Control type="text" placeholder="Direccion" value={address}
            onChange={(e) => setAddress(e.target.value)} /> 
            <Form.Label>Telefono:</Form.Label>
            <Form.Control type="text" placeholder="1234-5678" value={phone}
            onChange={(e) => setPhone(e.target.value)} /> 
            <Form.Label>Municipio:</Form.Label>
            <Form.Control type="text" placeholder="Municipio" value={municipio}
            onChange={(e) => setMunicipio(e.target.value)} /> 
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Registro
          </Button> 
        </Form>  
        
    );
};

export default RegisterForm;