import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../../../data/products.json'; 
import './ProductsList.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const productosFiltrados = products.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <div className="cargando-container">Cargando…</div>;
  }

  return (
    <div className="contenedor-detalle">
      
      {/* BARRA SUPERIOR UNIFICADA */}
      <div className={`encabezado-productos ${isSearchOpen ? 'search-active' : ''}`}>
        
        <h1 className="titulo-seccion">Productos</h1>
        
        <div className="acciones-derecha">
          <div className={`input-busqueda-container ${isSearchOpen ? 'open' : ''}`}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
            {isSearchOpen && (
              <button 
                type="button" 
                className="btn-close-search" 
                onClick={() => { setIsSearchOpen(false); setBusqueda(''); }}
              >
                ✕
              </button>
            )}
          </div>

          <button 
            type="button" 
            className="btn-icon-search" 
            onClick={() => setIsSearchOpen(true)}
          >
            🔍
          </button>

          <Link to="/products/new" className="btn-agregar-producto">
            <span className="texto-btn">Agregar Producto</span>
            <span className="icono-btn">+</span>
          </Link>
        </div>
      </div>

      {/* GRILLA DE PRODUCTOS */}
      <div className="grilla-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => {
            const sinStock = producto.stock <= 0;

            return (
              <div key={producto.id} className="tarjeta-chica">
                {sinStock && <span className="badge-sin-stock-chico">SIN STOCK</span>}

                <img
                  src={producto.image ? `/images/${producto.image}` : '/images/fallback.png'}
                  alt={producto.name}
                  className={sinStock ? 'imagen-agotada' : ''}
                />

                <div className="cuerpo-tarjeta">
                  <p className="nombre-relacionado">{producto.name}</p>

                  <div className="precio-relacionado">
                    <span className="puntos">${producto.price.toLocaleString('es-AR')}</span>
                    <span className="label">ARS</span>
                  </div>
                </div>

   
                {/* Botón Ver Detalle */}
                <Link 
                  to={`/products/${producto.id}`} 
                  className="btn-agregar" 
                  style={{ textAlign: 'center', textDecoration: 'none', marginTop: '15px', padding: '10px 0', display: 'block' }}
                >
                  Ver detalle
                </Link>
              </div>
            );
          })
        ) : (
          <p style={{ color: '#aaa', gridColumn: '1 / -1', textAlign: 'center' }}>No se encontraron productos.</p>
        )}
      </div>

    </div>
  );
};

export default ProductsList;