import React from 'react';
import PropTypes from 'prop-types';

class Statistics extends React.Component {
  render() {
    const lastPrice = this.props.prices[this.props.prices.length - 1];
    const firstPrice = this.props.prices[0];
    const priceChange = lastPrice - firstPrice;
    const percentChange = priceChange / firstPrice;

    return (
      <div>
        <h2> Information </h2>
        <h3> Current Price </h3>
        <p> ${Math.floor(lastPrice * 100) / 100} </p>
        <h3> Percent Change </h3>
        <p> {Math.floor(percentChange * 100 * 100) / 100}% </p>
        <h3> Past {this.props.interval} </h3>
        <p> ${Math.floor(priceChange * 100) / 100} </p>
      </div>
    );
  }
}

export default Statistics;
