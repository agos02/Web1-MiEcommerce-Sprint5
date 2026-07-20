import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* HEADER / LOGO */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">MiEcommerce</span>
        </div>
      </div>

      {/* NAVEGACIÓN PRINCIPAL */}
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          onClick={() => isOpen && toggleSidebar()}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Inicio</span>
        </NavLink>

        <NavLink 
          to="/products" 
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          onClick={() => isOpen && toggleSidebar()}
        >
          <span className="nav-icon">📦</span>
          <span className="nav-text">Productos</span>
        </NavLink>

        <NavLink 
          to="/categories" 
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          onClick={() => isOpen && toggleSidebar()}
        >
          <span className="nav-icon">🏷️</span>
          <span className="nav-text">Categorías</span>
        </NavLink>
      </nav>

      {/* USUARIO AL PIE */}
      <div className="sidebar-user">
        <div className="user-avatar">👤</div>
        <div className="user-info">
          <span className="user-name">Agostina</span>
          <span className="user-role">Administrador</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;