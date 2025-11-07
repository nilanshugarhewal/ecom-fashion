import React, { useState, useEffect } from "react";

import Header from "./pages/Home/Header";
import Footer from "./pages/Home/Footer";
import HomePage from "./pages/Home/Home";
import CartPage from "./pages/Cart/Cart";
import CheckoutPage from "./pages/Form/CheckoutPage";
import ConfirmationPage from "./pages/Form/ConfirmationPage";

// Define the base URL of your new backend
const API_URL = 'http://localhost:5000/api';


// --- SECTION 7: CORE APP & STATE MANAGEMENT ---
export default function App() {
  const [page, setPage] = useState('home'); // 'home', 'cart', 'checkout', 'confirmation'
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [error, setError] = useState(null); // <-- ADDED: For error handling

  // --- Data Fetching Functions ---

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) { // <-- ADDED: Check for bad responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null); // <-- ADDED: Clear error on success
    } catch (err) {
      console.error("Error fetching products:", err);
      // <-- MODIFIED: Set a user-friendly error message
      setError('Failed to fetch products. Is your backend server running on http://localhost:5000?');
    }
  };

  // Fetch the current cart
  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      if (!response.ok) { // <-- ADDED: Check for bad responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCart(data);
      setError(null); // <-- ADDED: Clear error on success
    } catch (err) {
      console.error("Error fetching cart:", err);
      // <-- MODIFIED: Set a user-friendly error message
      setError('Failed to fetch cart data. Is your backend server running on http://localhost:5000?');
    }
  };

  // --- Load data on component mount ---
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); // Empty array means this runs once on mount

  // --- API-driven Cart Logic ---

  const handleAddToCart = async (productToAdd) => {
    // Find item in the *frontend* state
    const existingItem = cart.items.find(item => item.productId._id === productToAdd._id);
    
    let newQuantity;
    if (existingItem) {
      newQuantity = existingItem.quantity + 1;
    } else {
      newQuantity = 1;
    }
    
    // Call the update function (which calls the API)
    await handleUpdateQuantity(productToAdd._id, newQuantity);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Find the cart item ID to remove
      const itemToRemove = cart.items.find(item => item.productId._id === productId);
      if(itemToRemove) {
        await handleRemoveFromCart(itemToRemove._id);
      }
      return;
    }

    // Call POST /api/cart to create or update
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: productId, quantity: newQuantity }),
      });
      // Refresh cart from server
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      // Call DELETE /api/cart/:id
      await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      // Refresh cart from server
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };
  
  const handleCheckout = async ({ total }) => {
    try {
      // Call POST /api/checkout
      await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: total }), // Send total for receipt
      });
      
      // Refresh cart (will be empty)
      await fetchCart();
      // Go to confirmation page
      setPage('confirmation');
    } catch (err) {
      console.error("Error checking out:", err);
      // <-- ADDED: Set error on checkout fail
      setError('Failed to process checkout. Please try again.');
    }
  };

  // Calculate total cart count for the header badge
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  // --- Render Logic ---
  return (
    <div className='font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col'>
      <Header 
        navigateTo={setPage} 
        cartCount={cartCount} 
      />
      
      <main className="grow">
        {/* --- ADDED: Error Display --- */}
        {error && (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
            <p className="text-gray-700 mt-4">{error}</p>
            <p className="text-gray-500 mt-2">Please make sure your `server.js` is running in a separate terminal and try refreshing.</p>
          </div>
        )}
        
        {/* --- MODIFIED: Only render pages if there is no error --- */}
        {!error && page === 'home' && (
          <HomePage 
            products={products} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {!error && page === 'cart' && (
          <CartPage 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            navigateTo={setPage}
          />
        )}
        
        {!error && page === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            onCheckout={handleCheckout}
            navigateTo={setPage}
          />
        )}
        
        {!error && page === 'confirmation' && (
          <ConfirmationPage navigateTo={setPage} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
