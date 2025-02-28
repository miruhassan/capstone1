import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>

              {/* Display shirt size if available */}
              {item.shirtSize && (
                <p>Size: {item.shirtSize}</p>
              )}

              {/* Display phone model if available */}
              {item.phoneModel && (
                <p>Phone Model: {item.phoneModel}</p>
              )}

              {/* Display quantity controls only if it's not a subscription */}
              {item.category !== 'subscription' && (
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.shirtSize, item.phoneModel, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.shirtSize, item.phoneModel, item.quantity + 1)}>+</button>
                </div>
              )}

              <button onClick={() => removeFromCart(item.id, item.shirtSize, item.phoneModel)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
