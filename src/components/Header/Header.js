import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import cartIcon from '../../images/cart.svg';
import avatarImage from '../../images/avatar.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar') || avatarImage;

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    navigate('/signin');
  };

  const handleProtectedLinkClick = (event, path) => {
    if (!username) {
      event.preventDefault();
      alert('Необхідно увійти до системи для переходу на цю сторінку.');
    } else {
      navigate(path);
    }
  };

  const isSignInPage = location.pathname === '/signin';

  return (
    <header>
      <div className="bookstore">
        <nav>
          <Link to={username ? "/books" : "#"} onClick={(event) => handleProtectedLinkClick(event, "/books")}>
            <h3>X-course task /Nataliia Lastovets</h3>
          </Link>
          {!isSignInPage && (
            <>
              <div className="right-section">
                <Link to={username ? "/cart" : "#"} onClick={(event) => handleProtectedLinkClick(event, "/cart")}>
                  <img src={cartIcon} alt="cart" className="cart-icon"/>
                </Link>
                {username ? (
                  <>
                    <button className="sign-out-btn" onClick={handleSignOut}>Sign-Out</button>
                    <div className="user-info">
                      <img src={avatar} alt="User avatar" className="user-avatar" />
                      <Link to={username ? "/books" : "#"} onClick={(event) => handleProtectedLinkClick(event, "/books")}>
                        <span id="user-header">{username}</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
