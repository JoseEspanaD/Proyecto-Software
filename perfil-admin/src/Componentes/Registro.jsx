import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Estilo.css';

const Registro = () => {
  const [e_mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { e_mail, password });
      const token = response.data.token;
      
      // Guardar el token en localStorage
      localStorage.setItem('authToken', token);

      setError('');
      alert('Login exitoso');

      // Redirigir a la página Principal
      navigate('/Principal');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="app-container">
       
      <Form onSubmit={handleLogin}>
          <h1>Login</h1>
          <Form.Group controlId="formBasicText">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="prueba@gmail.com" value={e_mail}
            onChange={(e) => setEmail(e.target.value)}/>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
          </Form.Group>
          <Button variant="outline-danger" type="submit" className="mt-3">
            Login
          </Button> 
        </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Registro;
