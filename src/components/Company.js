import React from 'react';
import PropTypes from 'prop-types';

class Company extends React.Component {
  render() {
    return (
      <div>
        <h2> {this.props.name} </h2>
        <p> {this.props.info} </p>
      </div>
    );
  }
}

export default Company;
