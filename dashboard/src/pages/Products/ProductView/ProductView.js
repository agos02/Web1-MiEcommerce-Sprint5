import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsData from '../../../data/products.json';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;
  // Buscamos el producto comparando como número o string
  const product = productsData.find((p) => String(p.id) === String(id));

  // Si no es una creación nueva y no se encuentra el producto con ese ID
  if (!isNew && !product) {
    return (
      <div className="product-view-container">
        <button onClick={() => navigate('/products')} className="btn-back">
          ← Volver a productos
        </button>
        <div className="not-found-card">
          <h2>Producto no encontrado</h2>
          <p>El producto con ID "{id}" no existe o fue removido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-view-container">
      <button onClick={() => navigate('/products')} className="btn-back">
        ← Volver
      </button>

      {isNew ? (
        /* MODO FORMULARIO: CREAR PRODUCTO */
        <div className="product-form-card">
          <h2>Agregar Nuevo Producto</h2>
          <form onSubmit={(e) => e.preventDefault()} className="product-form">
            <div className="form-group">
              <label>Nombre del Producto</label>
              <input type="text" placeholder="Ej. Whiskey Jack Daniels" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio (ARS)</label>
                <input type="number" placeholder="Ej. 15000" required />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input type="number" placeholder="Ej. 10" required />
              </div>
            </div>

            <div className="form-group">
              <label>Nombre del archivo de imagen</label>
              <input type="text" placeholder="Ej. Jack Daniels.jpg" />
              <small className="help-text">La imagen debe estar subida en public/images/</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* MODO VISTA DE DETALLE DEL PRODUCTO */
        <div className="product-detail-card">
          <div className="detail-image-container">
            {product.stock <= 0 && (
              <span className="badge-sin-stock-detail">SIN STOCK</span>
            )}
            <img
              src={product.image ? `/images/${product.image}` : '/images/fallback.png'}
              alt={product.name}
              className={`detail-image ${product.stock <= 0 ? 'imagen-agotada' : ''}`}
            />
          </div>

          <div className="detail-info">
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-price-box">
              <span className="detail-price">${product.price?.toLocaleString('es-AR')}</span>
              <span className="detail-currency">ARS</span>
            </div>

            <div className="detail-stock-box">
              <span className="stock-label">Stock disponible:</span>
              <span className={`stock-value ${product.stock <= 0 ? 'text-danger' : ''}`}>
                {product.stock} unidades
              </span>
            </div>

            {product.description && (
              <div className="detail-description">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="detail-actions">
              <button className="btn-action btn-edit">
                ✏️ Editar Producto
              </button>
              <button className="btn-action btn-delete">
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;