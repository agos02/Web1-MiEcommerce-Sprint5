//(archivo principal de la app) 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos componentes requeridos
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Inicio (Home) */}
        <Route path="/" element={<Home />} />

        {/* Página de productos (ProductsList) */}
        <Route path="/products" element={<ProductsList />} />

        {/* Página para agregar un producto */}
        <Route path="/products/new" element={<ProductView />} />

        {/* Página de un producto dinámico (ProductView) */}
        <Route path="/products/:id" element={<ProductView />} />

        {/* Página de perfil del usuario actual */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;