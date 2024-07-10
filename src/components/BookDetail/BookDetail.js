import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetail.css';
import defaultImage from '../../images/default-book-image.jpg';
import { BookContext } from '../../contexts/BookContext';

const BookDetail = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [ setCartStatus] = useState('');

  useEffect(() => {
    const foundBook = books.find(b => b.id === parseInt(id, 10));
    if (foundBook) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const cartItem = cartItems.find(item => item.id === foundBook.id);
      setCartQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [books, id]);

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      value = 1;
    }
    if (value < 1) {
      value = 1;
    } else if (value > 42) {
      value = 42;
    }
    setQuantity(value);
  };

  const addToCart = () => {
    const foundBook = books.find(b => b.id === parseInt(id, 10));
    if (!foundBook) {
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === foundBook.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...foundBook, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartQuantity(prevQuantity => prevQuantity + quantity);
    alert('Книга додана до кошика');
  };

  const book = books.find(b => b.id === parseInt(id, 10));
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-book-one">
      <div className="book-info">
        <div className="book-details-one">
          <img src={book.image || defaultImage} alt="Book cover" className="book-image-details"/>
          <p className="book-annotation">{book.shortDescription}</p>
        </div>
        <div className="book-inform">
          <h1>{book.title}</h1>
          <p className="book-author">Автор: {book.author}</p>
          <p className="book-level"> Рівень: {book.level}</p>
          <div className="book-tags">
            <p>Теги: {book.tags.join(', ')}</p>
          </div>
        </div>
        <div className="book-price">
          <div className="book-price-content">
            <div className="price-and-quantity">
              <p>Ціна: {book.price} грн</p>
              <div className="quantity-control">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
            </div>
            <p>Загальна вартість: {book.price * quantity} грн</p>
            <button className="add-to-cart" onClick={addToCart}>Додати</button>
            <p>Кількість у кошику: {cartQuantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;