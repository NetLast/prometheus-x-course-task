import React, { createContext, useState } from 'react';

const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  return (
    <BookContext.Provider value={{ books, setBooks, selectedBooks, setSelectedBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookContextProvider };
