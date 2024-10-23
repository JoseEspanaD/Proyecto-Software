// TarjetaProducto.jsx
import { FaArrowCircleRight, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './StylesComponent.css';

const TarjetaProducto = ({ id, image, title, price, weight }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleRedirect = () => {
        navigate(`/DetalleProducto/${id}`);
    };

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        const message = !isFavorite ? '¡Producto agregado a favoritos!' : '¡Producto removido de favoritos!';
        alert(message);
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
                                color: isFavorite ? 'gold' : 'gray',
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
