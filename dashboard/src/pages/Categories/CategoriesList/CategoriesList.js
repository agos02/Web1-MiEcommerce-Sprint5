import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesList.css';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback temporal si la API no responde
        setCategories([
          { id: 1, name: 'Bebidas' },
          { id: 2, name: 'Alimentos' },
          { id: 3, name: 'Electrónica' }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ color: '#fff', padding: '20px' }}>Cargando categorías...</h2>;

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Categorías</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.name.toLowerCase()}`}
            style={{
              background: '#26262b',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #444',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#fff'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🏷️</span>
            <span style={{ fontWeight: 'bold' }}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
