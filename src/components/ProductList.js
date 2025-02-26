import React from 'react';
import { products } from '../Data';

const ProductList = ({ addToCart }) => {
  return (
    <div className="product-list" id="subscriptions">
      <h2>Products</h2>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
