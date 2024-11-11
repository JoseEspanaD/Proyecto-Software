import './Header.css'; 
import { FaArrowCircleRight, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; 

const TarjetaProducto = ({ id, image, title, price, weight }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(item => item.id === id));
    }, [id]);

    const handleRedirect = () => {
        navigate(`/DetalleProducto/${id}`);
    };

    const handleFavoriteToggle = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = favorites.filter(item => item.id !== id);
            setModalMessage('El producto se ha quitado de favoritos');
        } else {
            updatedFavorites = [...favorites, { id, image, name: title, price }];
            setModalMessage('El producto se ha añadido a favoritos');
        }
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false); 
    };

    return (
        <div className="col">
            <div className="card product-card">
                <img src={`http://localhost:5001/uploads/${image}`} className="card-img-top" alt={title} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Precio: {price}</p>
                    <p className="card-text">Peso: {weight}</p>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        
                        <FaArrowCircleRight
                            className="arrow-icon"
                            onClick={handleRedirect}
                            size={24}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Favoritos</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TarjetaProducto;
