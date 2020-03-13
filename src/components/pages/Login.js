import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Login = props => {
  const [userName, getUserName] = useState('');
  const [password, getPassword] = useState('');
  const history = useHistory();
  const { getAlert, loginData, loginUser } = props;
  const loginToAccount = event => {
    event.preventDefault();
    if (loginData.userName !== undefined) {
      if (
        (userName === loginData.userName || loginData.email) &&
        password === loginData.password
      ) {
        loginUser(true);
        history.push('/account');
        getAlert(`Welcome ${loginData.userName}`, 'greetings-alert');
      }
    } else {
      getAlert('Login and / or password are incorrect', 'login-alert');
    }
  };

  return (
    <div className='login'>
      <div className='login-header'>
        <a href='/'>
          <i className='fab fa-github login-logo'></i>
        </a>
        <small className='login-small'>Sign in to GitHub Searcher</small>
        <div className='login-alert-box'>
          <Alert alertMsg={props.alertMsg} classMark={props.classMark} />
        </div>
        <div className='login-box'>
          <form
            onSubmit={event => loginToAccount(event)}
            className='login-form'
          >
            <label htmlFor='email'>Username or email address</label>
            <input
              onChange={event => getUserName(event.target.value)}
              type='text'
              id='email'
              value={userName}
            />
            <label htmlFor='password'>Password</label>
            <input
              onChange={event => getPassword(event.target.value)}
              type='password'
              id='password'
              value={password}
            />
            <button className='login-btn'>Sign in</button>
          </form>
        </div>
        <div className='login-create-account'>
          <p>New to GitHub Searcher?</p>
          <Link to='/join'>Create an account</Link>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  alert: PropTypes.func
};
export default Login;
