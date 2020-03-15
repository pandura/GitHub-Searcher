import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AccountUser = props => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');

  const { user, deleteUser, changeNote } = props;
  let inputNote = null;

  const saveEditedText = () => {
    const data = {
      id: user.id,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      location: user.location,
      bio: user.bio,
      company: user.company,
      blog: user.blog,
      html_url: user.html_url,
      email: user.email,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      hireable: user.hireable,
      created_at: user.created_at,
      note: text
    };
    changeNote(data);
  };
  return (
    <li id={user.id} className='account-list-element'>
      <div className='backgrondImg'>
        <Link to={`/user/${user.login}`}>
          <img className='account-user-img' src={user.avatar_url} alt='' />
        </Link>
      </div>

      <p>
        <strong>Name:</strong> {user.name ? user.name : user.login}
      </p>
      <p>
        <strong>Repos:</strong> {user.public_repos}
      </p>
      <p>
        <strong>Note: </strong>
        {edit ? (
          <input
            className='account-input'
            onChange={() => setText(inputNote.value)}
            ref={text => {
              inputNote = text;
            }}
            type='text'
            defaultValue={user.note}
          />
        ) : (
          <span className='text-input'>{user.note}</span>
        )}
      </p>
      {edit ? (
        <button
          className='btnInput'
          onClick={() => {
            setEdit(false);
            saveEditedText();
          }}
        >
          Save note
        </button>
      ) : (
        <button className='btnInput' onClick={() => setEdit(true)}>
          Edit note
        </button>
      )}
      <Link to='#' onClick={deleteUser}>
        <i className='fas fa-times delete-user'></i>
        <span className='delete'>delete</span>
      </Link>
    </li>
  );
};
AccountUser.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  changeNote: PropTypes.func.isRequired
};
export default AccountUser;
