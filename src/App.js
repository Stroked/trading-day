// react ecosystem
import React from "react";
import styled from "styled-components";
//---------------------------------------------------
import Routes from "./routes";
//---------------------------------------------------
import { DataProvider } from "./components/TradingDay/MarketData";
import WithInstantSearch from "./components/TradingDay/WithInstantSearch";
import Header from "./components/TradingDay/Header";
//---------------------------------------------------
const AppWrapper = styled.div``;
export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
          <DataProvider>
        <WithInstantSearch>
            <Header />
        </WithInstantSearch>
            <Routes />
          </DataProvider>
      </AppWrapper>
    );
  }
}
