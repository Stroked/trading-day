import React from 'react';
import PropTypes from 'prop-types';

import Info from './Info.js';
import StocksSpotlight from '../../TradingDay/DailySpotlight';

class Stocks extends React.Component {
  render() {
    const params = new URLSearchParams(this.props.location.search);
    const symbol = params.get('symbol');
    const hasSymbol = symbol != null && symbol != '';
    return (
      <div className='Stocks container-fluid'>
        {hasSymbol ? <Info symbol={symbol} /> : <StocksSpotlight />}
      </div>
    );
  }
}

export default Stocks;
