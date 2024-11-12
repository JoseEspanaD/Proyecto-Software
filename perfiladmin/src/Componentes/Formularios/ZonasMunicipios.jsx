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
      const response = await fetch('http://localhost:5001/api/municipios'); // Asegúrate de tener esta ruta en tu backend
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Error al cargar municipios:', error);
    }
  };

  const fetchZonas = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/zonas'); // Asegúrate de que esta ruta sea correcta
      const data = await response.json();
      setZonas(data);
    } catch (error) {
      console.error('Error al cargar zonas:', error);
    }
  };

  const agregarMunicipio = async () => {
    try {
      await fetch('http://localhost:5001/api/municipios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_municipio: nuevoMunicipio }),
      });
      setNuevoMunicipio('');
      fetchMunicipios();
      setMensaje('Se ha agregado el nuevo municipio correctamente');
      setTimeout(() => setMensaje(''), 3000); // Mensaje desaparece después de 2 segundos
    } catch (error) {
      console.error('Error al agregar municipio:', error);
    }
  };

  const eliminarMunicipio = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/municipios/${id}`, {
        method: 'DELETE',
      });
      fetchMunicipios();
      setMensaje('Se ha eliminado el municipio correctamente');
      setTimeout(() => setMensaje(''), 3000); // Mensaje desaparece después de 2 segundos
    } catch (error) {
      console.error('Error al eliminar municipio:', error);
    }
  };

  const agregarZona = async () => {
    try {
      await fetch('http://localhost:5001/api/zonas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_zona: nuevaZona }),
      });
      setNuevaZona('');
      fetchZonas();
      setMensaje('Se ha agregado la nueva zona correctamente');
      setTimeout(() => setMensaje(''), 3000); // Mensaje desaparece después de 2 segundos
    } catch (error) {
      console.error('Error al agregar zona:', error);
    }
  };

  const eliminarZona = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/zonas/${id}`, {
        method: 'DELETE',
      });
      fetchZonas();
      setMensaje('Se ha eliminado la zona correctamente');
      setTimeout(() => setMensaje(''), 3000); // Mensaje desaparece después de 2 segundos
    } catch (error) {
      console.error('Error al eliminar zona:', error);
    }
  };

  return (
    <Container>
      <h1 className="mb-4" style={{color: 'white'}} >Gestión de Cobertura</h1>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      <Form>
        <Form.Group controlId="formNuevoMunicipio">
          <Form.Label style={{color: 'white'}}>Agregar Municipio</Form.Label>
          <Form.Control
            type="text"
            value={nuevoMunicipio}
            onChange={(e) => setNuevoMunicipio(e.target.value)}
            placeholder="Nombre del municipio"
          />
          <Button variant="primary" onClick={agregarMunicipio} className="me-2">Agregar</Button>
          <Button variant="info" onClick={() => setShowMunicipios(true)}>Ver Municipios</Button>
        </Form.Group>

        <Form.Group controlId="formNuevaZona">
          <Form.Label style={{color: 'white'}}>Agregar Zona</Form.Label>
          <Form.Control
            type="text"
            value={nuevaZona}
            onChange={(e) => setNuevaZona(e.target.value)}
            placeholder="Nombre de la zona"
          />
          <Button variant="primary" onClick={agregarZona} className="me-2">Agregar</Button>
          <Button variant="info" onClick={() => setShowZonas(true)}>Ver Zonas</Button>
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
                <Button variant="danger" onClick={() => eliminarMunicipio(municipio.id_municipio)} style={{ marginLeft: '10px' }}>Eliminar</Button>
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
                <Button variant="danger" onClick={() => eliminarZona(zona.id_zona)} style={{ marginLeft: '10px' }}>Eliminar</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ZonasMunicipios;
