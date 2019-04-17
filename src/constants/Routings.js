import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import MarketForces from "./components/MarketForces";
// import PriceChart from "./components/StockChart";
// import BitcoinChart from "./components/BitcoinVX";
// import HeikinAshi from "./components/StockChart/HeikinAshi";
// import Exchanges from "./components/exchanges";
// import TradingDay from "./components/trading-day";

export const AppEndpoints = {
  MarketForces: "/sp500",
  PriceChart: "/chart",
  BitcoinChart: "/bitcoin",
  EthereumChart: "/ethereum",
  HeikinAshi: "/heikinashi",
  Exchanges: "/exchanges",
  TradingDay: "/trading-day"
};
export const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <h1>An Exploration of the Trading Markets</h1>,
    // main: () => <TradingDay />
  },
  {
    path: "/nyse",
    sidebar: () => <h1>NYSE Listed</h1>,
    // main: () => <Exchanges />
  },
  {
    path: "/nasdaq",
    sidebar: () => <h1>NASDAQ Listed</h1>,
    // main: () => <Exchanges />
  },
  {
    path: "/sp500",
    sidebar: () => <h1>Market Forces: S&P-500</h1>,
    // main: () => <MarketForces />
  },
  {
    path: "/aapl",
    sidebar: () => <h1>Minimalistic AAPL Stock Performance Line Chart</h1>,
    // main: () => <PriceChart />
  },
  {
    path: "/bitcoin",
    sidebar: () => <h1>BITCOIN: Simple Line Chart</h1>,
    // main: () => <BitcoinChart />
  },
  {
    path: "/candle-stick-chart",
    sidebar: () => <h1>Interactive Financial CandleStick Charting</h1>,
    // main: () => <HeikinAshi />
  },
  {
    path: "/ethereum",
    sidebar: () => <h1>ETHEREUM: Interactive Stylized CandleStick Chart</h1>,
    // main: () => <EthereumChart />
  },
  {}
  //  ,{
  //    path: "/orange-slice",
  //    main: () => <h1>ORANGESLICE.BY.AJAY</h1>
  //  },
  //  {
  //    path: "/data-provider",
  //    sidebar:()=><h1>HOOKING REACT'S CONTEXT</h1>,
  //    main: () => <MarketForces/>
  //  }
];
