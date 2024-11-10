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
    const municipios = [
        'Guatemala', 'Santa Catarina Pinula', 'San José Pinula', 'San José del Golfo',
        'Palencia', 'Chinautla', 'San Pedro Ayampuc', 'Mixco', 'San Pedro Sacatepéquez',
        'San Juan Sacatepéquez', 'San Raymundo', 'Chuarrancho', 'Fraijanes', 'Amatitlán',
        'Villa Nueva', 'Villa Canales', 'San Miguel Petapa'
    ];
    const handleSubmitt = async (e) => {
        e.preventDefault();
        const formData = { name, password, e_mail: email, address,phone,municipio  };
    
        try {
            const response = await fetch('http://localhost:5001/Registros_clientes.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text(); 
            alert('Nuevo Cliente Registrado!');
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
            <Form.Label style={{color: 'white'}}>Correo Electronico:</Form.Label>
            <Form.Control type="email" placeholder="prueba@gmail.com" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Form.Label style={{color: 'white'}}>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            <Form.Label style={{color: 'white'}} >Dirección:</Form.Label>
            <Form.Control type="text" placeholder="Direccion" value={address}
            onChange={(e) => setAddress(e.target.value)} /> 
            <Form.Label style={{color: 'white'}}>Telefono:</Form.Label>
            <Form.Control type="text" placeholder="1234-5678" value={phone}
            onChange={(e) => setPhone(e.target.value)} /> 
            <Form.Label style={{ color: 'white' }}>Municipio:</Form.Label>
            <Form.Select
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                required
            >
            <option value="">Seleccione un municipio</option>
                {municipios.map((mun) => (
                    <option key={mun} value={mun}>{mun}</option>
                ))}
            </Form.Select> 
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Registro
          </Button> 
        </Form>  
        
    );
};

export default RegisterForm;