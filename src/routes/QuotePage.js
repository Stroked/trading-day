import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import QuoteData from '../components/quotes-ninja/QuoteData';
import { DataContext } from '../components/quotes-ninja/WithDataContext';

const QuotePage = props => {
  const {
    symbol,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    quoteData
  } = useContext(DataContext);

  // fetch new data every symbol changes
  useEffect(
    () => {
      if (props.symbol && props.symbol !== symbol)
        handleSymbolChange(props.symbol);
    },
    [props.symbol, symbol]
  );

  return (
    <Segment
      loading={fetchingQuote.loading && !fetchingIncidies.loading}
      style={{ minHeight: '300px' }}
    >
      {!fetchingQuote.loading && (
        <QuoteData
          symbol={symbol}
          data={quoteData.quote}
          charts={quoteData.charts}
        />
      )}
    </Segment>
  );
};

QuotePage.propTypes = {
  symbol: PropTypes.string.isRequired
};

export default QuotePage;
