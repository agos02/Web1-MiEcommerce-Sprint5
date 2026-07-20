import React from 'react';
import { Link } from 'react-router-dom';

// Importamos directamente el JSON de productos
import productsData from '../../../data/products.json'; 

import './ProductsList.css';

// Usamos productsData por defecto en caso de no recibir nada por props
const ProductsList = ({ products = productsData }) => {
  return (
    <div className="contenedor-detalle">
      
      {/* GRILLA DE PRODUCTOS */}
      <div className="grilla-productos">
        {products && products.map((producto) => {
          const sinStock = producto.stock <= 0;

          return (
            <div key={producto.id} className="tarjeta-chica">
              
              {/* Badge de Sin Stock */}
              {sinStock && (
                <span className="badge-sin-stock-chico">SIN STOCK</span>
              )}

              {/* Imagen del producto */}
              <img
                src={producto.image ? `/images/${producto.image}` : '/images/fallback.png'}
                alt={producto.name}
                className={sinStock ? 'imagen-agotada' : ''}
              />

              {/* Cuerpo con Nombre y Precio */}
              <div className="cuerpo-tarjeta">
                <p className="nombre-relacionado">
                  {producto.name}
                </p>

                <div className="precio-relacionado">
                  <span className="puntos">${producto.price.toLocaleString('es-AR')}</span>
                  <span className="label">ARS</span>
                </div>
              </div>

              {/* Botón para ver detalle */}
              <Link 
                to={`/products/${producto.id}`} 
                className="btn-agregar" 
                style={{ textAlign: 'center', textDecoration: 'none', marginTop: '15px', padding: '10px 0' }}
              >
                Ver detalle
              </Link>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ProductsList;