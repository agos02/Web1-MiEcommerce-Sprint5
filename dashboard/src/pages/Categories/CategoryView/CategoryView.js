import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryView.css';

const CategoryView = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products?category=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <h2 style={{ color: '#fff', padding: '20px' }}>Cargando productos...</h2>;
  }

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Categoría: {name}</h1>

      {products.length === 0 ? (
        <p>No hay productos disponibles en esta categoría.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: '#26262b',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #444',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <img
                src={p.image ? `/images/${p.image}` : '/images/fallback.png'}
                alt={p.name}
                style={{ width: '100%', height: '150px', objectFit: 'contain', background: '#fff', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '1rem', color: '#fff', margin: '0' }}>{p.name}</h3>
              <p style={{ color: '#4ade80', fontWeight: 'bold', margin: '0' }}>${p.price}</p>
              <Link
                to={`/products/${p.id}`}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryView;
