import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './StylesPaginas.css';
import Navbar from '../Componentes/Navbar';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Logotipo2 from '../Assets/Logotipo2.PNG';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Inicio() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Obtener categorías de la base de datos
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories') // Endpoint para obtener las categorías
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
      });
  }, []);

  const handleExploreProducts = () => {
    navigate('/productos');
  };

  return (
    <>
      <Navbar />

      {/* Sección de Bienvenida */}
      <div className="welcome-section">
        <h1>Bienvenido a Carnespa</h1>
        <p>Descubre la calidad de nuestros embutidos, elaborados con los mejores ingredientes y métodos tradicionales.</p>
        <button className="explore-button" onClick={handleExploreProducts}>Explorar Productos</button>
      </div>

      {/* Sección de Categorías */}
      <div className="categories-section">
        <h1>Categorías en las que somos expertos</h1>
        <p>Ofrecemos una amplia variedad de embutidos, desde chorizos ahumados hasta jamones curados, todos elaborados con pasión y dedicación.</p>
      </div>

      {/* CAROUSEL dinámico con imágenes de la base de datos */}
      <Carousel className="custom-carousel" controls={true} indicators={true}>
        {categories
          .filter(category => category.image) // Filtra las categorías que tienen una imagen
          .map((category, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-container">
                <img
                  className="d-block carousel-image"
                  src={`http://localhost:5001/uploads/${category.image}`} // Construye la URL completa de la imagen
                  alt={`Imagen de la categoría ${category.name}`}
                />
                <Carousel.Caption>
                  <h3>{category.name}</h3>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>

      {/* INFORMACIÓN DE EMPRESA */}
      <div className="info-container">
        <h1>¿Quiénes Somos?</h1>
        <div className="info-content">
          <img className="info-image" src={Logotipo2} alt="Carnespa" />
          <p className="info-text">
            Carnespa es una empresa dedicada a la producción de embutidos de alta calidad,
            utilizando los mejores ingredientes y métodos tradicionales para ofrecer productos
            deliciosos y frescos a nuestros clientes. Nos comprometemos a brindar excelencia
            en cada bocado.
          </p>
        </div>
      </div>

      {/* Sección de Contacto */}
      <div className="contact-section">
        <h2>Contáctanos</h2>
        <p><FaEnvelope /> SERVICIOALCLIENTE@CARNESPA.COM</p>
        <p><FaEnvelope /> RECEPCION@CARNESPA.COM</p>
        <p><FaPhone /> PBX 2289-4542</p>
      </div>
    </>
  );
}

export default Inicio;
