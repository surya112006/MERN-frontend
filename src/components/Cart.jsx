// mern-frontend/src/components/Cart.jsx - FINAL CODE (Currency Fix)

import React from 'react';
import '../ProductStyles.css'; 

const Cart = ({ cartItems, onRemoveFromCart }) => {
    // Calculate total price
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    // Total items is just the number of unique items
    const totalUniqueItems = cartItems.length; 

    return (
        <div className="home-container">
            <h1>Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Go add some products!</p>
            ) : (
                <div className="cart-content">
                    <div className="cart-list">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                {/* Product Image */}
                                <div className="cart-item-image-container">
                                    <img 
                                        src={item.image || 'https://via.placeholder.com/100x70?text=No+Image'} 
                                        alt={item.name} 
                                        className="cart-item-image" 
                                    />
                                </div>
                                
                                {/* Item Details */}
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    {/* CURRENCY FIX APPLIED HERE: $ -> Rs */}
                                    <p>Rs {parseFloat(item.price).toFixed(2)} each</p> 
                                </div>

                                {/* Simple Remove Button */}
                                <div className="cart-item-remove">
                                    <button 
                                        onClick={() => onRemoveFromCart(item._id)} 
                                        className="action-btn delete-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                {/* Subtotal */}
                                <div className="cart-item-subtotal">
                                    {/* CURRENCY FIX APPLIED HERE: $ -> Rs */}
                                    <strong>Rs {(item.price * 1).toFixed(2)}</strong>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <p>Total Items: {totalUniqueItems}</p>
                        {/* CURRENCY FIX APPLIED HERE: $ -> Rs */}
                        <h3>Cart Total: Rs {total.toFixed(2)}</h3>
                        <button className="checkout-btn" onClick={() => alert("Checkout not yet implemented!")}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;