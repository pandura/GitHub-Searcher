import React from 'react';

import UserItem from './UserItem';
import Spinner from '../layout/Loading';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='content-users'>
      {users.map(user => {
        return <UserItem key={user.id} user={user} />;
      })}
    </div>
  );
};
Users.propTypes = {
  loading: PropTypes.bool.isRequired
};
export default Users;
