import React, { useState, useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";
import QuoteData from "./QuoteData";
import { DataContext } from "../MarketData";

export default props => {
  
  const {
    //peers,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    YahooChartDataFetcher,
    YahooQuoteFetcher,
    //getPeers,
    quoteData
  } = useContext(DataContext);
  const [ticker, setTicker] = useState(props.symbol);
  useEffect(() => {
    handleSymbolChange(ticker);
    //getPeers(ticker);
  }, [ticker]);
  useEffect(() => setTicker(props.symbol), [props.symbol]);
    //  console.log(quoteData);
    //  console.log(peers);
    //  debugger;
  return (
    <Segment
      loading={fetchingQuote.loading && !fetchingIncidies.loading}
      style={{ minHeight: "300px" }}>
      {ticker ? (
        !fetchingQuote.loading && (
          <QuoteData
            symbol={props.symbol}
            quote={quoteData.quote}
            chartDataHandler={YahooChartDataFetcher}
          />
        )
      ) : (
        <h1>NO DATA</h1>
      )}
    </Segment>
  );
};
