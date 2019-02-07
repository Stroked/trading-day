import React from 'react';
import * as d3 from 'd3';

export default class StackedBarGraph extends React.Component {
  componentDidMount() {
    this.createBarGraph();
  }

  createBarGraph = () => {
    var svg = d3.select('.' + this.props.name + ' ' + ' svg');
    var margin = { top: 20, right: 20, bottom: 20, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    var x0 = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);
    var x1 = d3.scaleBand().padding(0.05);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    var z = d3.scaleOrdinal().range(['#3066BE', '#AEECEF', '#119DA4']);
    var keys = ['tapeA', 'tapeB', 'tapeC'];
    x0.domain(
      this.props.d.map(function(d) {
        return d['mic'];
      })
    );
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([
      0,
      d3.max(this.props.d, function(d) {
        return d3.max(keys, function(key) {
          return +d[key];
        });
      })
    ]).nice();

    g.append('g')
      .selectAll('g')
      .data(this.props.d)
      .enter()
      .append('g')
      .attr('transform', function(d) {
        return 'translate(' + x0(d['mic']) + ',0)';
      })
      .selectAll('rect')
      .data(function(d) {
        return keys.map(function(key) {
          return { key: key, value: +d[key] };
        });
      })
      .enter()
      .append('rect')
      .attr('x', function(d) {
        return x1(d.key);
      })
      .attr('y', function(d) {
        return y(d.value);
      })
      .attr('width', x1.bandwidth())
      .attr('height', function(d) {
        return height - y(d.value);
      })
      .attr('fill', function(d) {
        return z(d.key);
      });

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0));

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, '.2s'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', 'white')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Stocks Sold');

    var legend = g
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice())
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')';
      });

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z);

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(function(d) {
        return d;
      });

    g.append('text')
      .attr('class', 'hover-text')
      .style('stroke', 'black')
      .style('display', 'none')
      .attr('x', 0)
      .attr('y', 0);

    // SVG select all rectangles and mouseover.
    svg.on('mousemove', function() {
      const xCoordinate = d3.mouse(this)[0];
      const yCoordinate = d3.mouse(this)[1];
      svg
        .selectAll('rect')
        .on('mousemove', function(d) {
          svg.select('.hover-text').style('display', '');
          svg
            .select('.hover-text')
            .attr('x', xCoordinate - margin.left)
            .attr('y', yCoordinate - margin.top)
            .text(d.value);
        })
        .on('mouseout', function(d) {
          svg.select('.hover-text').style('display', 'none');
        });
    });
  };

  render() {
    return (
      <div className={'svg-container-sbg ' + this.props.name}>
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 350" />
      </div>
    );
  }
}
