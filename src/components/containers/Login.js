import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col" />
        <div className="col signin">
          <div>
            <form action="localhost:3000/Users/login" method="post">
              <h2>Login</h2>
              Username:
              <input type="text" name="username" />
              Password:
              <input type="text" name="userPassword" type="password" />
              <br />
              <button>Login</button>
            </form>
          </div>
        </div>
        <div className="col" />
      </div>
    );
  }
}

export default Login;
