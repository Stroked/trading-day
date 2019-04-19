import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./Home";
import QuotePage from "./QuotePage";
import NotFoundPage from "./NotFoundPage";
import Markets from "../routes/Home";
//OPEN-STOCK
import OpenStockHome from "../routes/OpenStockHome.js";
import Stocks from "../components/openStock/container/Stocks.js";
//STOCK-TRACKER
import StockTracker from "../components/simple-stock-tracker/";

//TRADING-DAY
import TradingDay from "../components/TradingDay/";
import EthereumChart from "../components/TradingDay/Charts/StylizedCandlestick/EthereumVX";
import StylizedCandlestickChart from "../components/TradingDay/Charts/StylizedCandlestick";
import SP500 from "../components/TradingDay/MarketForces";

import MarketForces from "../routes/MarketForces";
//TREND-TICKER
// import TickerTrends from './routes/TickerTrends'
//---------------------------------------------------
//ROUTES
import Login from "../components/TradingDay/Login";

//---------------------------------------------------
//CONTAINERS

//---------------------------------------------------
//ASSETS
import logo from "../assets/orange-wheel-art-800x800.png";
import marketHeader from "../assets/design/market-header.png";
//---------------------------------------------------

//---------------------------------------------------
//Cool Look
import Mosaic from "../components/coolook/Mosaic";

//---------------------------------------------------
const Router = props => (
  <Switch>
    {/* ROOT */}
    <Route exact path='/' component={Markets} />
    {/* LOGIN */}
    <Route exact path='/Login' component={Login} />
    {/* HOME */}
    <Route exact path='/Home' component={OpenStockHome} />
    <Route exact path='/home-page' render={props => <HomePage {...props} />} />
    {/* LISTINGS */}
    <Route exact path='/sp500' component={SP500} />
    <Route exact path='/Listings' component={MarketForces} />

    {/* OPENSTOCK */}
    <Route exact path='/Stocks' component={Stocks} />
    <Route exact path='/TradingDay' component={TradingDay} />
    <Route exact path='/StockTracker' component={StockTracker} />
    <Route exact path='/Mosaic' component={Mosaic} />
    <Route
      exact
      path='/styled-candlesticks'
      component={StylizedCandlestickChart}
    />
    <Route
      exact
      path='/:id'
      render={props => <QuotePage symbol={props.match.params.id} {...props} />}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Router;
