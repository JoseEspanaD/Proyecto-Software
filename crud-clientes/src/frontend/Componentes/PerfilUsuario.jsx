import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icono de perfil
import './StylesComponent.css';

const PerfilUsuario = () => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Función para obtener los datos del usuario
        const fetchUserData = async () => {
            const response = await fetch('http://localhost:5000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('authToken'),
                },
            });
            const data = await response.json();
            setUserData(data);
            setFormData(data); // Inicializa el formulario con los datos del usuario
        };

        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken'),
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            setUserData(formData);
            setIsEditing(false);
        } else {
            const errorData = await response.json();
            console.error('Error al actualizar:', errorData);
        }
    };

    return (
        <div className="user-profile">
            <div className="profile-header">
                <FaUserCircle className="profile-icon" />
                <h2>Perfil de Usuario</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="profile-info">
                    <label>Nombre:&nbsp;&nbsp;</label>
                    {isEditing ? (
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    ) : (
                        <span>{userData.name}</span>
                    )}
                </div>
                <div className="profile-info">
                    <label>Correo:&nbsp;&nbsp;</label>
                    {isEditing ? (
                        <input type="email" name="e_mail" value={formData.e_mail} onChange={handleChange} />
                    ) : (
                        <span>{userData.e_mail}</span>
                    )}
                </div>
                <div className="profile-info">
                    <label>Dirección:&nbsp;&nbsp;</label>
                    {isEditing ? (
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    ) : (
                        <span>{userData.address}</span>
                    )}
                </div>
                <div className="profile-info">
                    <label>Teléfono:&nbsp;&nbsp;</label>
                    {isEditing ? (
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>
                <div className="profile-info">
                    <label>Municipio:&nbsp;&nbsp;</label>
                    {isEditing ? (
                        <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} />
                    ) : (
                        <span>{userData.municipio}</span>
                    )}
                </div>
                <button type="button" onClick={handleEditToggle}>
                    {isEditing ? 'Cancelar' : 'Editar'}
                </button>
                {isEditing && <button type="submit">Guardar Cambios</button>}
            </form>
        </div>
    );
};

export default PerfilUsuario;