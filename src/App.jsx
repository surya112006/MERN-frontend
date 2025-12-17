// mern-frontend/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import Cart from './components/Cart'; 

// Placeholder for the Contact page
const Contact = () => (
    <div className="home-container" style={{ marginTop: '50px' }}>
        <h2>Contact Page</h2>
        <p>You can add your contact form or information here.</p>
    </div>
); 

const App = () => {
    // STATE: Array to hold unique cart items
    const [cart, setCart] = useState([]); 

    // Handler: Adds a unique item to the cart (quantity fixed at 1)
    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const exists = prevCart.find(item => item._id === product._id);
            
            if (!exists) {
                // Add the new item with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
            // If it exists, do nothing (no quantity change)
            return prevCart;
        });
        alert(`${product.name} added to cart!`);
    };

    // Handler: Removes an item completely from the cart
    const handleRemoveFromCart = (productId) => {
        setCart(prevCart => {
            // Filter out the item with the matching productId
            return prevCart.filter(item => item._id !== productId);
        });
    };

    return (
        <Router>
            {/* Nav no longer needs cartItemCount */}
            <Nav /> 
            <Routes>
                {/* Home needs the handler function to add to cart */}
                <Route path="/" element={<Home onAddToCart={handleAddToCart} />} /> 
                
                {/* Cart page needs the cart data and the remove handler */}
                <Route 
                    path="/cart" 
                    element={
                        <Cart 
                            cartItems={cart} 
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    } 
                />
                
                <Route path="/contect" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;