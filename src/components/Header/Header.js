import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import cartIcon from '../../images/cart.svg';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const avatar = localStorage.getItem('avatar');

  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    navigate('/signin');
  };

  const isSignInPage = location.pathname === '/signin';

  return (
    <header>
      <div className="bookstore">
        <nav>
          <h3>X-course task /Nataliia Lastovets</h3>
          {!isSignInPage && (
            <>
              <div className="right-section">
                <Link to="/cart">
                  <img src={cartIcon} alt="cart" className="cart-icon"/>
                </Link>
                {username ? (
                  <>
                    <button className="sign-out-btn" onClick={handleSignOut}>Sign-Out</button>
                    <div className="user-info">
                      {avatar ? (
                        <img src={avatar} alt="User avatar" className="user-avatar" />
                      ) : (
                        <img src="../../images/default-avatar.png" alt="Default User Avatar" className="user-avatar" />
                      )}
                      <Link to="/books">
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
