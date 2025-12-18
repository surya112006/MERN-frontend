// mern-frontend/src/Home.jsx - FINAL CODE (Currency Fix)

import React from 'react';
import { Link } from 'react-router-dom';
import './ProductStyles.css';

const Home = () => {
  return (
    <div>
      <section className="home-hero">
        <div className="hero-inner">
          <h1 className="hero-title">Welcome to the Sport World</h1>
          <p className="hero-subtitle">Quality products for your everyday needs</p>
          <div className="hero-ctas">
            <Link to="/product" className="hero-shop-btn">Show Now</Link>
          </div>
        </div>
      </section>

      <div className="home-container" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Featured Categories</h2>
        <p style={{ color: '#555' }}>Browse products via the Product page. Professional, simple, and fast.</p>
      </div>
    </div>
  );
};

export default Home;