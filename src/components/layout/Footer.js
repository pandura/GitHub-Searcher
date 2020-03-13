import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-text'>
        <p>&#169; 2020 Dura, Inc</p>
      </div>
      <div className='footer-logo'>
        <Link to='/'>
          <i className='fab fa-github logo-footer'></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
