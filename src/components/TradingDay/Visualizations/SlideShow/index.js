import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import _ from "lodash";
import { Segment } from "semantic-ui-react";
import {
  Bar,
  withParentSize,
  GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientPurpleTeal,
  GradientSteelPurple,
  GradientTealBlue,
  RadialGradient
} from "@vx/vx";
import PREMADE_GRADIENTS from "../../../../constants/PREMADE_GRADIENTS";
const width = document.documentElement.clientWidth,
  height = '100%',
  margin = { top: 1, bottom: 1, left: 1, right: 1 },
  fisheyeScale = scaleType => d3_fisheye_scale(scaleType(), 3, 0),
  xSteps = d3.range(0, width, width / 15);

const StyleWrapper = styled.div`
  margin-top: ${margin.top};
  margin-bottom: ${margin.bottom};
  margin-left: ${margin.left};
  margin-right: ${margin.right};
  padding: 0;
  svg {
    margin: 0;
    border: 5px solid black;
  }
  line {
    pointer-events: none;
  }
  svg text {
    pointer-events: none;
  }
  rect {
    pointer-events: none;
  }
`;
class FisheyeSlideshow extends React.Component {
  state = {
    svgRef: React.createRef(),
    xSteps: d3.range(0, width, width / 15),
    xFisheye: fisheyeScale(d3.scaleIdentity)
      .domain([0, width])
      .focus(width / 2),
    yFisheye: d3.scaleLinear().domain([0, height]),
    regularScale: d3
      .scaleIdentity()
      .domain(xSteps)
      .range(0, width)
  };

  componentDidMount() {
    this.svg = d3
      .select(this.state.svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .on("mousemove", this.handleMouseMove)
      .on("mouseout", this.disableFishlens);
    this.renderSlideDeck();
  }

  disableFishlens = () => {
    this.xLine
      .transition()
      .duration(1000)
      .attr("x1", this.state.regularScale.invert)
      .attr("x2", this.state.regularScale.invert);
    this.textLabels
      .transition()
      .duration(1000)
      .text(d => this.state.regularScale(d).toFixed(2))
      .attr("x", this.state.regularScale.invert);
    this.gradients
      .transition()
      .duration(1000)
      .attr("x", this.state.regularScale.invert)
      .attr("width", (d, i) =>
        this.calculateWidth(d, i, this.state.regularScale)
      );
  };

  renderSlideDeck = () => {
    this.slides = this.svg.append("g");
    // .attr("transform", `translate(${margin.left},${margin.top})`);
    let bars = this.slides
      .selectAll("rect")
      .data(this.state.xSteps)
      .join("rect");
    this.gradients = bars
      .attr("fill", function(d, i) {
        return `url(#${
          PREMADE_GRADIENTS[~~(Math.random() * PREMADE_GRADIENTS.length)]
        })`;
      })
      .attr("x", this.state.regularScale.invert)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", (d, i) =>
        this.calculateWidth(d, i, this.state.regularScale)
      );
    this.xLine = this.slides
      .selectAll(".x")
      .data(this.state.xSteps)
      .join("line")
      .style("stroke", "#000")
      .attr("x1", this.state.regularScale)
      .attr("x2", this.state.regularScale)

      .attr("y2", height);

    let text = this.slides
      .selectAll("text")
      .data(this.state.xSteps)
      .join("text");
    this.textLabels = text
      .attr("x", this.state.regularScale)
      .attr("y", height / 2)
      .text(d => this.state.regularScale(d).toFixed(2))

      .attr("font-size", "20px")
      .attr("fill", "red");
  };

  handleMouseMove = () => {
    const mouse = d3.clientPoint(d3.event.target, d3.event);

    this.state.xFisheye.focus(mouse[0]);
    this.state.yFisheye(mouse[1]);
    this.xLine.attr("x1", this.state.xFisheye).attr("x2", this.state.xFisheye);
    this.textLabels
      .text(d => this.state.xFisheye(d).toFixed(2))
      .attr("x", this.state.xFisheye);

    this.gradients
      .attr("x", this.state.xFisheye)
      .attr("width", (d, i) => this.calculateWidth(d, i, this.state.xFisheye));
  };
  calculateWidth = (d, i, scale) => {
    let x1 = scale(xSteps[i + 1]);
    if (!x1) x1 = width;
    return x1 - scale(d);
  };
  render() {
    return (
      <StyleWrapper className='container'>
        <svg ref={this.state.svgRef} width={width} height={height}>
          <defs>
            <GradientDarkgreenGreen id='DarkgreenGreen' />
            <GradientLightgreenGreen id='LightgreenGreen' />
            <GradientOrangeRed id='OrangeRed' />
            <GradientPinkBlue id='PinkBlue' />
            <GradientPinkRed id='PinkRed' vertical={false} />
            <GradientPurpleOrange id='PurpleOrange' vertical={false} />
            <GradientPurpleRed id='PurpleRed' vertical={false} />
            <RadialGradient from='#55bdd5' to='#4f3681' id='Radial' r={"80%"} />
            <GradientSteelPurple id='SteelPurple' vertical={false} />
            <GradientTealBlue id='TealBlue' vertical={false} />
          </defs>
        </svg>
      </StyleWrapper>
    );
  }
}

const d3_fisheye_scale = (scale, d, a) => {
  function fisheye(_) {
    var x = scale(_),
      left = x < a,
      range = d3.extent(scale.range()),
      min = range[0],
      max = range[1],
      m = left ? a - min : max - a;
    if (m == 0) m = max - min;
    return ((left ? -1 : 1) * m * (d + 1)) / (d + m / Math.abs(x - a)) + a;
  }

  fisheye.distortion = function(_) {
    if (!arguments.length) return d;
    d = +_;
    return fisheye;
  };

  fisheye.focus = function(_) {
    if (!arguments.length) return a;
    a = +_;
    return fisheye;
  };

  fisheye.copy = function() {
    return d3_fisheye_scale(scale.copy(), d, a);
  };

  // fisheye.nice = scale.nice;
  // fisheye.ticks = scale.ticks;
  // fisheye.tickFormat = scale.tickFormat;
  return rebind(fisheye, scale, "domain", "range");
};

const rebind = function(target, source) {
  var i = 1,
    n = arguments.length,
    method;
  while (++i < n)
    target[(method = arguments[i])] = d3_rebind(target, source, source[method]);
  return target;
};

const d3_rebind = (target, source, method) => {
  return function() {
    var value = method.apply(source, arguments);
    return value === source ? target : value;
  };
};

export default FisheyeSlideshow;
