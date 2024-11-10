import React, { useEffect, useState } from 'react';
import axios from 'axios';  
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import ClientesRecientes from './Tablas/ClientesRecientes';
import { Container, Card, Row, Col} from 'react-bootstrap';
import './Estilo.css';
function Principal() {
  const [totalAdmins, setTotalAdmins] = useState(null);
  const [totalClients, setTotalClients] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalCategory, setTotalCategory] = useState(null);
  useEffect(() => {
    // Función para obtener el total de administradores
    const fetchTotalAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5001/total_administradores.js');
        setTotalAdmins(response.data[0].count);
      } catch (error) {
        console.error('Error al obtener el total de administradores:', error);
      }
    };

    // Función para obtener el total de clientes
    const fetchTotalClients = async () => {
      try {
        const response = await axios.get('http://localhost:5001/total_clientes.js');
        setTotalClients(response.data[0].count);
      } catch (error) {
        console.error('Error al obtener el total de clientes:', error);
      }
    };

    // Funcion para obtener el total de productos
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/total_productos.js');
        setTotalProducts(response.data[0].count);
      } catch (error) {
        console.error('Error al obtener el total de productos:', error);
      }
    };
    // Funcion para obtener el total de categorias
    const fetchTotalCategory = async () => {
      try {
        const response = await axios.get('http://localhost:5001/total_categorias.js');
        setTotalCategory(response.data[0].count);
      } catch (error) {
        console.error('Error al obtener el total de productos:', error);
      }
    };

    // Llama a las funciones para obtener los datos
    fetchTotalAdmins();
    fetchTotalClients();
    fetchTotalProducts();
    fetchTotalCategory();
  }, []);
    return (
     <div> 
      <div >
       <Sidebar />
        <div className="content "> 
        <Header />
        <Container>
        <br></br>
        <Row className="g-4"> {/* Espacio de 4 unidades entre columnas */}
        <Col> 
          <Card style={{ width: '18rem' }} text ={'white'} bg={'Dark'.toLowerCase()} >
            <Card.Body>
              <Card.Title>Cantidad de Administradores (activos):</Card.Title> 
              <Card.Title>{totalAdmins}</Card.Title>   
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Cantidad de Clientes (activos):</Card.Title> 
              <Card.Title>{totalClients}</Card.Title>  
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Cantidad de Productos (activos):</Card.Title> 
              <Card.Title>{totalProducts}</Card.Title>  
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Cantidad de Categorias (activos):</Card.Title> 
              <Card.Title>{totalCategory}</Card.Title>  
            </Card.Body>
          </Card>
        </Col>
        </Row>
        <ClientesRecientes /><br></br> <br></br>
        </Container>
        <Footer />
        </div> 
      </div>
      </div>
       
    );
  }
  export default Principal;