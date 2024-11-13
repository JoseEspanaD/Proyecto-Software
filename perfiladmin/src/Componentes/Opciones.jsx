import React, { useState } from 'react';
import Sidebar from './Elementos/Sidebar';
import Footer from './Elementos/Footer';
import Header from './Elementos/Header';
import NavbarPedidos from './Opciones/NavbarPedidos';  // Importa tu navbar
import { Container } from 'react-bootstrap'; 
import './Estilo.css'; 
import Enproceso from './Tablas/Enproceso';
import Entregados from './Tablas/Entregados';
import Sinver from './Tablas/Sinver';

const Opciones = () => {
    // Estado para manejar la categoría seleccionada
    const [activeCategory, setActiveCategory] = useState('Todos');

    // Maneja el cambio de categoría
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <div> 
            <Sidebar />
            <div className="content">
                <Header /> 
                <NavbarPedidos onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
                <Container>
                    {/* Renderiza el navbar y pasa la función y el estado */}
                    

                    {/* Mostrar la tabla según la categoría activa */}
                    {activeCategory === 'Todos' && (
                        <>
                            <Sinver />
                            <Enproceso />
                            <Entregados />
                            
                        </>
                    )}
                    {activeCategory === 'Sin Ver' && <Sinver />}
                    {activeCategory === 'En Proceso' && <Enproceso />}
                    {activeCategory === 'Entregados' && <Entregados />}
                    
                    
                </Container>
            </div>
            <br></br><br></br>
            <Footer />
        </div>
    );
};

export default Opciones;

 