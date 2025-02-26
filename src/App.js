import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // For subscriptions, allow only one to be added
    if (product.category === 'subscription') {
      const subscriptionExists = cartItems.some(
        (item) => item.category === 'subscription'
      );
      if (subscriptionExists) {
        alert('Only one subscription can be added at a time.');
        return;
      }
    }
    // For accessories, update quantity if already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem && product.category === 'accessory') {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="App">
      <Navbar cartCount={cartCount} />
      <div className="container">
        <ProductList addToCart={addToCart} />
        <Cart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          updateQuantity={updateQuantity} 
        />
      </div>
    </div>
  );
}

export default App;
