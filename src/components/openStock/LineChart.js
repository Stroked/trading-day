import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as d3 from "d3";
import _ from "lodash";
// !VX
import { Bar, RadialGradient } from "@vx/vx";
const width = 400;
const height = 300;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const red = "#eb6a5b";
const blue = "#52b6ca";
let timeParser = d3.timeParse("%Y%m%d%H:%M");
class LineChart extends Component {
  state = {
    xAxisRef: React.createRef(),
    yAxisRef: React.createRef(),

    highs: null, // svg path command for all the high temps
    lows: null, // svg path command for low temps,
    // d3 helpers
    xScale: d3.scaleTime().range([margin.left, width - margin.right]),
    yScale: d3.scaleLinear().range([height - margin.bottom, margin.top]),
    lineGenerator: d3.line()
  };

  xAxis = d3
    .axisBottom()
    .scale(this.state.xScale)
    .ticks(5, "%H:%M");
  yAxis = d3
    .axisLeft()
    .scale(this.state.yScale)
    .ticks(5, "$,.2f");

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data) return null; // data hasn't been loaded yet so do nothing
    const { data } = nextProps;
    const { xScale, yScale, lineGenerator } = prevState;
    const qualifiedData = _.filter(data, values => values.average > 0);

    // data has changed, so recalculate scale domains
    const timeDomain = d3.extent(qualifiedData, d =>
      timeParser(d["date"] + d["minute"])
    );
    xScale.domain(timeDomain);
    yScale.domain(d3.extent(qualifiedData, d => +d.average));

    // calculate line for lows
    lineGenerator.x(d => xScale(timeParser(d["date"] + d["minute"])));
    // lineGenerator.y(d => yScale(+d.low));
    // const lows = lineGenerator(data);
    // and then highs
    lineGenerator.y(d => yScale(+d.average));
    const highs = lineGenerator(qualifiedData);

    return { highs };
  }

  componentDidUpdate() {
    d3.select(this.state.xAxisRef.current).call(this.xAxis);
    d3.select(this.state.yAxisRef.current).call(this.yAxis);
  }

  render() {
    let latestPrice = Math.round(this.props.latestPrice * 100) / 100;
    let changePercent = Math.round(this.props.changePercent * 10000) / 100;
    const { highs } = this.state;
    console.log(highs);
    return (
      <Link
        to={"/Stocks?symbol=" + this.props.name}
        className={this.props.name}
        onClick={window.scrollTo(0, 0)}>
        <h2> {this.props.companyName} </h2>
        <p className='tiny gray'> 24h </p>
        <svg width={width} height={height}>
          <path d={highs} fill='none' stroke='green' strokeWidth='2' />
          {/* <path d={lows} fill='none' stroke={red} strokeWidth='2' /> */}
          <g>
            <g
              ref={this.state.xAxisRef}
              transform={`translate(0, ${height - margin.bottom})`}
            />
            <g
              ref={this.state.yAxisRef}
              transform={`translate(${margin.left}, 0)`}
            />
          </g>
        </svg>
        <span className='small left'> ${latestPrice} </span>
        {changePercent >= 0 ? (
          <span className='small right green'> +{changePercent}% </span>
        ) : (
          <span className='small right red'> {changePercent}% </span>
        )}
      </Link>
    );
  }
}

export default LineChart;
