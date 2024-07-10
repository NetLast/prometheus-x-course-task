import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BookContextProvider } from './contexts/BookContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BookList from './components/BookList/BookList';
import BookDetail from './components/BookDetail/BookDetail';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import './App.css';

const PrivateRoute = ({ children }) => {
  const username = localStorage.getItem('username');
  return username ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <BookContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
            <Route path="/books/:id" element={<PrivateRoute><BookDetail /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BookContextProvider>
      </div>
    </Router>
  );
}

export default App;
