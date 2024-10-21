import './StylesComponent.css'; 
import { FaUser, FaHome, FaBoxOpen, FaClipboardList } from 'react-icons/fa'; // Importa los iconos
import { TiShoppingCart, TiStarFullOutline } from "react-icons/ti";
import { NavLink } from 'react-router-dom'; 
import Logotipo from '../Assets/Logotipo.jpeg';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                {/* Logotipo en la parte izquierda */}
                <NavLink className="navbar-brand" to="/">
                    <img src={Logotipo} alt="Logo" className="logo" />
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Opciones centradas */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link text-white" to="/" activeClassName="active"><FaHome className="icon" /> Inicio</NavLink>
                        <NavLink className="nav-link text-white" to="/perfil" activeClassName="active"><FaUser className="icon" /> Perfil</NavLink>
                        <NavLink className="nav-link text-white" to="/productos" activeClassName="active"><FaBoxOpen className="icon" /> Productos</NavLink>
                        <NavLink className="nav-link text-white" to="/pedidos" activeClassName="active"><FaClipboardList className="icon" /> Pedidos</NavLink>
                    </div>
                </div>

                {/* Íconos de carrito y favoritos en la parte derecha */}
                <div className="navbar-icons">
                    <NavLink className="nav-link text-white" to="/carrito"><TiShoppingCart className="icon" /></NavLink>
                    <NavLink className="nav-link text-white" to="/favoritos"><TiStarFullOutline className="icon" /></NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
