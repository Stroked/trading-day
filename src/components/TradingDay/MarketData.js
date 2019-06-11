import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import Loading from "./Loading";
import {
  fetchQuoteData,
  fetchIndiciesData
  // makeApiCall,
  // fetchIntradayData
} from "../../utils/fetch";
import _ from 'lodash';

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
    }
  };

  const onMount = async () => {
    try {
      // fetch indicies data
      const data = await fetchIndiciesData(COLLECTION);
      setIndiciesData(data);
      setFetchingIndicies({ loading: false, error: null });
      // init refresh interval
      //  fetchIncidiesInterval();
    } catch (error) {
      setFetchingIndicies({ loading: false, error });
    }
  };


  
const fetchMoneyFlows = async () => {
  const file = await fetch(
    "http://cors-anywhere.herokuapp.com/online.wsj.com/mdc/public/npage/2_3045-mfgppl-mfxml2csv.html"
  );
  let res = await file.text();
  console.log(res);
  let data = res.trim();
  data = data.substring(data.indexOf("C"));
  data = d3.tsvParse(data, d3.autoType);
  return data;
};
  const getPeers = async symbol => {
    // Get peers and batch request trading-day quote
    //https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_930da6c1c50b4e33914febac3ab39fcb
    //https://cloud.iexapis.com/stable/stock/aapl/peers?token=pk_930da6c1c50b4e33914febac3ab39fcb
    //https://cloud.iexapis.com/stable/stock/aapl/quote?token=pk_930da6c1c50b4e33914febac3ab39fcb
    let peers = await d3.json(
      `https://cloud.iexapis.com/stable/stock/${symbol}/peers?&token=pk_930da6c1c50b4e33914febac3ab39fcb`
    );
    if (Object.keys(peers).length > 0) {
      //https://cloud.iexapis.com/stable/stock/market/batch?token=pk_930da6c1c50b4e33914febac3ab39fcb&symbols=aapl,fb&types=quote,chart&range=1d
      const quotePeers = await d3.json(
        `https://cloud.iexapis.com/stable/stock/market/batch?token=pk_930da6c1c50b4e33914febac3ab39fcb&symbols=${peers.join()}&types=quote,chart&range=1d`
      );
      console.log(quotePeers);
      if(peers.length!=quotePeers.length)
      {
        // debugger;
        peers.filter(x=>_.find(quotePeers,p=>p.quote.symbol===x))
      }
      setPeers({
        peersFetched: true,
        peers: peers,
        peerData: quotePeers
      });
    }
  };
  // const handleChartDataRequest = async (symbol, period) => {
  //   try {
  //     setFetchingChartData({ loading: true, error: null });

  //     const data =
  //       period === "1D"
  //         ? await fetchIntradayData(symbol)
  //         : await makeApiCall(symbol, period);
  //     setFetchingChartData({ loading: false, error: null });
  //     setChartData(data);
  //   } catch (error) {
  //     setFetchingChartData({ loading: false, error });
  //   }
  // };

  const handleSymbolChange = async symbol => {
    try {
      // clear previous refresh interval
      // clearInterval(refresh);

      setSymbol(symbol);
      // fetch quote data
      setFetchingQuote({ loading: true, error: null });
      const data = await fetchQuoteData(symbol);
      console.log(data);
      // debugger;
      setQuoteData(data);

      setFetchingQuote({ loading: false, error: null });
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
  
        ...props
      }}>
      {fetchingIncidies.loading && <Loading />}
      {props.children}
    </DataContext.Provider>
  );
};
