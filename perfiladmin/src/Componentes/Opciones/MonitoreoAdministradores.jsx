import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const MonitoreoAdministradores = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5001/MonitoreoAdministradores');
            setData(response.data);
        };
        fetchData();
    }, []);

    return (
        <Container>
            <h1>Monitoreo de Administradores</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Administrador</th>
                        <th>Promedio de Tiempo (ms)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(admin => (
                        <tr key={admin.id_admin}>
                            <td>{admin.name}</td>
                            <td>{admin.avg_time}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MonitoreoAdministradores;
