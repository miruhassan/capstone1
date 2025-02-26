import React from 'react';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <h1>EZTech Store</h1>
      <div className="navbar-links">
        <a href="#subscriptions">Subscriptions</a>
        <div className="cart-info">Cart: {cartCount} items</div>
      </div>
    </nav>
  );
};

export default Navbar;
