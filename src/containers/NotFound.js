import React from 'react';
import PropTypes from 'prop-types';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col" />
          <div className="col">
            <div className="error">
              <h2>404</h2>
              <p> Page Not Found </p>
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default NotFound;
