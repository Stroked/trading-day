import axios from 'axios';
import _ from 'lodash';
import { formatDayChart } from './format';

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