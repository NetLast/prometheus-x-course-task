import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import './SignIn.css';

const SignIn = () => {
  // Define state variables and setter functions
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize navigate function
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const userId = trimmedUsername;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    // Clear previous error messages
    setErrorMessage('');

    // Validate username
    if (trimmedUsername.length < 4) {
      setErrorMessage('Ім\'я користувача занадто коротке. Воно повинно містити не менше 4 символів.');
      return;
    } else if (trimmedUsername.length > 16) {
      setErrorMessage('Ім\'я користувача занадто довге. Воно повинно містити не більше 16 символів.');
      return;
    } else if (!usernameRegex.test(trimmedUsername)) {
      setErrorMessage('Ім\'я користувача містить неприпустимі символи. Дозволені лише букви, цифри та підкреслення.');
      return;
    } else if (trimmedPassword.length < 4) {
      setErrorMessage('Пароль занадто короткий. Він повинен містити не менше 4 символів.');
      return;
    } else if (trimmedPassword.length > 16) {
      setErrorMessage('Пароль занадто довгий. Він повинен містити не більше 16 символів.');
      return;
    }

    // Save user data (though storing passwords in localStorage is not recommended)
    localStorage.setItem('username', trimmedUsername);
    localStorage.setItem(`user_${userId}_name`, trimmedPassword);
    localStorage.setItem('avatar', avatar);

    // Redirect to books page
    navigate('/books');
  };

  return (
    <div className="container">
      <div className="avatar">
        <img src={avatar} alt="avatar" id="avatar" />
      </div>
      <form className="login-form" onSubmit={handleSignIn}>
        <label htmlFor="username">Username</label>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Type Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Type Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
          Sign in
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;
