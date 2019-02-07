import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { DataProvider } from './components/quotes-ninja/WithDataContext';
import Header from './components/openStock/Header.js';
import Home from './components/containers/Home.js';
import Stocks from './components/containers/Stocks.js';
import NotFound from './components/containers/NotFound.js';
import Orb from './components/openStock/Orb';

import QuotesHomepage from './routes/HomePage';
import QuotePage from './routes/QuotePage';
import NotFoundPage from './routes/NotFoundPage';


import StockTracker from './components/simple-stock-tracker/'

import logo from './assets/orange-wheel-art-800x800.png';

const AppWrapper = styled.div`
  text-align: center;
  margin: 25px;
`;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppLogo = styled.img`
  animation: ${rotate360} infinite 120s linear;
  height: 80px;
  &:hover {
    animation: ${rotate360} infinite 1.5s linear;
  }
`;
const AppHeader = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;
const AppTitle = styled.h1`
  font-size: 1.3em;
`;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppWrapper>
          <AppHeader>
            <Orb />
            <AppLogo src={logo} alt="logo" />
            <AppTitle>Welcome to React</AppTitle>
          </AppHeader>
        </AppWrapper>
        <Header />
        <div>
        <DataProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Homepage" render={props => <QuotesHomepage {...props} />} />
            <Route exact path="/Stocks" component={Stocks} />
            <Route exact path="/StockTracker" component={StockTracker} />
            <Route exact path="/:id" render={props => 
            (<QuotePage symbol={props.match.params.id} {...props} />)}/>
            <Route component={NotFound}        />
            <Route component={NotFoundPage} />
          </Switch>
           </DataProvider> 
        </div>
      </div>
    );
  }
}
