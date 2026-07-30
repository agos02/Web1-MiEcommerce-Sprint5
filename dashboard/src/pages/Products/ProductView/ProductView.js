import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === 'new' || !id;
  const API_URL = 'http://localhost:3000/api/products';

  const [foundProduct, setFoundProduct] = useState(null);
  const [loading, setLoading] = useState(!isNew);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    image: '',
    store: 'Havanna SL'
  });

  // Carga de producto desde la API
  useEffect(() => {
    if (isNew) return;

    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        setFoundProduct(data);
        setFormData({
          name: data.name || '',
          price: data.price || 0,
          stock: data.stock || 0,
          description: data.description || '',
          image: data.image || '',
          category: data.category || 'Alimentos', // Captura la categoría
          store: data.category || 'Havanna SL'
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      });
  }, [id, isNew]);

  // Manejadores de Stock (+ y -)
  const handleIncreaseStock = () => {
    setFormData((prev) => ({ ...prev, stock: Number(prev.stock) + 1 }));
  };

  const handleDecreaseStock = () => {
    setFormData((prev) => ({
      ...prev,
      stock: prev.stock > 0 ? Number(prev.stock) - 1 : 0
    }));
  };

  // Botón Cancelar: Restablece datos originales si edita, o navega atrás si es nuevo
  const handleCancel = () => {
    if (isNew) {
      navigate('/products');
    } else if (foundProduct) {
      setFormData({
        name: foundProduct.name || '',
        price: foundProduct.price || 0,
        stock: foundProduct.stock || 0,
        description: foundProduct.description || '',
        image: foundProduct.image || '',
        store: foundProduct.store || 'Havanna SL'
      });
    }
  };

  // Guardar Cambios (PUT o POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("El nombre del producto es requerido.");
      return;
    }

    // Armamos el payload con los nombres EXACTOS de columnas que espera SQLite/better-sqlite3
    const payload = {
      name: formData.name,
      description: formData.description || '',
      price: parseInt(formData.price, 10) || 0,
      image: formData.image || '',
      category: formData.category || formData.store || 'Alimentos', // <-- Campo clave que faltaba
      stock: parseInt(formData.stock, 10) || 0
    };

    try {
      const url = isNew ? API_URL : `${API_URL}/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(isNew ? "¡Producto creado con éxito!" : "¡Cambios guardados con éxito!");
        navigate('/products');
      } else {
        alert("Ocurrió un error al procesar la solicitud en el servidor.");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión con la API.");
    }
  };
  // Eliminar Producto (DELETE)
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          alert("Producto eliminado correctamente.");
          navigate('/products');
        } else {
          alert("No se pudo eliminar el producto.");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error de conexión con la API.");
      }
    }
  };

  if (loading) {
    return (
      <div className="product-view-container">
        <h2 style={{ color: "#fff" }}>Cargando producto...</h2>
      </div>
    );
  }

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

  return (
    <div className="product-view-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      
      {/* ENCABEZADO: Productos > #XXXX y Botón Eliminar */}
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
            style={{ backgroundColor: '#e11d48', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Eliminar
          </button>
        )}
      </div>

      {/* TARJETA SUPERIOR RESUMEN DEL PRODUCTO (Solo en edición) */}
      {!isNew && (
        <div style={{ display: 'flex', alignItems: 'center', background: '#1e1e24', border: '1px solid #333', padding: '15px 20px', borderRadius: '12px', marginBottom: '25px', gap: '20px' }}>
          <img 
            src={formData.image ? (formData.image.startsWith('http') ? formData.image : `/images/${formData.image}`) : '/images/fallback.png'} 
            alt={formData.name} 
            style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#fff', borderRadius: '8px', padding: '4px' }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 5px 0' }}>{formData.name || 'Sin nombre'}</h2>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1rem' }}>${Number(formData.price)?.toLocaleString('es-AR')}</span>
              <span style={{ color: '#aaa' }}>{formData.stock} STOCK DISPONIBLE</span>
              {formData.store && (
                <button 
                  onClick={() => navigate('/categories')} 
                  style={{ background: '#333', color: '#fff', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
                >
                  👤 {formData.store}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FORMULARIO DE INFORMACIÓN Y EDICIÓN */}
      <div className="product-form-card" style={{ background: '#1e1e24', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>Información</h3>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Nombre *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
              style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Valor (Precio)</label>
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
                style={{ textAlign: 'center', width: '60px', background: 'transparent', border: 'none', color: '#fff' }}
              />
              <button type="button" onClick={handleIncreaseStock} style={{ padding: '6px 12px', background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Descripción</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff', minHeight: '100px' }}
            />
          </div>

          {/* GALERÍA / IMAGEN (Requerido en la US#9) */}
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#aaa', marginBottom: '5px' }}>Galería de Imágenes (URL de la Imagen)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="https://ejemplo.com/imagen.jpg" 
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={{ flex: 1, padding: '10px', background: '#26262b', border: '1px solid #444', borderRadius: '8px', color: '#fff' }}
              />
              {formData.image && (
                <button 
                  type="button" 
                  onClick={() => setFormData({ ...formData, image: '' })}
                  style={{ padding: '10px 15px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Quitar Imagen
                </button>
              )}
            </div>
          </div>

          {/* ACCIONES DEL FORMULARIO */}
          <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{ flex: 1, padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Guardar
            </button>
            <button type="button" onClick={handleCancel} style={{ padding: '12px 20px', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductView;