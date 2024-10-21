import { Carousel } from 'react-bootstrap';
import './StylesPaginas.css'; 
import Carrousel1 from '../Assets/Carrousel1.PNG';
import Carrousel2 from '../Assets/Carrousel2.PNG';
import Carrousel3 from '../Assets/Carrousel3.PNG';
import Logotipo2 from '../Assets/Logotipo2.PNG'; 
import Navbar from '../Componentes/Navbar';

function Inicio() {
  return (
    <>
      <Navbar />

      {/* CARROUSEL */}
      <Carousel className="custom-carousel" controls={false} indicators={false}>
        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block carousel-image" src={Carrousel1} alt="First slide" />
            <img className="d-block carousel-image" src={Carrousel2} alt="Second slide" />
            <img className="d-block carousel-image" src={Carrousel3} alt="Third slide" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-container">
            <img className="d-block carousel-image" src={Carrousel1} alt="First slide" />
            <img className="d-block carousel-image" src={Carrousel2} alt="Second slide" />
            <img className="d-block carousel-image" src={Carrousel3} alt="Third slide" />
          </div>
        </Carousel.Item>
        {/* Agrega más Carousel.Item según sea necesario */}
      </Carousel>

      {/* INFORMACION DE EMPRESA */}
      <div className="info-container">
        <h2 className="info-title">Embutidos Premium</h2>
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
    </>
  );
}

export default Inicio;
