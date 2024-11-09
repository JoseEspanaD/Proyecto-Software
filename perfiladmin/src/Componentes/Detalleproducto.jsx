import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Elementos/Header';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import NavbarProductos from './Elementos/NavbarProductos';
import DescripcionProducto from './Elementos/DescripcionProducto';

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        axios.get(`http://localhost:5001/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los detalles del producto:', error);
            });
    }, [id]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        navigate('/productos', { state: { category } });
    };

    if (!product) {
        return <p>Cargando detalles del producto...</p>;
    }

    return ( 
        <>  
            <Sidebar />
            <div className="content">
            <Header />
            <NavbarProductos onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
            <DescripcionProducto product={product} />
            </div>
            <Footer />
        </>
    );
};

export default DetalleProducto;
