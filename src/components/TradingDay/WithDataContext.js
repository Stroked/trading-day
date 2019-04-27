import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import Loading from "./Loading";
import { fetchQuoteData, fetchIndiciesData } from "../../utils/fetch";

const COLLECTION = ["SPY", "QQQ", "TLT", "VXX"];
const INTERVAL = 60000;

export const DataContext = React.createContext();

export const DataProvider = props => {
  const [fetchingIncidies, setFetchingIndicies] = useState({
    loading: true,
    error: null
  });

  const [fetchingQuote, setFetchingQuote] = useState({
    loading: true,
    error: null
  });

  const [symbol, setSymbol] = useState(null);
  const [requestedRangeData, setRequestedRangeData] =useState(null)
  const [quoteData, setQuoteData] = useState(null);
  const [peers, setPeers] = useState(null);
  const [refresh, setRefresh] = useState(null);

  const [indiciesData, setIndiciesData] = useState({
    quotes: {},
    news: []
  });

  const fetchIncidiesInterval = () => {
    setInterval(async () => {
      const data = await fetchIndiciesData(COLLECTION);
      setIndiciesData(data);
    }, INTERVAL);
  };

  const fetchQuoteInterval = async symbol => {
    if (symbol) {
      const data = await fetchQuoteData(symbol);
      setQuoteData(data);
      setRequestedRangeData(data.requestedRangeData);
    }
  };

  const onMount = async () => {
    try {
      // fetch indicies data
      const data = await fetchIndiciesData(COLLECTION);
      setIndiciesData(data);
      setFetchingIndicies({ loading: false, error: null });
      // init refresh interval
      fetchIncidiesInterval();
    } catch (error) {
      setFetchingIndicies({ loading: false, error });
    }
  };
  const getPeers = async symbol => {
    // Get peers and batch request trading-day quote
    let peers = await d3.json(
      `https://api.iextrading.com/1.0/stock/${symbol}/peers`
    );
    if (Object.keys(peers).length > 0) {
      const quotePeers = await d3.json(
        `https://api.iextrading.com/1.0/stock/market/batch?symbols=${peers.join()}&types=quote,chart&range=1d`
      );

      setPeers({
        peersFetched: true,
        peers: peers,
        peerData: quotePeers
      });
    }
  };

  const handleSymbolChange = async symbol => {
    try {
      // clear previous refresh interval
      clearInterval(refresh);

      // fetch quote data
      setFetchingQuote({ loading: true, error: null });
      const data = await fetchQuoteData(symbol);
      setQuoteData(data);
      setSymbol(symbol);
      setFetchingQuote({ loading: false, error: null });

      // set new refresh interval
      const interval = setInterval(() => {
        fetchQuoteInterval(symbol);
      }, INTERVAL);
      setRefresh(interval);
    } catch (error) {
      setFetchingQuote({ loading: false, error });
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <DataContext.Provider
      value={{
        symbol,
        peers,
        fetchingIncidies,
        fetchingQuote,
        quoteData,
        indiciesData,
        handleSymbolChange,
        getPeers,
        requestedRangeData,
        ...props
      }}>
      {fetchingIncidies.loading && <Loading />}
      {props.children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node
};

DataProvider.defaultProps = {
  children: null
};
