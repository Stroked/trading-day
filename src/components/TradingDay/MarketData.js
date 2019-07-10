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
const unixTimeParser = d3.timeParse("%s");

const COLLECTION = ["SPY", "QQQ", "TLT", "VXX"];
 
const Currencies = [{symbol: "EURUSD=X", url_symbol:"EURUSD%3DX"},
{symbol: "GBPUSD=X", url_symbol:"GBPUSD%3DX"},
{symbol:  "USDJPY=X", url_symbol:"USDJPY%3DX"},
{symbol: "BTC-USD", url_symbol:"BTC%3DUSD"}]

const MajorIndexes = [
  {symbol:  "^GSPC", url_symbol:"%5EGSPC" },
 {symbol:"^DJI" ,url_symbol: "%5EDJI"},
 {symbol: "^IXIC" ,url_symbol: "%5EIXIC"},
 {symbol: "^RUT" ,url_symbol: "%5ERUT"},
 {symbol:   "^TNX",url_symbol: "%5ETNX"},
 {symbol:"^VIX" ,url_symbol: "%5EVIX"},
 {symbol:"CL=F", url_symbol: "CL%3DF"},
 {symbol:"SI=F" ,url_symbol:  "SI%3DF"},
 {symbol:  "GC=F" ,url_symbol: "GC%3DF"}

];

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

  const [indiciesData, setIndiciesData] = useState(null);

  // const fetchIncidiesInterval = () => {
  //   setInterval(async () => {
  //     const data = await fetchIndiciesData(MajorIndexes);
  //     setIndiciesData(data);
  //   }, INTERVAL);
  // };

  // const fetchQuoteInterval = async symbol => {
  //   if (symbol) {
  //     const data = await fetchQuoteData(symbol);
  //     setQuoteData(data);
  //   }
  // };

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


  
const YahooQuoteFetcher = async (symbol) => {
   let quote = await d3.json(
    `https://cors-anywhere.herokuapp.com/query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`,d3.autoType
  );
  return { quote: quote.quoteResponse.result[0] };
};

const YahooChartDataFetcher = async (symbol, interval, p1,p2) => {
  let fetched = await d3.json(
    `https://cors-anywhere.herokuapp.com/query1.finance.yahoo.com/v8/finance/chart/?symbol=${symbol}&period1=${p1}&period2=${p2}&interval=${interval}`,
    d3.autoType
  );
  let chartData = await extractChartData(fetched);
  return chartData.sort((a,b)=>b.date-a.date, d3.ascending);
};



const extractChartData = fetchedData => {
  let result = fetchedData.chart.result[0];
  let ohlcv = result.indicators.quote[0];
  return result.timestamp.map((x, i) => {
    let obj = { date: unixTimeParser(x) };
    obj.open = ohlcv.open[i];
    obj.high = ohlcv.high[i];
    obj.low = ohlcv.low[i];
    obj.close = ohlcv.close[i];
    obj.volume = ohlcv.volume[i];
    return obj;
  });
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
      const data = await YahooQuoteFetcher(symbol);
      // console.log(data);
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
        YahooChartDataFetcher,
        YahooQuoteFetcher,
        ...props
      }}>
      {fetchingIncidies.loading && <Loading />}
      {props.children}
    </DataContext.Provider>
  );
};
