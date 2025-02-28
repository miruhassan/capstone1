import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart with size and phone model if applicable
  const addToCart = (product, selectedSize, selectedModel) => {
    let updatedProduct = { ...product };

    // Add shirt size if product is a T-shirt and size is selected
    if (product.name === 'EZTech T-Shirt' && selectedSize) {
      updatedProduct = { ...updatedProduct, shirtSize: selectedSize };
    }

    // Add phone model if product is a phone case and model is selected
    if (product.name === 'EZTech Phone Case' && selectedModel) {
      updatedProduct = { ...updatedProduct, phoneModel: selectedModel };
    }

    // Ensure only one subscription can be added
    if (product.category === 'subscription') {
      const subscriptionExists = cartItems.some((item) => item.category === 'subscription');
      if (subscriptionExists) {
        alert('Only one subscription can be added at a time.');
        return;
      }
    }

    // Check if the item already exists in the cart with the same size and phone model
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.shirtSize === updatedProduct.shirtSize &&
        item.phoneModel === updatedProduct.phoneModel
    );

    // Update quantity if item exists, else add the new item to the cart
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id &&
          item.shirtSize === updatedProduct.shirtSize &&
          item.phoneModel === updatedProduct.phoneModel
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...updatedProduct, quantity: 1 }]);
    }
  };

  // Remove item from the cart
  const removeFromCart = (id, shirtSize, phoneModel) => {
    setCartItems(cartItems.filter((item) => !(item.id === id && item.shirtSize === shirtSize && item.phoneModel === phoneModel)));
  };

  // Update quantity of item in the cart (ignore subscription items)
  const updateQuantity = (id, shirtSize, phoneModel, quantity) => {
    // Prevent quantity update for subscription items
    const item = cartItems.find(item => item.id === id && item.shirtSize === shirtSize && item.phoneModel === phoneModel);
    if (item && item.category === 'subscription') {
      return; // Do nothing if it's a subscription
    }

    if (quantity < 1) return; // Ensure quantity can't be less than 1
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.shirtSize === shirtSize && item.phoneModel === phoneModel
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate total cart count (sum of item quantities)
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
