import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import QuoteData from "./QuoteData";
import { DataContext } from "../WithDataContext";

export default (props) => {
  const {
    symbol,
    peers,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    getPeers,
    quoteData,
    requestedRangeData
  } = useContext(DataContext);

  // fetch new data every symbol changes
  useEffect(() => {
    if (props.symbol && props.symbol !== symbol) {
      handleSymbolChange(props.symbol);
      getPeers(props.symbol);
    }
  }, [props.symbol, symbol]);

  return (
    <Segment
      loading={fetchingQuote.loading && !fetchingIncidies.loading}
      style={{ minHeight: "300px" }}>
      {!fetchingQuote.loading && (
        <QuoteData
          symbol={symbol}
          data={quoteData.quote}
          rangeData={requestedRangeData}
          // charts={quoteData.charts}
          peers={peers}
        />
      )}
    </Segment>
  );
};

// QuotePage.propTypes = {
//   symbol: PropTypes.string.isRequired
// };

