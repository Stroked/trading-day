// react ecosystem
import React from "react";
import styled, { keyframes } from "styled-components";
import { Switch, Route } from "react-router-dom";
//---------------------------------------------------
//QUOTES-NINJA
import { DataProvider } from "./components/quotes-ninja/WithDataContext";
import QuotesHome from "./routes/QuotesHome";
import QuotePage from "./routes/QuotePage";
//OPEN-STOCK
import OpenStockHome from "./routes/OpenStockHome.js";
import Stocks from "./components/openStock/container/Stocks.js";
//STOCK-TRACKER
import StockTracker from "./components/simple-stock-tracker/";

//TRADING-DAY
import TradingDay from "./components/TradingDay/";
//TREND-TICKER
// import TickerTrends from './routes/TickerTrends'
//---------------------------------------------------
//ROUTES
import Login from "./routes/Login";
import NotFoundPage from "./routes/NotFoundPage";

//---------------------------------------------------
//CONTAINERS

//---------------------------------------------------
//ASSETS
import logo from "./assets/orange-wheel-art-800x800.png";
import marketHeader from "./assets/design/market-header.png";
//---------------------------------------------------

//---------------------------------------------------
//Cool Look
import Mosaic from "./components/coolook/Mosaic";

//---------------------------------------------------
export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
         <DataProvider> 
          <Switch>
            {/* ROOT */}
            <Route exact path='/' component={OpenStockHome} />
            {/* QUOTES HOME */}

            {/* LOGIN */}
            <Route exact path='/Login' component={Login} />
            {/* OPENSTOCK */}
            <Route exact path='/Stocks' component={Stocks} />
            <Route exact path='/TradingDay' component={TradingDay} />
            <Route exact path='/StockTracker' component={StockTracker} />
            <Route exact path='/Mosaic' component={Mosaic} />
            {/* <Route
                exact
                path='GoogleTrends/:id'
                render={props => (
                  <TickerTrends symbol={props.match.params.id} {...props} />
                )}
              /> */}
            {/*  QUOTES */}
            <Route
              exact
              path='/Homepage'
              render={props => <QuotesHome {...props} />}
            />

            <Route
              exact
              path='/:id'
              render={props => (
                <QuotePage symbol={props.match.params.id} {...props} />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
         </DataProvider>
      </AppWrapper>
    );
  }
}

//-------------------------------------------------
const AppWrapper = styled.div`
  /* text-align: center; */
  /* body > div,
  body > div > div ,
  body > div > div > div,
  body > div > div > div > div.login-form {
    height: 100%;
  } */
`;
// const rotate360 = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;
// const AppLogo = styled.img`
//   animation: ${rotate360} infinite 120s linear;
//   height: 80px;
//   &:hover {
//     animation: ${rotate360} infinite 1.5s linear;
//   }
// `;
// const AppHeader = styled.div`
//   background-color: #222;
//   height: 150px;
//   padding: 20px;
//   color: white;
// `;
// const AppTitle = styled.h1`
//   font-size: 1.3em;
// `;
//-----------------------------------------------------
// <AppWrapper>
//   <AppHeader>
//     <AppLogo src={logo} alt='logo' />
//     <AppTitle>Welcome to React</AppTitle>
//   </AppHeader>
// </AppWrapper>;
