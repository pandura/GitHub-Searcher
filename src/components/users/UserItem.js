import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = props => {
  const { login, avatar_url } = props.user;

  return (
    <div className='user'>
      <img className='user-img' src={avatar_url} alt='' />
      <h3 className='user-name'>{login}</h3>
      <div>
        <Link className='user-btn' to={`/user/${login}`}>
          More
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
