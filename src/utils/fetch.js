// import axios from "axios";
import _ from "lodash";
import { formatDayChart } from "./format";
import * as d3 from "d3";
// const iex = axios.create({
//   baseURL: "https://api.iextrading.com/1.0/stock"
// });

//https://cloud.iexapis.com/stable/stock/aapl/chart/1y?token=pk_930da6c1c50b4e33914febac3ab39fcb
export const fetchChart = async (symbol, range) => {
  const data = await d3.json(
    `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=pk_1b77cc50b5cc4138bf37e0c1a87768c5`,
    

    d3.autoType
  );

  return data;

  // const { data2 } = await iex.get(`/${symbol}/chart/${range}`, {
  //   params: {
  //     chartReset: true
  //   }
  // });
  // return data2;
};
export const fetchAllCharts = async symbol => {
  const data = await Promise.all([
    await fetchIntradayData(symbol),
    //await fetchDynamicTodayData(symbol),

    //await fetchChart(symbol, "dynamic"),
    await fetchChart(symbol, "1m"),
    await fetchChart(symbol, "3m"),
    await fetchChart(symbol, "6m"),
    await fetchChart(symbol, "1y"),
    await fetchChart(symbol, "5y"),
    await fetchChart(symbol, "ytd")
  ]);

  return {
    "1D": data[0],
    "1M": data[1],
    "3M": data[2],
    "6M": data[3],
    "1Y": data[4],
    "5Y": data[5],
    YTD: data[6]
  };
};

export const fetchQuote = async symbol => {
  //https://cloud.iexapis.com/stable/stock/AIG/batch?token=pk_930da6c1c50b4e33914febac3ab39fcb&types=quote,logo,stats,news
  const data = await d3.json(
    `https://cloud.iexapis.com/stable/stock/${symbol}/batch?token=pk_1b77cc50b5cc4138bf37e0c1a87768c5&types=quote,logo,stats,news`,
    d3.autoType
  );
  return data;
};

export const fetchDynamicTodayData = async symbol => {
  //  PROBLEM WITH THIS DATA: 15 MIN DELAY
  /*
   WHILE WE DO HAVE SOME DATA FOR THOSE 15 * 1 MINUTE INTERVALS 
   IEX PROVIDES ONLY THEIR OWN DATA ONLY
   NOT MARKET WIDE....SO THE VOLUME FOR THE LAST
   DELAYED DATA WILL BE LESS THAN THE REST OF THE DATASET
*/
  const range = "today";
  {
    const data = await d3.json(
      `https://api.iextrading.com/1.0/stock/aapl/chart/dynamic?chartReset=true`
    );

    data.data.forEach(d => {
      let year = d.date.slice(0, 4);
      let month = d.date.slice(4, 6);
      let day = d.date.slice(6, 8);
      const stringDate = `${year}-${month}-${day}T${d.minute}`;
      d.date = new Date(stringDate);
    });
    return data.data;
  }
};

export const fetchIntradayData = async symbol => {
  const period = "1min";
  const data = await d3.json(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${period}&outputsize=full&apikey=TRDGNTGBQG2BI9J0`
  );

  return [
    ...Object.entries(data["Time Series (1min)"]).map(([date, cols]) => {
      return {
        ...cols,
        date: new Date(date),
        open: +cols["1. open"],
        high: +cols["2. high"],
        low: +cols["3. low"],
        close: +cols["4. close"],
        volume: +cols["5. volume"]
      };
    })
  ];
};

const makeApiCall = async (symbol, period = "1y") => {
  let timeParser = d3.timeParse("%Y-%m-%d");
  if (period === "1d") timeParser = d3.timeParse("%Y%m%d%H:%M");

  let prices = [];
  let times = [];
  const d = await d3.json(
    `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`
  );

  // Check for failure to retry.
  if (d[0]["date"] == null) {
    makeApiCall(symbol, period);
    return;
  }

  for (let i = 0; i < d.length; i++) {
    if (d[i]["marketNumberOfTrades"] === 0 || d[i]["marketAverage"] === -1) {
      d.splice(i, 1);
      i--;
      continue;
    }

    if (period === "1d") {
      d[i]["close"] = d[i]["marketAverage"];
      d[i]["date"] = timeParser(d[i]["date"] + d[i]["minute"]);
    } else {
      d[i]["date"] = timeParser(d[i]["date"]);
    }

    times.push(d[i]["date"]);
    prices.push(d[i]["close"]);
  }

  return { times, prices, d };

  // this.setState({
  //   fetched: true,
  //   times: times,
  //   prices: prices,
  //   interval: frequency,
  //   d: d
  // });
};
export const fetchQuoteData = async (symbol, frequency) => {
  const data = await Promise.all([
    await fetchQuote(symbol),
    await fetchAllCharts(symbol)
    //await makeApiCall(symbol, frequency)
  ]);
  //charts: data[1],
  return {
    quote: data[0],
    rangeData: data[1]
  };
};

// export const fetchBatchData = async symbols => {
//   const { data } = await iex.get(`/market/batch`, {
//     params: {
//       symbols,
//       types: "quote"
//     }
//   });
//   return data;
// };

// export const fetchMarketNews = async () => {
//   const { data } = await iex.get(`/market/news`);
//   return data;
// };

// export const fetchInFocus = async () => {
//   const { data } = await iex.get(`/market/list/infocus`);
//   return data;
// };

export const fetchIndiciesData = async symbols => {
  const data = await Promise.all([
    await d3.json(
      `http://cors-anywhere.herokuapp.com/query1.finance.yahoo.com/v7/finance/spark?symbols=${symbols.join(
        ","
      )}&range=1d&interval=5m&indicators=close&includeTimestamps=false`
    )
    //  (_.toString(symbols)),
    //await fetchMarketNews(),
    //await fetchInFocus()
  ]);

  return { quotes: data[0], news: data[1], infocus: data[2] };
};
/*

import axios from 'axios';
import _ from 'lodash';
import { formatDayChart } from './format';
import algotrader from 'algotrader'

const iex = axios.create({
  baseURL: 'https://api.iextrading.com/1.0/stock',
});

export const fetchChart = async (symbol, range) => {
  const { data } = await iex.get(`/${symbol}/chart/${range}`, {
    params: {
      chartReset: true,
    },
  });
  return data;
};
export const fetchAllCharts = async symbol => {
  const data = await Promise.all([
    await fetchChart(symbol, '1d'),
    await fetchChart(symbol, '1m'),
    await fetchChart(symbol, '3m'),
    await fetchChart(symbol, '6m'),
    await fetchChart(symbol, '1y'),
    await fetchChart(symbol, 'ytd'),
  ]);

  return {
    d1: formatDayChart(data[0]),
    m1: data[1],
    m3: data[2],
    m6: data[3],
    y1: data[4],
    ytd: data[5],
  };
};

export const fetchQuote = async symbol => {
  const { data } = await iex.get(`/${symbol}/batch`, {
    params: {
      types: 'quote,logo,stats,news',
    },
  });
  return data;
};

  export const fetchMarketData = async symbol => {
  const data = await Promise.all([
    await fetchQuote(symbol),
    await fetchAllCharts(symbol),
  ]);
  return { quote: data[0], charts: data[1] };
};

export const fetchQuoteData = async symbol => {
  const data = await Promise.all([
    await fetchQuote(symbol),
    await fetchAllCharts(symbol),
  ]);


  return { quote: data[0], charts: data[1] };
};

export const fetchBatchData = async symbols => {
  const { data } = await iex.get(`/market/batch`, {
    params: {
      symbols,
      types: 'quote',
    },
  });
  return data;
};

export const fetchMarketNews = async () => {
  const { data } = await iex.get(`/market/news`);
  return data;
};

export const fetchInFocus = async () => {
  const { data } = await iex.get(`/market/list/infocus`);
  return data;
};

export const fetchIndiciesData = async symbols => {
  const data = await Promise.all([
    await fetchBatchData(_.toString(symbols)),
    await fetchMarketNews(),
    await fetchInFocus(),
  ]);

  return { quotes: data[0], news: data[1], infocus: data[2] };
};
*/
