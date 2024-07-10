import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookDetail from './BookDetail';

// Mocking useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

// Mocking localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('BookDetail component', () => {
  it('increments quantity correctly', () => {
    const { getByText, getByRole } = render(<BookDetail />);

    // Simulate incrementing quantity
    fireEvent.change(getByRole('spinbutton'), { target: { value: '2' } });

    // Check if quantity updated correctly
    expect(getByRole('spinbutton').value).toBe('2');
  });

  it('decrements quantity correctly', () => {
    const { getByText, getByRole } = render(<BookDetail />);

    // Set initial quantity to 3
    fireEvent.change(getByRole('spinbutton'), { target: { value: '3' } });

    // Simulate decrementing quantity
    fireEvent.change(getByRole('spinbutton'), { target: { value: '2' } });

    // Check if quantity updated correctly
    expect(getByRole('spinbutton').value).toBe('2');
  });

  it('updates total cost correctly on quantity change', async () => {
    const { getByText, getByRole } = render(<BookDetail />);

    // Set initial quantity to 4
    fireEvent.change(getByRole('spinbutton'), { target: { value: '4' } });

    // Check initial total cost
    expect(getByText('Загальна вартість: 400 грн')).toBeInTheDocument();

    // Simulate changing quantity to 3
    fireEvent.change(getByRole('spinbutton'), { target: { value: '3' } });

    // Check updated total cost
    expect(getByText('Загальна вартість: 300 грн')).toBeInTheDocument();
  });

});
