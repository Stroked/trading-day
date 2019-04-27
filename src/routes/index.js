import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
//TRADING-DAY
//---------------------------------------------------
//ROUTES
import TradingDay from "../components/TradingDay/";
import Login from "../components/TradingDay/Login/Login";
import Quote from "../components/TradingDay/Quote";
import StockMarketExchanges from '../components/TradingDay/Exchanges'
import EthereumChart from "../components/TradingDay/Charts/StylizedCandlestick/EthereumVX";
import StylizedCandlestickChart from "../components/TradingDay/Charts/StylizedCandlestick";
import SP500 from "../components/TradingDay/Visualizations/MarketForces";
import NotFound from "../components/TradingDay/NotFound";


//ASSETS
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
    <Route exact path='/TradingDay' component={TradingDay} />
    {/* LISTINGS */}
    <Route exact path='/exchanges' component={StockMarketExchanges} />
    <Route exact path='/sp500' component={SP500} />
    <Route exact path='/mosaic' component={Mosaic} />
    <Route exact path='/slide-show' component={FisheyeSlideshow} />
    <Route exact path='/ethereum' component={EthereumChart} />
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