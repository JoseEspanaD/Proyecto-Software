import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const ConfirmacionPedido = ({ show, onHide, cartItems, total, onConfirm }) => {
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [zona, setZona] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [municipios, setMunicipios] = useState([]);
    const [zonas, setZonas] = useState([]);
    const fechaPedido = new Date().toLocaleDateString();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                console.log('Token:', token); // Log del token
                const response = await axios.get('http://localhost:5000/api/user', {
                    headers: { 'Authorization': token }
                });
                console.log('Datos del usuario:', response.data); // Log de los datos del usuario
                const userData = response.data;
                setNombre(userData.name);
                setDireccion(userData.address);
                setMunicipio(userData.id_municipio); // Cambiado a id_municipio
                setZona(userData.id_zona); // Cambiado a id_zona
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };

        const fetchMunicipiosYZonas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/municipios-y-zonas');
                setMunicipios(response.data.municipios);
                setZonas(response.data.zonas);
            } catch (error) {
                console.error('Error al obtener municipios y zonas:', error);
            }
        };

        fetchUserData();
        fetchMunicipiosYZonas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');

        const orderItems = cartItems.map(item => ({
            id_product: item.id,
            category: item.category,
            amount: item.quantity
        }));

        const response = await axios.post('http://localhost:5000/api/orders', 
            {
                nombre,
                direccion,
                municipio, // Enviando el ID del municipio
                zona, // Enviando el ID de la zona
                comentarios,
                fechaPedido,
                cartItems: orderItems,
                total
            },
            {
                headers: { 'Authorization': token }
            }
        );

        console.log('Respuesta del servidor:', response);
        
        onConfirm(response.data);
        setShowSuccess(true);
        
        const userId = localStorage.getItem('id_customer');
        localStorage.removeItem(`cart_${userId}`);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showSuccess ? (
                    <div className="text-center">
                        <h5>El pedido se ha procesado con éxito.</h5>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={direccion} 
                                onChange={(e) => setDireccion(e.target.value)}
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Municipio</Form.Label>
                            <Form.Select 
                                value={municipio} 
                                onChange={(e) => setMunicipio(e.target.value)}
                                required 
                            >
                                <option value="">Seleccione un municipio</option>
                                {municipios.map((mun) => (
                                    <option key={mun.id_municipio} value={mun.id_municipio}>{mun.nombre_municipio}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Zona</Form.Label>
                            <Form.Select 
                                value={zona} 
                                onChange={(e) => setZona(e.target.value)}
                                required 
                            >
                                <option value="">Seleccione una zona</option>
                                {zonas.map((z) => (
                                    <option key={z.id_zona} value={z.id_zona}>{z.nombre_zona}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comentarios adicionales</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                value={comentarios} 
                                onChange={(e) => setComentarios(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha del pedido: {fechaPedido}</Form.Label>
                        </Form.Group>
                        <h5>Resumen del pedido:</h5>
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    {item.name} - Cantidad: {item.quantity} - Subtotal: Q{item.price * item.quantity}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <h5 className="mt-3">Total: Q{total.toFixed(2)}</h5>
                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Confirmar Pedido
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmacionPedido;