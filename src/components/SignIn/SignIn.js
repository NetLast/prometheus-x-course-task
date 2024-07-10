import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import './SignIn.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (trimmedUsername.length < 4) {
      setErrorMessage('Ім\'я користувача занадто коротке. Воно повинно містити не менше 4 символів.');
      return;
    } else if (trimmedUsername.length > 16) {
      setErrorMessage('Ім\'я користувача занадто довге. Воно повинно містити не більше 16 символів.');
      return;
    } else if (!usernameRegex.test(trimmedUsername)) {
      setErrorMessage('Ім\'я користувача містить неприпустимі символи. Дозволені лише букви, цифри та підкреслення.');
      return;
    }

    localStorage.setItem('username', trimmedUsername);
    localStorage.setItem('avatar', avatar);
    navigate('/books');
  };

  return (
    <div className="container">
      <div className="avatar">
        <img src={avatar} alt="avatar" id="avatar" />
      </div>
      <form className="login-form" onSubmit={handleSignIn}>
        <h2>Username</h2>
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
        <button type="submit">
          Sign in
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;
