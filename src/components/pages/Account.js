import React from 'react';
import { Link } from 'react-router-dom';

import Alert from '../layout/Alert';
import AccountUser from '../users/AcoountUser';
import PropTypes from 'prop-types';

const Account = props => {
  const { followed, getId, classMark, alertMsg, editedUser } = props;
  const deleteUser = event => {
    if (window.confirm('For sure?')) {
      getId(event.target.parentElement.parentElement.id);
    }
  };
  return (
    <div className='account'>
      <div className='account-container'>
        <Link className='add-user-btn' to='/'>
          <i className='fas fa-plus'></i> Users
        </Link>
        <div className='account-alert'>
          <Alert alertMsg={alertMsg} classMark={classMark} />
        </div>
        <h2 className='account-h2'>List of Your gitHub users:</h2>

        <ul className='account-list'>
          {followed.map(e => {
            return (
              <AccountUser
                key={e.id}
                user={e}
                deleteUser={event => deleteUser(event)}
                changeNote={data => editedUser(data)}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
Account.propTypes = {
  getId: PropTypes.func.isRequired,
  editedUser: PropTypes.func.isRequired
};
export default Account;
