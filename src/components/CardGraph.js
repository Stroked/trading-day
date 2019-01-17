import React from 'react';
import * as d3 from 'd3';

import { Link } from 'react-router-dom';

export default class CardGraph extends React.Component {
  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps != this.props) {
      this.removeGraph();
      this.createGraph();
    }
  }

  // Fetches url and gets information from the url.
  createGraph = () => {
    // Parse and edit.
    let timeParser = d3.timeParse('%Y%m%d%H:%M');
    let d = this.props.d;
    let times = [];
    let prices = [];

    for (let i = 0; i < d.length; i++) {
      if (d[i]['marketNumberOfTrades'] == 0 || d[i]['marketAverage'] == -1) {
        d.splice(i, 1);
        i--;
        continue;
      }

      d[i]['close'] = d[i]['marketAverage'];
      d[i]['date'] = timeParser(d[i]['date'] + d[i]['minute']);
      times.push(d[i]['date']);
      prices.push(d[i]['close']);
    }

    var svg = d3.select('.' + this.props.name + ' svg'),
      margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = this.props.width - margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(
      d3.extent(times, function(data) {
        return data;
      })
    );
    y.domain(
      d3.extent(prices, function(data) {
        return data;
      })
    );

    let line = d3
      .line()
      .x(function(d) {
        return x(d['date']);
      })
      .y(function(d) {
        return y(d['close']);
      });

    if (this.props.changePercent >= 0) {
      g.append('path')
        .datum(d)
        .attr('fill', 'none')
        .attr('stroke', 'rgb(33, 192, 33)')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    } else {
      g.append('path')
        .datum(d)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line);
    }
  };

  removeGraph = () => {
    var svg = d3.select('.' + this.props.name + ' svg'),
      g = svg.select('g');
    g.remove();
  };

  render() {
    let latestPrice = Math.round(this.props.latestPrice * 100) / 100;
    let changePercent = Math.round(this.props.changePercent * 10000) / 100;

    return (
      <Link
        to={'/Stocks?symbol=' + this.props.name}
        className={this.props.name}
        onClick={window.scrollTo(0, 0)}
      >
        <h2> {this.props.companyName} </h2>
        <p className="tiny gray"> 24h </p>
        <svg
          viewBox={'0 0 ' + this.props.width + ' ' + this.props.height}
          preserveAspectRatio="xMinYMin meet"
        />
        <span className="small left"> ${latestPrice} </span>
        {changePercent >= 0 ? (
          <span className="small right green"> +{changePercent}% </span>
        ) : (
          <span className="small right red"> {changePercent}% </span>
        )}
      </Link>
    );
  }
}
