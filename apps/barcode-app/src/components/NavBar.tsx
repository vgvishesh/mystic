import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Barcode Scanner</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/scan" className="nav-link">Scan</Link>
          <Link to="/results" className="nav-link">Results</Link>
          <a href="/" className="nav-link external">Mystic Wisdom</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
