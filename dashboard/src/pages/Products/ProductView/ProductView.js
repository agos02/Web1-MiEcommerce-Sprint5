import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../../../data/products.json';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;
  const foundProduct = productsData.find((p) => String(p.id) === String(id));

  const [formData, setFormData] = useState({
    name: foundProduct ? foundProduct.name : '',
    price: foundProduct ? foundProduct.price : '',
    stock: foundProduct ? foundProduct.stock : 0,
    description: foundProduct ? foundProduct.description : '',
    image: foundProduct ? foundProduct.image : '',
    store: foundProduct ? foundProduct.store : 'Havanna SL'
  });

  if (!isNew && !foundProduct) {
    return (
      <div className="product-view-container">
        <button onClick={() => navigate('/products')} className="btn-back">
          ← Volver a productos
        </button>
        <div className="not-found-card" style={{ padding: '20px', color: '#fff' }}>
          <h2>Producto no encontrado</h2>
          <p>El producto con ID "{id}" no existe o fue removido.</p>
        </div>
      </div>
    );
  }

  const handleIncreaseStock = () => {
    setFormData({ ...formData, stock: Number(formData.stock) + 1 });
  };

  const handleDecreaseStock = () => {
    if (formData.stock > 0) {
      setFormData({ ...formData, stock: Number(formData.stock) - 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("El nombre del producto es requerido.");
      return;
    }

    if (isNew) {
      console.log("Enviando petición POST a /products/new con:", formData);
      alert("¡Nuevo producto creado con éxito!");
    } else {
      console.log(`Enviando petición PUT a /products/${id}/edit con:`, formData);
      alert("¡Cambios guardados con éxito!");
    }

    navigate('/products');
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás segura de que deseas eliminar este producto?")) {
      console.log(`Enviando petición DELETE a /products/${id}/delete`);
      alert("Producto eliminado.");
      navigate('/products');
    }
  };

  return (
    <div className="product-view-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      
      {/* ENCABEZADO: Productos > ID y Botón Eliminar a la derecha */}
      <div className="product-header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div className="breadcrumb" style={{ color: '#aaa', fontSize: '18px' }}>
          <span onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>Productos</span> 
          {' > '} 
          <span style={{ color: '#fff', fontWeight: 'bold' }}>#{isNew ? 'nuevo' : foundProduct.id}</span>
        </div>

        {!isNew && (
          <button 
            onClick={handleDelete} 
            className="btn-action btn-delete"
            style={{ backgroundColor: '#374151', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            Eliminar
          </button>
        )}
      </div>

      {isNew ? (
        /* MODO CREAR NUEVO PRODUCTO */
        <div className="product-form-card">
          <h2>Agregar Nuevo Producto</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Nombre</label>
              <input 
                type="text" 
                placeholder="InputValue" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
                style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Valor</label>
              <input 
                type="number" 
                placeholder="InputValue" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required 
                style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Stock</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', width: 'fit-content', padding: '4px' }}>
                <button type="button" onClick={handleDecreaseStock} style={{ padding: '6px 12px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>-</button>
                <input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required 
                  style={{ textAlign: 'center', width: '50px', background: 'transparent', border: 'none', color: '#fff' }}
                />
                <button type="button" onClick={handleIncreaseStock} style={{ padding: '6px 12px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Descripción</label>
              <textarea 
                placeholder="InputValue"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff', minHeight: '100px' }}
              />
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Guardar Cambios
              </button>
              <button type="button" onClick={() => navigate('/products')} style={{ padding: '12px 20px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
      
        <div>
        
          <div style={{ display: 'flex', alignItems: 'center', background: '#1e1e24', border: '1px solid #333', padding: '15px 20px', borderRadius: '12px', marginBottom: '25px', gap: '20px' }}>
            <img 
              src={foundProduct.image ? `/images/${foundProduct.image}` : '/images/fallback.png'} 
              alt={foundProduct.name} 
              style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '4px' }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 5px 0' }}>{foundProduct.name}</h2>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1rem' }}>${Number(foundProduct.price)?.toLocaleString('es-AR')}</span>
                <span style={{ color: '#aaa' }}>{foundProduct.stock} STOCK DISPONIBLE</span>
                {foundProduct.store && (
                  <span style={{ background: '#333', color: '#fff', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem' }}>
                    👤 {foundProduct.store}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Formulario de Edición con Inputs */}
          <div className="product-form-card" style={{ background: 'transparent', padding: 0 }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>Información</h3>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Nombre</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required 
                  style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Valor</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required 
                  style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Stock</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', width: 'fit-content', padding: '4px' }}>
                  <button type="button" onClick={handleDecreaseStock} style={{ padding: '6px 12px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <input 
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required 
                    style={{ textAlign: 'center', width: '50px', background: 'transparent', border: 'none', color: '#fff' }}
                  />
                  <button type="button" onClick={handleIncreaseStock} style={{ padding: '6px 12px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Descripción</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff', minHeight: '100px' }}
                />
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ flex: 1, padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Guardar Cambios
                </button>
                <button type="button" onClick={() => navigate('/products')} style={{ padding: '12px 20px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;