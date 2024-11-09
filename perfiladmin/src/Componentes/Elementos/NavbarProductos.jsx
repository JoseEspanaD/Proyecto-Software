import './Header.css'; 
const NavbarProductos = ({ onCategoryChange, activeCategory }) => {
    const categories = ['Todos', 'Madurados', 'Chorizos y Longanizas', 'Embutidos', 'Carnes'];

    return (
        <nav className="navbar navbar-productos navbar-expand-lg">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className={`nav-link text-white ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => onCategoryChange(category)} // Actualiza la categoría activa
                                style={{ cursor: 'pointer' }} // Agregar un cursor pointer
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarProductos;