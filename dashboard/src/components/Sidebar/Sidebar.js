import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-logo">🛒</span>
          <h2>MiEcommerce</h2>
        </div>

        <nav className="sidebar-menu">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            onClick={() => isOpen && toggleSidebar()}
          >
            <span className="icon">🏠</span> Inicio
          </NavLink>

          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            onClick={() => isOpen && toggleSidebar()}
          >
            <span className="icon">📦</span> Productos
          </NavLink>

          <NavLink 
            to="/categories" 
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
            onClick={() => isOpen && toggleSidebar()}
          >
            <span className="icon">🗃️</span> Categorías
          </NavLink>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <p className="user-name">Agostina</p>
            <p className="user-role">Administrador</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;