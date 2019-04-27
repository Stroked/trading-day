// react ecosystem
import React from "react";
import styled from "styled-components";
//---------------------------------------------------
import Routes from "./routes";
//---------------------------------------------------
import { DataProvider } from "./components/TradingDay/WithDataContext";
import WithInstantSearch from "./components/TradingDay/WithInstantSearch";
import SearchInput from "./components/TradingDay/Search";
import Header from "./components/TradingDay/Header";
//---------------------------------------------------
const AppWrapper = styled.div``;
export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <WithInstantSearch>
          <DataProvider>
            <SearchInput />
            <Header />
            <Routes />
          </DataProvider>
        </WithInstantSearch>
      </AppWrapper>
    );
  }
}
