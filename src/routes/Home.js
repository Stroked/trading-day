import React, { useContext, Component, useRef } from "react";
import { DataContext } from "../components/TradingDay/MarketData";
import NewsItems from "../components/TradingDay/News";
import StocksSpotlight from "../components/TradingDay/DailySpotlight";
import TickerScroll from "../components/TradingDay/TickerScroll";
import setTitle from "../utils/title";
import styled from "styled-components";
// import {Runtime, Inspector} from "@observablehq/runtime";
import * as d3 from 'd3'
import InteractiveSparkChart from "../components/TradingDay/Visualizations/SparkLines";

// class ObservableNotebook extends Component {
//   animationRef = React.createRef();

//   componentDidMount() {
//     const runtime = new Runtime();
//     runtime.module(notebook, name => {
//       if (name === "animation") {
//         return new Inspector(this.animationRef.current);
//       }
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <div ref={this.animationRef}></div>
//       </div>
//     );
//   }
// }

// export {ObservableNotebook};

const Markets = props => {
  
  const context = useContext(DataContext);
  setTitle(null, null);
  return (
    <>
      {/* <Header>
        <TickerScroll />
      </Header> */}
      {!context.fetchingIncidies.loading && (
        <React.Fragment>
          {/* <h1 style={{ textAlign:"center", fontWeight: 500, fontSize: "2rem" }}>
            Market Indexes
          </h1> */}
         
          {context.indiciesData.map(each => {
            return (<InteractiveSparkChart
                key={each.symbol + Math.random(0, 1)}
                data={each}
              />
            );
          })
          }
          {/* <NewsItems news={context.indiciesData} slice={10} /> */}
        </React.Fragment>
      )}

      <StocksSpotlight />
    </>
  );
};

export default Markets;
