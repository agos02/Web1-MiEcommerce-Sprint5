import React from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';
import './Home.css';

const Home = () => {
  const totalProducts = productsData.length;

  return (
    <div className="home-container">
      <h1 className="welcome-title">¡Hola Administrador!</h1>

      <div className="dashboard-cards">
        
        {/* Tarjeta de Productos */}
        <div className="dash-card">
          <div className="card-info">
            <span className="card-icon">📦</span>
            <h2><strong>{totalProducts}</strong> Productos</h2>
          </div>
          <div className="card-actions">
            <Link to="/products" className="btn-dash btn-secondary">
              Ver Listado
            </Link>
            <Link to="/products/new" className="btn-dash btn-primary">
              Agregar Producto
            </Link>
          </div>
        </div>

        {/* Tarjeta de Categorías */}
        <div className="dash-card">
          <div className="card-info">
            <span className="card-icon">🗃️</span>
            <h2><strong>3</strong> Categorías</h2>
          </div>
          <div className="card-actions">
            <Link to="/categories" className="btn-dash btn-secondary">
              Ver Listado
            </Link>
            <button className="btn-dash btn-primary">
              Agregar Categoría
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;