import React, { useEffect, useContext } from "react";
import { Segment } from "semantic-ui-react";
import QuoteData from "./QuoteData";
import { DataContext } from "../MarketData";

export default props => {
  const {
    symbol,
    peers,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    getPeers,
    quoteData
  } = useContext(DataContext);
  // fetch new data every symbol changes
  //   useEffect(() => {
  //     if (props.symbol && props.symbol !== symbol) {
  //       handleSymbolChange(props.symbol);
  //       getPeers(props.symbol);
  //     }
  //   }, [props.symbol, symbol]);

  //   return (
  //     <Segment loading={fetchingQuote.loading && !fetchingIncidies.loading}>
  //       {!fetchingQuote.loading && quoteData && (
  //         <QuoteData symbol={symbol} data={quoteData} peers={peers} />
  //       )}
  //     </Segment>
  //   );
  // };
  useEffect(() => {
    if (props.symbol && props.symbol !== symbol)
      handleSymbolChange(props.symbol);
    getPeers(props.symbol);
  }, [handleSymbolChange, getPeers, props.symbol]);
  return (
    <Segment
      loading={fetchingQuote.loading && !fetchingIncidies.loading}
      style={{ minHeight: "300px" }}>
      {quoteData ? (
        !fetchingQuote.loading && (
          <QuoteData symbol={symbol} data={quoteData} peers={peers} />
        )
      ) : (
        <h1>NO DATA</h1>
      )}
    </Segment>
  );
};
