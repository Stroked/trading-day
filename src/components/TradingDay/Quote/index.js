import React, { useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";
import QuoteData from "./QuoteData";
import { DataContext } from "../MarketData";

export default (props) => {
  const {
    symbol,
    peers,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    getPeers,
    quoteData,
    handleChartDataRequest,
    fetchingChartData,
    chartData
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
          rangeData={handleChartDataRequest}
          chartData={chartData}
          peers={peers}

        />
      )}
    </Segment>
  );
};
