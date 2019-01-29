import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import Header from './components/quote-ninja/Header.js';
import Home from './components/containers/Home.js';
import Stocks from './components/containers/Stocks.js';
import NotFound from './components/containers/NotFound.js';
import Orb from './components/quote-ninja/Orb';
import BitcoinVX from './components/containers/BitcoinVX';
import EthereumVX from './components/containers/EthereumVX';

import logo from './logo.svg';

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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Stocks" component={Stocks} />
            <Route exact path="/Bitcoin" component={BitcoinVX} />
            <Route exact path="/Ethereum" component={EthereumVX} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
