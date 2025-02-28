import React, { useState } from 'react';
import { products } from '../Data';

const ProductList = ({ addToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (productId, key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [key]: value },
    }));
  };

  return (
    <div className="product-list" id="subscriptions">
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>

            {/* Shirt Size Selection */}
            {product.category === 'shirt' && (
              <div>
                <p>Select Size:</p>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                  <label key={`${product.id}-${size}`} style={{ marginRight: '10px' }}>
                    <input
                      type="radio"
                      name={`size-${product.id}`} // Unique per product
                      value={size}
                      checked={selectedOptions[product.id]?.size === size}
                      onChange={(e) => handleOptionChange(product.id, 'size', e.target.value)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            )}

            {/* Phone Model Selection */}
            {product.name === 'EZTech Phone Case' && (
              <div>
                <p>Select Phone Model:</p>
                {['iPhone 14', 'iPhone 15', 'iPhone 16', 'Samsung S22', 'Samsung S23', 'Samsung S24'].map((model) => (
                  <label key={`${product.id}-${model}`} style={{ marginRight: '10px' }}>
                    <input
                      type="radio"
                      name={`model-${product.id}`} // Unique per product
                      value={model}
                      checked={selectedOptions[product.id]?.model === model}
                      onChange={(e) => handleOptionChange(product.id, 'model', e.target.value)}
                    />
                    {model}
                  </label>
                ))}
              </div>
            )}

            <button onClick={() => addToCart(product, selectedOptions[product.id]?.size, selectedOptions[product.id]?.model)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
