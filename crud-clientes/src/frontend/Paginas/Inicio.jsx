import { Carousel } from 'react-bootstrap';
import './StylesPaginas.css'; 
import Carrousel1 from '../Assets/Carrousel1.PNG';
import Carrousel2 from '../Assets/Carrousel2.PNG';
import Carrousel3 from '../Assets/Carrousel3.PNG';
import Carrousel4 from '../Assets/Carrousel4.PNG';
import Carrousel5 from '../Assets/Carrousel5.PNG';
import Logotipo2 from '../Assets/Logotipo2.PNG'; 
import Navbar from '../Componentes/Navbar';
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importar iconos
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Inicio() {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleExploreProducts = () => {
    navigate('/productos'); // Redirigir a la ruta de Pedidos
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

      {/* CARROUSEL */}
      <Carousel className="custom-carousel" controls={true} indicators={true}>
        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block carousel-image" src={Carrousel1} alt="First slide" />
            <img className="d-block carousel-image" src={Carrousel2} alt="Second slide" />
            <img className="d-block carousel-image" src={Carrousel3} alt="Third slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block carousel-image" src={Carrousel4} alt="First slide" />
            <img className="d-block carousel-image" src={Carrousel5} alt="Second slide" />
            <img className="d-block carousel-image" src={Carrousel3} alt="Third slide" />
          </div>
        </Carousel.Item>
        {/* Agrega más Carousel.Item según sea necesario */}
      </Carousel>

      {/* INFORMACION DE EMPRESA */}
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
        <p><FaEnvelope /> S E R V I C I O A L C L I E N T E C A R N E S P A @ G M A I L . C O M</p>
        <p><FaEnvelope /> R E C E P C I O N C A R N E S P A @ G M A I L . C O M</p>
        <p><FaPhone /> P B X 2 2 8 9 4 5 4 2</p>
      </div>
    </>
  );
}

export default Inicio;
