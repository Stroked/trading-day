import React from 'react';
import * as d3 from 'd3';

export default class Graph extends React.Component {
  state = {
    prices: [],
    times: []
  };

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
    var svg = d3.select('svg'),
      margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3
      .line()
      .x(function(d) {
        return x(d['date']);
      })
      .y(function(d) {
        return y(d['close']);
      });

    let area = d3
      .area()
      .x(function(d) {
        return x(d['date']);
      })
      .y0(height)
      .y1(function(d) {
        return y(d['close']);
      });

    x.domain(
      d3.extent(this.props.times, function(data) {
        return data;
      })
    );
    y.domain(
      d3.extent(this.props.prices, function(data) {
        return data;
      })
    );

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    let props = this.props;
    let pastX;

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .select('.domain')
      .remove();

    g.append('path')
      .datum(this.props.d)
      .attr('class', 'area')
      .attr('d', area);

    g.append('path')
      .datum(this.props.d)
      .attr('fill', 'none')
      .attr('stroke', '#043a1b')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    g.append('line')
      .attr('class', 'hover-line')
      .style('stroke', 'white')
      .style('display', 'none')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height);

    g.append('rect')
      .attr('class', 'hover-rect')
      .style('stroke', 'white')
      .style('fill', 'rgba(224, 224, 224, 0.178)')
      .style('display', 'none')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 100)
      .attr('height', height);

    g.append('text')
      .attr('class', 'hover-text')
      .style('stroke', 'white')
      .style('fill', 'rgba(224, 224, 224, 0.178)')
      .style('display', 'none')
      .attr('x', 0)
      .attr('y', 0);

    g.append('text')
      .attr('class', 'hover-difference')
      .style('stroke', 'white')
      .style('fill', 'rgba(224, 224, 224, 0.178)')
      .style('display', 'none')
      .attr('x', 0)
      .attr('y', 0);

    g.append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');

    svg.selectAll('text').attr('fill', 'white');

    svg
      .on('mouseover', function() {
        svg.select('.hover-line').style('display', '');
        svg.select('.hover-text').style('display', '');
      })
      .on('mousemove', function() {
        const xCoordinate = d3.mouse(this)[0];
        const yCoordinate = d3.mouse(this)[1];
        let percentage = Math.trunc(
          ((xCoordinate - margin.left) / width) * 100
        );
        if (percentage > 100) {
          percentage = 100;
        }
        const index = Math.trunc((props.prices.length * percentage) / 100);
        const currentPrice = Math.round(props.prices[index] * 100) / 100;
        if (xCoordinate - margin.left > 0 && xCoordinate - margin.left < 730) {
          svg
            .select('.hover-line')
            .attr('x1', xCoordinate - margin.left)
            .attr('x2', xCoordinate - margin.left);
          svg
            .select('.hover-text')
            .attr('x', xCoordinate - margin.left)
            .attr('y', yCoordinate - margin.top)
            .text('$' + currentPrice);
        }
      })
      .on('mouseout', function() {
        svg.select('.hover-line').style('display', 'none');
        svg.select('.hover-text').style('display', 'none');
      })
      .call(
        d3
          .drag()
          .on('start', function() {
            const xCoordinate = d3.mouse(this)[0];
            const yCoordinate = d3.mouse(this)[1];
            let percentage = Math.trunc(
              ((xCoordinate - margin.left) / width) * 100
            );

            if (percentage > 100) {
              percentage = 100;
            }

            pastX = Math.trunc((props.prices.length * percentage) / 100);

            if (
              xCoordinate - margin.left > 0 &&
              xCoordinate - margin.left < 730
            ) {
              svg.select('.hover-difference').style('display', 'none');
              svg
                .select('.hover-rect')
                .style('display', '')
                .attr('x', xCoordinate - margin.left)
                .attr('width', 0);
            }
          })
          .on('drag', function() {
            const xCoordinate = d3.mouse(this)[0];
            const yCoordinate = d3.mouse(this)[1];
            const x = svg.select('.hover-rect').attr('x');
            const w = Math.abs(x - (xCoordinate - margin.left));
            let percentage = Math.trunc(
              ((xCoordinate - margin.left) / width) * 100
            );
            if (percentage > 100) {
              percentage = 100;
            }
            const index = Math.trunc((props.prices.length * percentage) / 100);
            const diff =
              Math.round((props.prices[index] - props.prices[pastX]) * 100) /
              100;
            if (+w + +x < width) {
              svg.select('.hover-rect').attr('width', w);

              svg
                .select('.hover-difference')
                .style('display', '')
                .attr('x', xCoordinate - margin.left)
                .attr('y', yCoordinate - margin.top)
                .text('$' + diff);
            }
          })
      );
  };

  removeGraph = () => {
    var svg = d3.select('svg'),
      g = svg.select('g');
    g.remove();
  };

  render() {
    return (
      <div className="svg-container">
        <svg
          className="svg-content"
          preserveAspectRatio="xMinYMin meet"
          viewBox="0 0 1200 400"
        />
      </div>
    );
  }
}
