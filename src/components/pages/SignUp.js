import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const SignUp = props => {
  const { getAlert, getLoginData } = props;
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const userRegister = event => {
    event.preventDefault();
    if (
      userName !== '' &&
      email !== '' &&
      email.indexOf('@') > -1 &&
      password.length > 3
    ) {
      const loginData = {
        userName,
        email,
        password
      };
      getLoginData(loginData);
      history.push('/login');
    } else {
      getAlert('Fill the form correctly', 'signUp-alert');
    }
  };
  return (
    <div className='signUp'>
      <div className='signUp-container'>
        <div className='signUp-left'>
          <h2 className='signUp-left-h2'>Find developers</h2>
          <p className='signUp-left-text'>
            GitHub searcher is a global platform for finding developers for app
            projects. You can look for experts among 40 million developers to
            build software.
          </p>
        </div>
        <div className='signUp-right'>
          <div className='signUp-right-alert'>
            <Alert alertMsg={props.alertMsg} classMark={props.classMark} />
          </div>
          <form onSubmit={event => userRegister(event)} className='signUp-form'>
            <label htmlFor='userName'>Username</label>
            <input
              onChange={event => setUserName(event.target.value)}
              type='text'
              id='userName'
              value={userName}
            />
            <label htmlFor='emailr'>Email</label>

            <input
              onChange={event => setEmail(event.target.value)}
              type='email'
              id='emailr'
              value={email}
            />
            <label htmlFor='passwordr'>Password</label>
            <input
              onChange={event => setPassword(event.target.value)}
              type='password'
              name=''
              id='passwordr'
              value={password}
            />
            <p className='signUp-condition'>
              Make sure it's at least 4 characters including a number and a
              lowercase letter
            </p>
            <button className='sightUp-btn'>Sign up for GitHub Searcher</button>
          </form>
        </div>
      </div>
    </div>
  );
};
SignUp.propTypes = {
  getAlert: PropTypes.func.isRequired,
  getLoginData: PropTypes.func.isRequired
};
export default SignUp;
