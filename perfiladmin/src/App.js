import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Principal from './Componentes/Principal'; 
import Inicio from './Componentes/Inicio';  
import PrivateRoute from './Componentes/PrivateRoute';
import RegisterForm from './Componentes/RegisterForm';
import Tablas from './Componentes/Tablas';
import Formularios from './Componentes/Formularios'; 
import Opciones from './Componentes/Opciones'; 
import Productos from './Componentes/Productos'; 
import Detalleproducto from './Componentes/Detalleproducto';
import './App.css'; 

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Inicio />} /> 
        <Route path="/Register" element={
          <PrivateRoute>
            <RegisterForm />
          </PrivateRoute>
        } /> 
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
        <Route path="/Productosdis" element={
          <PrivateRoute>
            <Productos />
          </PrivateRoute>
        } /> 
        <Route path="/DetalleProducto/:id" element={
          <PrivateRoute>
            <Detalleproducto />
          </PrivateRoute>
        } /> 
      </Routes>
    </BrowserRouter>
  );
}   

export default App;
