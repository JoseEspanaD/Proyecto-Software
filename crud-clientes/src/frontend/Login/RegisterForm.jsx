import React, { useState } from 'react';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');  
    const [message, setMessage] = useState('');

    const handleSubmitt = async (e) => {
        e.preventDefault();
        const formData = { name, password, e_mail: email, address };
    
        try {
            const response = await fetch('http://localhost:5000/Registros.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage('Error en el registro');
        }
    };

    return (
        <div>
            <h2>NUEVO ADMINISTRADOR</h2>
            <form onSubmit={handleSubmitt}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>  
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}  // Cambiado a address
                        required
                    />
                </div>      
                <button type="submit">Registrarse</button>  {/* Cambiado el texto del botón */}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterForm;
