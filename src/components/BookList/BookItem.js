import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default-book-image.jpg';
import './BookItem.css';

const BookItem = ({ book }) => {
  // Fallback values for missing book properties
  const bookImage = book?.image || defaultImage;
  const bookTitle = book?.title || 'No title';
  const bookAuthor = book?.author || 'No author';
  const bookPrice = book?.price ? `${book.price} грн` : 'Price not available';

  return (
    <div className="book-item">
      <img src={bookImage} alt={bookTitle} className="book-image" />
      <div className="book-details">
        <h3>{bookTitle}</h3>
        <p>Автор: {bookAuthor}</p>
      </div>
      <div className="price-and-button">
        <p id="book-price-list">{bookPrice}</p>
        <Link to={`/books/${book?.id}`}>
          <button className="button-show">Переглянути</button>
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
