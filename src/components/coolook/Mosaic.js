import * as d3 from "d3";
import React, { Component } from "react";
import PoissonDiscSampler from '../../utils/PoissonDiscSampler'
const color = (d, width, height) => {
  var dx = d[0] - width / 2,
    dy = d[1] - height / 2;
  return d3.lab(100 - (dx * dx + dy * dy) / 8000, dx / 15, dy / 15);
};


export default class Mosaic extends Component {
  constructor(props) {
    super(props);

    const height = window.innerHeight;
    const width = window.innerWidth;
    var sampler = PoissonDiscSampler(width, height, 100),
      samples = [],
      sample;

    while ((sample = sampler())) samples.push(sample);

    this.state = {
      voronoi: d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]),
      height: window.innerHeight,
      width: window.innerWidth
    };

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll("path")
      .data(this.state.voronoi.polygons(samples))
      .enter()
      .append("path")
      .attr("d", d => {
        return "M" + d.join("L") + "Z";
      })
      .style("fill", d => {
        return color(d.data, width, height);
      })
      .style("stroke", d => {
        return color(d.data, width, height);
      });
  }

  componentDidMount() {}

  render() {
    return <div>{this.state.voronoi}</div>;
  }
}
