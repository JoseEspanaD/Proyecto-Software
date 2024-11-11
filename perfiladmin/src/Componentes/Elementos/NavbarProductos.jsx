import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NavbarProductos = ({ onCategoryChange, activeCategory }) => {
    const [categories, setCategories] = useState(['Todos']); // Inicia con 'Todos'

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/categories');
                const fetchedCategories = response.data.map(category => ({
                    name: category.name,
                    code: category.code
                }));
                setCategories([{ name: 'Todos', code: 'Todos' }, ...fetchedCategories]);
                console.log("Categorías obtenidas:", fetchedCategories);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };
    
        fetchCategories();
    }, []);
    

    return (
        <nav className="navbar navbar-productos navbar-expand-lg">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    {categories.map((category) => (
    <div
        key={category.code}
        className={`nav-link text-white ${activeCategory === category.code ? 'active' : ''}`}
        onClick={() => onCategoryChange(category.code)} // Envía el código de la categoría
        style={{ cursor: 'pointer' }}
    >
        {category.name}
    </div>
))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarProductos;
