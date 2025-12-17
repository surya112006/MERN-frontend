// mern-frontend/src/Nav.jsx

import React from 'react';
import { Link } from 'react-router-dom'; 
import './ProductStyles.css'; // CRITICAL: Ensure this import is present

function Nav() { ``
  return (
    <nav className="nav-bar"> 
      <div className="nav-container">
        
        {/* 1. Brand Name / Logo */}
        <Link to="/" className="brand-name">
          SPORTS  WORLD
        </Link>
        
        {/* 2. Navigation Links */}
        <div className="nav-links-right">
          <Link to="/" className="nav-link">
            Home
          </Link>
          
          <Link to="/cart" className="nav-link cart-link">
            Cart 
          </Link>
          
          <Link to="/contect" className="nav-link">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;