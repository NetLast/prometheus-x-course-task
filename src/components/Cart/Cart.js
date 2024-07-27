import React, { useState, useEffect } from 'react';
import cartIcon from '../../images/cart.svg';
import './Cart.css';

const Cart = () => {
  const getCartItems = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    console.log('Stored cart items:', storedCartItems); // Для налагодження
    if (storedCartItems) {
      try {
        return JSON.parse(storedCartItems);
      } catch (error) {
        console.error('Failed to parse cart items from localStorage:', error);
        return [];
      }
    }
    return [];
  };

  const [cartItems, setCartItems] = useState(getCartItems());
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Cart items state:', cartItems); // Для налагодження
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items to localStorage:', error);
    }
  }, [cartItems]);

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const adjustQuantity = (id, delta) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 42) {
      setError('Кількість книг не може перевищувати 42.');
      return;
    } else {
      setError('');
    }

    const newQuantity = Math.max(1, quantity);
    const updatedCartItems = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handlePurchase = () => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    if (totalQuantity > 42) {
      alert('Покупка неможлива: кількість книг у кошику перевищує 42.');
      return;
    }

    alert('Покупка здійснена!');
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(1);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

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
            <button
              id="buy"
              disabled={cartItems.length === 0 || totalQuantity > 42}
              onClick={handlePurchase}>
              Купити
            </button>
          </div>
          <table className="cart-table">
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td>{item.title}</td>
                  <td>{item.price.toFixed(1)} грн</td>
                  <td id="inform-cart">
                    <div className="quantity-control-cart">
                      <button className="cost-price"
                        id={`quantity-adjust-${item.id}-minus`}
                        onClick={() => adjustQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input className="total-price-input"
                        id={`quantity-input-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      />
                      <button className="cost-price"
                        id={`quantity-adjust-${item.id}-plus`}
                        onClick={() => adjustQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toFixed(1)} грн</td>
                  <td>
                    <button
                      className="remove-from-cart"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price-error">
            {error && <div id="error-message">{error}</div>}
            <div className="total-price">
              <p><b>Загальна вартість:</b> {totalCost} грн</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
