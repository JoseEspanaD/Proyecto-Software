import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiar Switch a Routes
import Principal from './Componentes/Principal'; 
import Inicio from './Componentes/Inicio';  
import PrivateRoute from './Componentes/PrivateRoute';
import RegisterForm from './Componentes/RegisterForm';
import Tablas from './Componentes/Tablas';
import Formularios from './Componentes/Formularios'; 
import Opciones from './Componentes/Opciones'; 
import './App.css'; 
function App() {
  return (
    
    <Router> 
             
            <Routes>
                <Route path="/" element={<Inicio />} /> 
                <Route path="/Register" element={<RegisterForm />} /> 
                <Route path="/Principal" element={
                  <PrivateRoute>
                  <Principal />
                  </PrivateRoute>
                } />
                <Route path="/Tablas" element={
                  <PrivateRoute>
                  <Tablas />
                  </PrivateRoute>
                } />
                <Route path="/Formularios" element={
                  <PrivateRoute>
                  <Formularios />
                  </PrivateRoute>
                } />  
                <Route path="/Opciones" element={
                  <PrivateRoute>
                  <Opciones />
                  </PrivateRoute>
                } /> 
            </Routes>
        </Router>
  );
}   

export default App;