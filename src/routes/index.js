import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import Quote from "../components/TradingDay/Quote";
import NotFound from "../components/TradingDay/NotFound";
//STOCK-TRACKER
import StockTracker from "../components/simple-stock-tracker/";

//TRADING-DAY
import TradingDay from "../components/TradingDay/";
import EthereumChart from "../components/TradingDay/Charts/StylizedCandlestick/EthereumVX";
import StylizedCandlestickChart from "../components/TradingDay/Charts/StylizedCandlestick";
import SP500 from "../components/TradingDay/MarketForces";

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
import FisheyeSlideshow from "../components/TradingDay/Visualizations/SlideShow";

//---------------------------------------------------
const Router = props => (
  <Switch>
    {/* ROOT */}
    {/* HOME */}
    <Route exact path='/' render={props => <Home {...props} />} />
    {/* LOGIN */}
    <Route exact path='/login' component={Login} />
    {/* LISTINGS */}
    <Route exact path='/sp500' component={SP500} />
    <Route exact path='/SlideShow' component={FisheyeSlideshow} />
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
      render={props => <Quote symbol={props.match.params.id} {...props} />}
    />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
