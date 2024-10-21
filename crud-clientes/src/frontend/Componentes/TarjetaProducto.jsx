// TarjetaProducto.jsx
import { FaArrowCircleRight, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './StylesComponent.css';

const TarjetaProducto = ({ id, image, title, price, weight }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false); // Estado para indicar si el producto es favorito

    const handleRedirect = () => {
        navigate(`/DetalleProducto/${id}`); // Redirige a la página de detalles del producto
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite); // Cambia el estado de favorito
        const message = !isFavorite ? '¡Producto agregado a favoritos!' : '¡Producto removido de favoritos!';
        alert(message); // Muestra un mensaje al usuario
    };

    return (
        <div className="col">
            <div className="card product-card">
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Precio: {price}</p>
                    <p className="card-text">Peso: {weight}</p>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <FaStar
                            onClick={handleFavoriteToggle}
                            size={24}
                            style={{
                                cursor: 'pointer',
                                marginLeft: '10px',
                                color: isFavorite ? 'gold' : 'gray', // Cambia el color según el estado
                            }}
                        />
                        <FaArrowCircleRight
                            className="arrow-icon"
                            onClick={handleRedirect}
                            size={24}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TarjetaProducto;
