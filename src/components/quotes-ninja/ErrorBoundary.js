import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
// 