import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookContextProvider } from './contexts/BookContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BookContextProvider>
        <App />
      </BookContextProvider>
  </React.StrictMode>
);

reportWebVitals();
