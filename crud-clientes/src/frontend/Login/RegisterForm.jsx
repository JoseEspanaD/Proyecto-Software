import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const municipios = [
        'Guatemala', 'Santa Catarina Pinula', 'San José Pinula', 'San José del Golfo',
        'Palencia', 'Chinautla', 'San Pedro Ayampuc', 'Mixco', 'San Pedro Sacatepéquez',
        'San Juan Sacatepéquez', 'San Raymundo', 'Chuarrancho', 'Fraijanes', 'Amatitlán',
        'Villa Nueva', 'Villa Canales', 'San Miguel Petapa'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, password, e_mail: email, address, phone, municipio };
    
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            if (response.ok) {
                setMessage('Registro exitoso!');
                localStorage.setItem('authToken', result.token);
                navigate('/Inicio');
            } else {
                setMessage(result.error || 'Error en el registro');
                console.error('Detalles del error:', result.details);
            }
        } catch (error) {
            setMessage('Error en el registro');
            console.error('Error completo:', error);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4" style={{ color: 'white' }}>Registro de Nuevo Cliente</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label style={{ color: 'white' }}>Nombre Completo:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label style={{ color: 'white' }}>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label style={{ color: 'white' }}>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label style={{ color: 'white' }}>Dirección:</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label style={{ color: 'white' }}>Teléfono:</Form.Label>
                        <Form.Control
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formMunicipio">
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

                    <Button variant="primary" type="submit" className="w-100">
                        Registrarse
                    </Button>
                </Form>
                {message && <Alert variant={message.includes('exitoso') ? 'success' : 'danger'} className="mt-3">{message}</Alert>}
            </div>
        </Container>
    );
};

export default RegisterForm;
