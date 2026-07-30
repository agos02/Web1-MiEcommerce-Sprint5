import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ username = "Administrador" }) => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setTotalProducts(data.totalProducts);
        setTotalCategories(data.totalCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las estadísticas:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">¡Hola {username}!</h1>

      {/* Tarjeta de Productos */}
      <div className="dashboard-card">
        <div className="card-info">
          <h2>📦 {loading ? "..." : totalProducts} Productos</h2>
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
          <h2>🏷️ {loading ? "..." : totalCategories} Categorías</h2>
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