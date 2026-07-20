import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';
import './Home.css';

const Home = () => {
  const totalProducts = productsData.length;
  const totalCategories = 3;

  return (
    <div className="home-container">
      <h1 className="home-title">¡Hola Administrador!</h1>

      {/* Tarjeta de Productos */}
      <div className="dashboard-card">
        <div className="card-info">
          <h2>📦 {totalProducts} Productos</h2>
          <p>Gestión e inventario del catálogo</p>
        </div>
        <div className="card-actions">
          <Link to="/products" className="btn-dashboard">
            Ver Listado
          </Link>
          <Link to="/products/new" className="btn-dashboard">
            Agregar Producto
          </Link>
        </div>
      </div>

      {/* Tarjeta de Categorías */}
      <div className="dashboard-card">
        <div className="card-info">
          <h2>🏷️ {totalCategories} Categorías</h2>
          <p>Organización de productos por sector</p>
        </div>
        <div className="card-actions">
          <Link to="/categories" className="btn-dashboard">
            Ver Listado
          </Link>
          <Link to="/categories/new" className="btn-dashboard">
            Agregar Categoría
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;