import React, { useState, useEffect } from 'react';
import { Container, Button, Form, ListGroup, Modal, Alert } from 'react-bootstrap';

function ZonasMunicipios() {
  const [municipios, setMunicipios] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [nuevoMunicipio, setNuevoMunicipio] = useState('');
  const [nuevaZona, setNuevaZona] = useState('');
  const [showMunicipios, setShowMunicipios] = useState(false);
  const [showZonas, setShowZonas] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchMunicipios();
    fetchZonas();
  }, []);

  const fetchMunicipios = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/municipios');
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
    }
  };

  const fetchZonas = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/zonas');
      const data = await response.json();
      setZonas(data);
    } catch (error) {
      console.error('Error al cargar zonas:', error);
    }
  };

  const agregarMunicipio = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/municipios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_municipio: nuevoMunicipio }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar municipio');
      }

      const data = await response.json();
      console.log(data);
      setNuevoMunicipio('');
      fetchMunicipios();
      setMensaje('Se ha agregado el nuevo municipio correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al agregar municipio:', error);
      setMensaje('Error al agregar municipio');
    }
  };

  const eliminarMunicipio = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/municipios/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar municipio');
      }

      fetchMunicipios();
      setMensaje('Se ha eliminado el municipio correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
      setMensaje('Error al eliminar municipio');
    }
  };

  const agregarZona = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/zonas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_zona: nuevaZona }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar zona');
      }

      const data = await response.json();
      console.log(data);
      setNuevaZona('');
      fetchZonas();
      setMensaje('Se ha agregado la nueva zona correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al agregar zona:', error);
      setMensaje('Error al agregar zona');
    }
  };

  const eliminarZona = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/zonas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar zona');
      }

      fetchZonas();
      setMensaje('Se ha eliminado la zona correctamente');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error('Error al eliminar zona:', error);
      setMensaje('Error al eliminar zona');
    }
  };

  return (
    <Container>
      <h2 className="titulo-historial">Gestión de Cobertura</h2>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      <Form>
        <Form.Group controlId="formNuevoMunicipio" style={{ marginBottom: '20px' }}>
          <Form.Label style={{ color: 'white' }}>Agregar Municipio</Form.Label>
          <Form.Control
            type="text"
            value={nuevoMunicipio}
            onChange={(e) => setNuevoMunicipio(e.target.value)}
            placeholder="Nombre del municipio"
          />
          <Button variant="primary" onClick={agregarMunicipio} className="me-2" size="sm">Agregar</Button>
          <Button variant="info" onClick={() => { fetchMunicipios(); setShowMunicipios(true); }} size="sm">Ver Municipios</Button>
        </Form.Group>
        <Form.Group controlId="formNuevaZona">
          <Form.Label style={{ color: 'white' }}>Agregar Zona</Form.Label>
          <Form.Control
            type="text"
            value={nuevaZona}
            onChange={(e) => setNuevaZona(e.target.value)}
            placeholder="Nombre de la zona"
          />
          <Button variant="primary" onClick={agregarZona} className="me-2" size="sm">Agregar</Button>
          <Button variant="info" onClick={() => { fetchZonas(); setShowZonas(true); }} size="sm">Ver Zonas</Button>
        </Form.Group>
      </Form>
      {/* Modal para Municipios */}
      <Modal show={showMunicipios} onHide={() => setShowMunicipios(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lista de Municipios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {municipios.map((municipio) => (
              <ListGroup.Item key={municipio.id_municipio}>
                {municipio.nombre_municipio}
                <Button variant="danger" onClick={() => eliminarMunicipio(municipio.id_municipio)} style={{ marginLeft: '10px', float: 'right' }} size="sm">Eliminar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
      {/* Modal para Zonas */}
      <Modal show={showZonas} onHide={() => setShowZonas(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lista de Zonas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {zonas.map((zona) => (
              <ListGroup.Item key={zona.id_zona}>
                {zona.nombre_zona}
                <Button variant="danger" onClick={() => eliminarZona(zona.id_zona)} style={{ marginLeft: '10px', float: 'right' }} size="sm">Eliminar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ZonasMunicipios;