import React, { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TbDeviceImacSearch } from 'react-icons/tb';
import './BookList.css';
import { BookContext } from '../../contexts/BookContext';
import BookItem from './BookItem';

const BookList = () => {
  const { books, setBooks } = useContext(BookContext);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterPrice, setFilterPrice] = useState('all');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/books.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.books) {
          setBooks(data.books);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [setBooks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredBooks = books.filter(book => {
    const matchesTitle = book.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesPrice = (() => {
      if (filterPrice === 'all') return true;
      if (filterPrice === '0-15') return book.price > 0 && book.price < 15;
      if (filterPrice === '15-30') return book.price >= 15 && book.price < 30;
      if (filterPrice === '30+') return book.price >= 30;
      return false;
    })();

    return matchesTitle && matchesPrice;
  });

  return (
    <section className="container-books">
      <div id="filters">
        <div className="filter-group-name">
          <input
            id="filters-input"
            type="text"
            placeholder="Фільтр за назвою"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
          <div id="fa"><FaSearch /></div>
        </div>
        <div className="filter-group-price">
          <select
            id="filters-input"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          >
            <option value="all">Всі</option>
            <option value="0-15">0 &lt; ціна &lt; 15</option>
            <option value="15-30">15 &lt; ціна &lt; 30</option>
            <option value="30+">ціна &gt; 30</option>
          </select>
          <div id="fa"><TbDeviceImacSearch /></div>
        </div>
      </div>
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookItem key={book.id} book={book} />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </section>
  );
};

export default BookList;
