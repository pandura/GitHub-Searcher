import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from '../layout/Alert';

class UserInfo extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userName);
  }
  static propTypes = {
    getUser: PropTypes.func.isRequired
  };
  render() {
    const {
      login,
      name,
      avatar_url,
      location,
      bio,
      company,
      blog,
      html_url,
      email,
      followers,
      following,
      public_repos,
      hireable,
      created_at
    } = this.props.user;
    const date = `${created_at}`;
    const dateSplit = date.split('T');
    return (
      <div className='container-user'>
        <div className='user-info'>
          <Link to='/' className='user-info-btn'>
            Back
          </Link>

          <div className='user-info-card'>
            <div className='user-info-card-left'>
              <h2 className='user-info-card-h2'>{name}</h2>
              <p className='user-info-card-p'>{location}</p>
              <p className='user-info-card-hireable'>
                Hireable:{' '}
                {hireable ? (
                  <i className='fas fa-check' />
                ) : (
                  <i className='fas fa-times' />
                )}
              </p>
              <img className='user-info-card-img' src={avatar_url} alt='' />
              <p className='user-info-card-p'>Born on GitHub: {dateSplit[0]}</p>
              <a className='user-info-card-btn' href={html_url}>
                GitHub profile
              </a>
            </div>
            <div className='user-info-card-right'>
              <div className='user-info-card-right-btn'>
                {this.props.loginUser ? (
                  <button
                    onClick={() => this.props.followed(this.props.user)}
                    className='user-info-card-right-fallow'
                  >
                    Add user to followed <i className='fas fa-plus' />
                  </button>
                ) : null}

                <div className='user-alert'>
                  <Alert
                    alertMsg={this.props.alertMsg}
                    classMark={this.props.classMark}
                  />
                </div>
              </div>

              {bio && (
                <div className='user-info-card-bio'>
                  <h3 className='user-info-card-bio-h3'>Bio: </h3>
                  <p className='user-info-card-bio-p'>{bio}</p>
                </div>
              )}
              <div className='user-info-card-bio-data'>
                <h4>Data: </h4>
                <ul>
                  <li>
                    {company && (
                      <>
                        Company: <strong>{company}</strong>{' '}
                      </>
                    )}
                  </li>
                  <li>
                    Login on gitHub: <strong>{login}</strong>
                  </li>

                  <li>
                    {blog && (
                      <>
                        www: <strong>{blog}</strong>{' '}
                      </>
                    )}
                  </li>
                  <li>
                    {email && (
                      <>
                        Email: <strong>{email}</strong>{' '}
                      </>
                    )}
                  </li>
                </ul>
              </div>
              <div className='user-info-card-bio-data-social'>
                <ul>
                  <li className='red'>Repositiories: {public_repos}</li>
                  <li className='green'>Followers: {followers}</li>
                  <li className='blue'>Following: {following}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserInfo;
