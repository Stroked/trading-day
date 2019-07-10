import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
//TRADING-DAY
//---------------------------------------------------
//ROUTES
import TradingDay from "../components/TradingDay/";
import Login from "../components/TradingDay/Login/Login";
import Quote from "../components/TradingDay/Quote";
import StockMarketExchanges from '../components/TradingDay/Exchanges/Exchange'
import StylizedCandlestickChart from "../components/TradingDay/Charts/StylizedCandlestick";
import MarketForces from "../components/TradingDay/Visualizations/SP500/ForceLayout";
// import MarketHeatmap from "../components/TradingDay/Visualizations/SP500/TreeHeatmap";
// import MarketBubbles from "../components/TradingDay/Visualizations/MajorIndexes/CirclePack";

// import BubblyJobs from "../components/TradingDay/Visualizations/BubblyJobs";

import NotFound from "../components/TradingDay/NotFound";
import Header from "../components/TradingDay/Header";

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
    <Route exact path='/mosaic' component={Mosaic} />
    <Route exact path='/slide-show' component={FisheyeSlideshow} />
    {/* <Route exact path='/heatmap' component={MarketHeatmap} /> */}
    {/* <Route exact path='/circle-pack' component={MarketBubbles} /> */}
    {/* <Route exact path='/bubbly-jobs' component={BubblyJobs} /> */}
    <Route exact path='/force' component={MarketForces} />
    {/* <Route exact path='/observable-notebook' component={ObservableNotebook} /> */}

    <Route
      exact
      path='/styled-candlesticks'
      component={StylizedCandlestickChart}
    />
    <Route
      exact
      path='/:id'
      render={props => (
        <Quote symbol={props.match.params.id.toLowerCase()} {...props} />
      )}
    />
    <Route exact path='/exchanges' component={StockMarketExchanges} />
    <Route component={NotFound} />
  </Switch>
);



export default Router;
