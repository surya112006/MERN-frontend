import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import { productAPI } from './services/api';
import { SPORTS_PRODUCTS } from './productsData';
import './ProductStyles.css';

const Product = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAllProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(SPORTS_PRODUCTS);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      // fallback to demo sports products when backend is unavailable
      setProducts(SPORTS_PRODUCTS);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductOperationComplete = () => {
    fetchProducts();
    handleCloseModal();
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete product: ${name}?`)) return;
    try {
      await productAPI.deleteProduct(id);
      alert(`Product '${name}' deleted successfully.`);
      handleProductOperationComplete();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert(`Failed to delete product: ${error.message || 'Server error'}`);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-left">
          <h1 className="hero-title">SPORTS WORLD</h1>
          <p className="hero-subtitle">Gear for champions — quality sports equipment & apparel.</p>
          <div className="hero-ctas">
            <button className="shop-now-btn" onClick={() => {
              const el = document.querySelector('#product-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Shop Now</button>
            <button onClick={handleOpenModal} className="add-product-btn hero-add" disabled={isModalOpen}>+ Add Product</button>
          </div>
        </div>
        <div className="hero-right" aria-hidden="true"></div>
      </div>

      {(isModalOpen || editingProduct) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            <ProductForm
              onProductOperationComplete={handleProductOperationComplete}
              editingProduct={editingProduct}
              onCancelEdit={handleCloseModal}
            />
          </div>
        </div>
      )}

      <h2>Available Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && products.length === 0 && <p>No products found. Add one above!</p>}

      <div id="product-grid" className="product-list-grid">
        {products.map((product) => (
          <div key={product._id || product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <span className="product-category">{product.category || 'Sports'}</span>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
            <div className="product-footer">
              <span className="product-price">Rs {parseFloat(product.price || 0).toFixed(2)}</span>
              <span className="product-stock">Stock: {product.stock ?? 'N/A'}</span>
            </div>
            <div className="product-actions">
              {product._id ? (
                <>
                  <button onClick={() => handleEditClick(product)} className="action-btn edit-btn">Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id, product.name)} className="action-btn delete-btn">Delete</button>
                </>
              ) : (
                <span className="demo-badge">Demo</span>
              )}
              <button onClick={() => onAddToCart(product)} className="action-btn cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
