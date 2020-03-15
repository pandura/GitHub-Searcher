import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

const Navbar = props => {
  let history = useHistory();
  let textInput = null;
  const { query, alert, loginUser, logout } = props;
  let hamburgerElement = null;
  let closeElement = null;

  const handleDownKey = event => {
    if (event.keyCode === 13) {
      if (event.target.value !== '') {
        query(event.target.value);
      } else {
        alert('Please enter user name!', 'alert');
      }
      textInput.value = '';
      history.push(`/`);
    }
  };
  const logoutUser = () => {
    logout();
    alert('You have logged out', 'alert-logout');
  };
  const mobileMenu = () => {
    const boxMenu =
      hamburgerElement.previousElementSibling.previousElementSibling;
    const close = hamburgerElement.previousElementSibling;
    const hamburger = hamburgerElement;
    if (boxMenu.style.display === 'block') {
      boxMenu.style.display = 'none';
    } else {
      boxMenu.style.display = 'block';
      close.style.display = 'block';
      hamburger.style.display = 'none';
    }
  };
  const mobileClose = () => {
    closeElement.style.display = 'none';
    closeElement.previousElementSibling.style.display = 'none';
    closeElement.nextElementSibling.style.display = 'block';
  };

  return (
    <header className='header'>
      <div className='header-logo'>
        <Link to='/'>
          <i className='fab fa-github logo'></i>
        </Link>

        <small>GitHub Searcher</small>
      </div>
      <nav className='header-nav'>
        <div className='header-box'>
          <input
            className='header-input'
            onKeyDown={event => handleDownKey(event)}
            type='text'
            name='search'
            placeholder='Search Github'
            ref={input => {
              textInput = input;
            }}
          />
          <ul className='header-nav-list'>
            {!loginUser ? (
              <>
                <li>
                  <Link to='/login'>Sign in</Link>
                </li>
                <li>
                  <Link to='/join'>Sign up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/account'>Account</Link>
                </li>
                <li onClick={logoutUser}>
                  <Link to='/'>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link
          ref={e => (closeElement = e)}
          onClick={event => mobileClose(event)}
          to='#'
          className='hamburger-close'
        >
          <i className='fas fa-times'></i>
        </Link>
        <Link
          ref={e => (hamburgerElement = e)}
          onClick={event => mobileMenu(event)}
          to='#'
          className='hamburger'
        >
          <i className='fas fa-bars'></i>
        </Link>
      </nav>
    </header>
  );
};
Navbar.propTypes = {
  query: PropTypes.func.isRequired,
  alert: PropTypes.func.isRequired
};
export default Navbar;
