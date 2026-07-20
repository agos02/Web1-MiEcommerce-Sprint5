import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes
import Sidebar from './components/Sidebar/Sidebar';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import Home from './pages/Home/Home';

// Stubs temporales
const CategoriesList = () => <h2>Categorías</h2>;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="main-area">
          <button className="menu-toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/new" element={<ProductView />} />
              <Route path="/products/:id" element={<ProductView />} />
              <Route path="/categories" element={<CategoriesList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;