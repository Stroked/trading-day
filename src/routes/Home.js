import React, { useContext, Component } from "react";
import { DataContext } from "../components/TradingDay/MarketData";
import NewsItems from "../components/TradingDay/News";
import StocksSpotlight from "../components/TradingDay/DailySpotlight";
import TickerScroll from "../components/TradingDay/TickerScroll";
import setTitle from "../utils/title";
import styled from "styled-components";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "@jashkenas/how-to-embed-a-notebook-in-a-react-app";

class ObservableNotebook extends Component {
  animationRef = React.createRef();

  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "animation") {
        return new Inspector(this.animationRef.current);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div ref={this.animationRef}></div>
      </div>
    );
  }
}

export {ObservableNotebook};

const Markets = props => {
  const context = useContext(DataContext);
  setTitle(null, null);
  return (
    <>
      {/* <Header>
        <TickerScroll />
      </Header> */}

      <StocksSpotlight />
      {!context.fetchingIncidies.loading && (
        <React.Fragment>
          <h1 style={{ fontWeight: 300, fontSize: "2rem" }}>
            Latest Headlines
          </h1>
          <NewsItems news={context.indiciesData.news} slice={10} />
        </React.Fragment>
      )}
    </>
  );
};

export default Markets;
