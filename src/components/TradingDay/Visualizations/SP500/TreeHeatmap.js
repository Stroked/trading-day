import React, { Component } from "react";

import { Runtime, Inspector } from "@observablehq/runtime";
import heatMap from "@stroked/market-indexes-s-p500-nasdaq100-dow30";

class MarketHeatmap extends Component {
  heatmapRef = React.createRef();

  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(heatMap, name => {
      if (name === "TreeMap2") {
        return new Inspector(this.heatmapRef.current);
      }
    });
  }

  render() {
    return (
      <div className='marketHeatmap'>
        <div ref={this.heatmapRef} />
      </div>
    );
  }
}
export default MarketHeatmap;
