import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './scss/main.scss';
import coderslabApprentice from './data/coderslabApprentice';

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import Login from './components/pages/Login';
import UserInfo from './components/users/UserInfo';
import NotFound from './components/pages/NotFound';
import SignUp from './components/pages/SignUp';
import Account from './components/pages/Account';

class App extends Component {
  state = {
    data: [],
    user: {},
    alertMsg: null,
    classMark: null,
    loading: false,
    followed: [],
    loginData: {},
    login: false
  };
  componentDidMount() {
    this.setState({ data: coderslabApprentice });
    this.getUsersFromJsonServer();
  }
  SearchUser = query => {
    this.setState({ loading: true });
    fetch(
      `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Users - PROBLEM!!!');
        }
      })
      .then(data => {
        return this.setState({ data: data.items, loading: false });
      })
      .catch(err => console.log(err));
  };
  getUser = userName => {
    this.setState({ loading: true });
    fetch(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
      {
        headers: {
          'User-Agent': 'request'
        }
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('UserName - PROBLEM!!');
        }
      })
      .then(data => {
        return this.setState({ user: data, loading: false });
      })
      .catch(err => console.log(err));
  };
  getAlert = (text, classN) => {
    this.setState({ alertMsg: text, classMark: classN });
    setTimeout(() => this.setState({ alertMsg: null, classMark: null }), 1300);
  };
  getUsersFromJsonServer = async () => {
    const response = await fetch('http://localhost:3004/users');
    const data = await response.json();
    this.setState({ followed: data });
  };
  addToFollowedToJsonServer = followUser => {
    const { followed } = this.state;
    let block = false;
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
    } = followUser;
    const data = {
      id: followed.length > 0 ? followed[followed.length - 1].id + 1 : 0,
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
      created_at,
      note: ''
    };
    followed.forEach(e => {
      if (e.login === data.login) {
        block = true;
        this.getAlert('User has already been added', 'user-alert-danger');
      }
    });

    if (!block) {
      fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          this.getAlert('User was added', 'user-alert-success');
          this.getUsersFromJsonServer();
        })
        .catch(err => console.log(err));
    }
  };
  deleteFollowedFromJsonServer = id => {
    fetch(`http://localhost:3004/users/${id}`, {
      method: 'DELETE'
    }).then(res => {
      this.getUsersFromJsonServer();
      this.getAlert('User was deleted', 'account-alert-success');
    });
  };
  editFollowedFromJsonServer = data => {
    fetch(`http://localhost:3004/users/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        this.getAlert('Note was saved', 'account-alert-success');
        this.getUsersFromJsonServer();
      })
      .catch(err => console.log(err));
  };
  render() {
    const {
      data,
      user,
      alertMsg,
      classMark,
      loading,
      followed,
      loginData,
      login
    } = this.state;
    return (
      <>
        <Router>
          <Navbar
            query={this.SearchUser}
            alert={this.getAlert}
            loginUser={login}
            logout={() => this.setState({ login: false })}
          />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <div className='content'>
                  <Alert alertMsg={alertMsg} classMark={classMark} />
                  <Users users={data} loading={loading} />
                </div>
              )}
            />
            <Route
              exact
              path='/user/:userName'
              render={props => (
                <UserInfo
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  followed={this.addToFollowedToJsonServer}
                  loading={loading}
                  classMark={classMark}
                  alertMsg={alertMsg}
                  loginUser={login}
                />
              )}
            />
            <Route
              path='/login'
              render={() => (
                <Login
                  classMark={classMark}
                  alertMsg={alertMsg}
                  getAlert={this.getAlert}
                  loginData={loginData}
                  loginUser={login => this.setState({ login: login })}
                />
              )}
            />
            <Route
              path='/account'
              render={() => (
                <Account
                  followed={followed}
                  getId={this.deleteFollowedFromJsonServer}
                  classMark={classMark}
                  alertMsg={alertMsg}
                  editedUser={this.editFollowedFromJsonServer}
                />
              )}
            />
            <Route
              path='/join'
              render={() => (
                <SignUp
                  classMark={classMark}
                  alertMsg={alertMsg}
                  getAlert={this.getAlert}
                  getLoginData={data => this.setState({ loginData: data })}
                />
              )}
            />
            <Route path='*' component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
