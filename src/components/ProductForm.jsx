// mern-frontend/src/components/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api'; 
import '../ProductStyles.css'; // Import CSS for form styling

// Props:
// - onProductOperationComplete: Tells Home.jsx to re-fetch product list on success
// - editingProduct: The product object passed from Home.jsx if in Edit mode (otherwise null)
// - onCancelEdit: Function to close the modal
const ProductForm = ({ onProductOperationComplete, editingProduct, onCancelEdit }) => {
    
    // Initial state object for a blank form
    const initialFormState = {
        name: '', description: '', price: '', stock: '', category: '', image: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. useEffect to Handle Editing Mode (Pre-filling the form)
    useEffect(() => {
        if (editingProduct) {
            // Set the formData to the product's current values for editing
            setFormData({
                name: editingProduct.name || '',
                description: editingProduct.description || '',
                // Convert numbers to strings for input fields
                price: String(editingProduct.price || ''), 
                stock: String(editingProduct.stock || ''),
                category: editingProduct.category || '',
                image: editingProduct.image || '',
            });
        } else {
            // When not editing (Create mode), reset the form to blank state
            setFormData(initialFormState);
        }
        setError(null);
    }, [editingProduct]); // Dependency array: runs when 'editingProduct' prop changes

    // Handler for input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null); 
    };

    // 2. Updated handleSubmit for Create OR Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Prepare the data, ensuring price and stock are numbers for the backend
        const submissionData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        };

        try {
            let resultProduct;
            
            if (editingProduct) {
                // UPDATE LOGIC (PUT request)
                resultProduct = await productAPI.updateProduct(editingProduct._id, submissionData);
                alert(`Product '${resultProduct.name}' updated successfully!`);
            } else {
                // CREATE LOGIC (POST request)
                resultProduct = await productAPI.createProduct(submissionData);
                alert(`Product '${resultProduct.name}' added successfully!`);
            }
            
            // Success Action 1: Notify the parent component (Home.jsx) to refresh the list
            if (onProductOperationComplete) {
                onProductOperationComplete(); 
            }
            
            // Success Action 2: Close the modal/form
            // This is called AFTER the list refresh is triggered to prevent flickering
            if (onCancelEdit) { 
                 onCancelEdit();
            }

        } catch (err) {
            // Handle and display error message from the server
            setError(err.message || 'An unexpected error occurred during submission.');
            console.error("Submission error:", err);

        } finally {
            setLoading(false);
        }
    };

    // Determine the title and button text based on mode
    const formTitle = editingProduct ? 'Edit Product' : 'Add New Product';
    const submitButtonText = editingProduct ? 'Save Changes' : 'Add Product';

    return (
        <div className="product-form-container">
            <h3>{formTitle}</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
                
                <button type="submit" disabled={loading}>
                    {loading ? (editingProduct ? 'Updating...' : 'Adding...') : submitButtonText}
                </button>
                
                {/* Cancel Button inside the form container, visible only in Edit mode, or always if modal is open */}
                {editingProduct && (
                    <button type="button" onClick={onCancelEdit} style={{ backgroundColor: '#ccc', color: '#333' }}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductForm;