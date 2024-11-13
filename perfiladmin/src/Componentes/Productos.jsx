import './Estilo.css';
import Header from './Elementos/Header'; 
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import NavbarProductos from './Elementos/NavbarProductos';
import { Container } from 'react-bootstrap';
import TarjetaProducto from './Elementos/TarjetaProducto';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Productos = () => {
    const [products, setProducts] = useState([]); // Todos los productos
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados por categoría
    const [categories, setCategories] = useState([]); // Categorías dinámicas
    const [activeCategory, setActiveCategory] = useState('Todos'); // Categoría activa

    // Obtener productos y categorías al cargar la página
    useEffect(() => {
        // Solicitud para obtener los productos
        axios.get('http://localhost:5001/api/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data); // Mostrar todos los productos inicialmente
            })
            .catch((error) => {
                console.error('Error al obtener los productos:', error);
            });

        // Solicitud para obtener las categorías
        axios.get('http://localhost:5001/api/categories')
            .then((response) => {
                setCategories(response.data); // Guardar las categorías en el estado
            })
            .catch((error) => {
                console.error('Error al obtener las categorías:', error);
            });
    }, []);

    // Manejar el filtrado por categoría
    const handleCategoryChange = (categoryCode) => {
        setActiveCategory(categoryCode);
        if (categoryCode === 'Todos') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === categoryCode));
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="content">
                <Header />
                {/* Pasamos la función de categoría y las categorías dinámicas al Navbar */}
                <NavbarProductos onCategoryChange={handleCategoryChange} activeCategory={activeCategory} categories={categories} />
                <Container>
                    <div className="product-container">
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {filteredProducts.map((product, index) => (
                                <TarjetaProducto
                                    key={index}
                                    id={product.id_product} // ID del producto
                                    image={product.image} // URL de la imagen
                                    title={product.name} // Nombre del producto
                                    price={`Q${product.price}`} // Precio
                                    weight={`${product.weight}gr`} // Peso
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Productos;
