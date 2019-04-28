import React  from "react";
import * as d3 from "d3";
import {  } from "@vx/vx";
// TRADING-DAY COMPONENTS
import {} from "../../MarketData";
import sp500 from "./sp500-constituents-financials.json";

const height = 900,
  width = 1600,
  padding = 5, // separation between same-color circles
  clusterPadding = 50, // separation between different-color circles
  maxRadius = 50,
  sectors = [...new Set(sp500.map(item => item.Sector))],
  clusters = new Array(sectors.length),
  /*FORCE LAYOUT SIMULATION*/
  simulation = d3
    .forceSimulation()
    .force("center", d3.forceCenter(width / 2, height / 2)),
  //.force("charge", d3.forceManyBody().strength(5))
  // .force("collide", d3.forceCollide(d => marketCapScale(d["Market Cap"]))),
  //.alphaDecay(0)
  //.stop()

  /*SCALES*/
  sectorScale = d3
    .scaleOrdinal()
    .domain(sectors)
    .range([...d3.schemeCategory10]),
  marketCapScale = d3
    .scaleLinear()
    .domain(d3.extent(sp500, d => d["Market Cap"]))
    .range([5, maxRadius]);
class MarketForces extends React.Component {
  state = {
    drag: d3.drag(),
    sp500: sp500,
    clusters: sectors,
    svgRef: React.createRef(),
    tooltipRef: React.createRef(),
    nodes: sp500.map(d => {
      // scale radius to fit on the screen
      let scaledRadius = marketCapScale(+d["Market Cap"]),
        forcedCluster = sectors.indexOf(d["Sector"]);

      // add cluster id and radius to array
      d = {
        cluster: forcedCluster,
        r: scaledRadius,
        symbol: d.Symbol,
        sector: d.Sector,
        ...d
      };
      // add to clusters array if it doesn't exist or the radius is larger than another radius in the cluster
      if (!clusters[forcedCluster] || scaledRadius > clusters[forcedCluster].r)
        clusters[forcedCluster] = d;

      return d;
    })
  };
  componentWillMount() {
    simulation.on("tick", this.forceTick);
  }
  componentDidMount() {
    this.container = d3.select(this.state.svgRef.current);
    this.tooltipDiv = d3.select(this.state.tooltipRef.current);

    this.tooltipDiv.attr("class", "tooltip").style("opacity", 0);
    //applyGlowFilter();

    this.renderCircles();
    // console.table(sp500);
    simulation
      .nodes(this.state.nodes)
      .force("collide", this.collide)
      .force("cluster", this.clustering);
  }
  componentDidUpdate() {
    this.renderCircles();
  }
  renderCircles() {
    this.circles = this.container
      .selectAll("circle")
      .data(this.state.nodes, data => data.symbol);

    // exit
    this.circles.exit().remove();
    // enter+update
    this.circles = this.circles
      .enter()
      .append("circle")
      .attr("fill", d => sectorScale(d.Sector))
      //.style("filter", "url(#glow)")
      .attr("opacity", 0.7)
      .merge(this.circles)
      .call(
        this.state.drag
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended)
      )
      .attr("r", d => marketCapScale(d["Market Cap"]))
      .on("mouseover", d => {
        this.tooltipDiv
          .transition()
          .duration(2000)
          .style("opacity", 0.9);
        this.tooltipDiv
          .html("Symbol: " + d.symbol + "<br/>In the sector ")
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", d => {
        console.log("mouseOUT");
        console.log(d);
        this.tooltipDiv
          .transition()
          .duration(5000)
          .style("opacity", 0);
      });
  }
  forceTick = () => {
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  };
  hoverTooltip = () => {
    // this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  };
  // Drag functions used for interactivity
  dragstarted = d => {
    if (!d3.event.active) simulation.alphaTarget(0.3);
    d.fx = d.x;
    d.fy = d.y;
  };
  dragged = d => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };
  dragended = d => {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  };
  clustering = alpha => {
    this.state.nodes.forEach(function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.r + cluster.r;
      if (l !== r) {
        l = ((l - r) / l) * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    });
  };
  collide = alpha => {
    var quadtree = d3
      .quadtree()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(this.state.nodes);

    this.state.nodes.forEach(function(d) {
      var r = d.r + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.data && quad.data !== d) {
          var x = d.x - quad.data.x,
            y = d.y - quad.data.y,
            l = Math.sqrt(x * x + y * y),
            r =
              d.r +
              quad.data.r +
              (d.cluster === quad.data.cluster ? padding : clusterPadding);
          if (l < r) {
            l = ((l - r) / l) * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.data.x += x;
            quad.data.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    });
  };
  applyGlowFilter = () => {
    this.container.append("defs");
    //Code taken from http://stackoverflow.com/questions/9630008/how-can-i-create-a-glow-around-a-rectangle-with-svg
    //Filter for the outside glow
    var filter = this.container.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  };
  getData = async () => {
    const sp500 = await d3.json(
      `https://cors-anywhere.herokuapp.com/datahub.io/core/s-and-p-500-companies-financials/r/constituents-financials.json`
    );

    this.setState({
      data: sp500,
      sectorScale: d3
        .scaleOrdinal()
        .domain([...new Set(sp500.map(item => item.Sector))])
        .range([...d3.schemeCategory10]),
      marketCapScale: d3
        .scaleLinear()
        .domain(d3.extent(sp500, d => d["Market Cap"]))
        .range([1, 50])
    });
  };
  render() {
    return (
      <div>
        <svg ref={this.state.svgRef} width={width} height={height} />
        <div id='tooltip' value='TOOLTIP' ref={this.state.tooltipRef}>
          APPLE
        </div>
      </div>
    );
  }
}

export default MarketForces;
