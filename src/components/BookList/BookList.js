import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';
import defaultImage from '../../images/default-book-image.jpg';
import { FaSearch } from 'react-icons/fa';
import { BookContext } from '../../contexts/BookContext';
import {TbDeviceImacSearch} from "react-icons/tb";

const BookList = () => {
  const { books, setBooks } = useContext(BookContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    fetch('/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.books) {
          setBooks(data.books);
        } else {
          throw new Error('Data format is incorrect');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [setBooks]);

  if (!books) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
      (filterPrice === '' || book.price <= parseFloat(filterPrice))
    );
  });

  return (
    <section className="container-books">
      <div id="filters">
        <div className="filter-group-name">
          <input id="filters-input"
                 type="text"
                 placeholder="Фільтр за назвою"
                 value={filterTitle}
                 onChange={(e) => setFilterTitle(e.target.value)}
          />
          <div id="fa"><FaSearch></FaSearch></div>
        </div>
        <div className="filter-group-price">
          <input id="filters-input"
                 type="number"
                 placeholder="Фільтр за ціною"
                 value={filterPrice}
                 onChange={(e) => setFilterPrice(e.target.value)}
          />
          <div id="fa"><TbDeviceImacSearch></TbDeviceImacSearch></div>
        </div>
      </div>
      <div className="book-list">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-item">
            <img src={book.image || defaultImage} alt={book.title} className="book-image" />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>Автор: {book.author}</p>
            </div>
            <div className="price-and-button">
              <p id="book-price-list">{book.price} грн</p>
              <Link to={`/books/${book.id}`}>
                <button className="button-show">Переглянути</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookList;
