import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay para cerrar en responsive */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar} 
          aria-label="Cerrar menú"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        
        {/* LOGO */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🛒</span>
            <span className="logo-text">MiEcommerce</span>
          </div>
        </div>

        {/* NAVEGACIÓN CON LAS RUTAS QUE SÍ EXISTEN EN TU PROYECTO */}
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

        {/* ENLACE DE PERFIL */}
        <Link 
          to="/profile" 
          className="sidebar-user"
          onClick={() => isOpen && toggleSidebar()}
        >
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <span className="user-name">Administrador</span>
            <span className="user-role">Ver perfil</span>
          </div>
        </Link>

      </aside>
    </>
  );
};

export default Sidebar;