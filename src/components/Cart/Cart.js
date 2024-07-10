import React, { useState } from 'react';
import cartIcon from '../../images/cart.svg';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  const handlePurchase = () => {
    alert('Покупка здійснена!');
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container-cart">
      {cartItems.length === 0 ? (
          <div className="cart-empty">
            <img src={cartIcon} alt="Cart" className="cart-icon-empty"/>
            <p>Ваш кошик порожній</p>
          </div>
      ) : (
          <div>
            <div className="buy">
              <button id="buy" disabled={cartItems.length === 0} onClick={handlePurchase}>
                Купити
              </button>
            </div>
            <table className="cart-table">
              <tbody>
              {cartItems.map((item, index) => (
                  <tr key={index} className="cart-item">
                    <td>{item.title}</td>
                    <td>{item.price} грн</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity} грн</td>
                  </tr>
              ))}
              </tbody>
            </table>
            <div className="total-price">
              <p><b>Загальна вартість:</b> {totalCost} грн</p>
            </div>
          </div>
      )}
    </div>
  );
};

export default Cart;
