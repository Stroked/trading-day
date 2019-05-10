import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { event as currentEvent } from "d3-selection";
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
const margin = { top: 0, bottom: 0, left: 0, right: 0 },
  fisheyeScale = scaleType => d3_fisheye_scale(scaleType(), 3, 0);

const StyleWrapper = styled.div`

  margin-top: ${margin.top};
  margin-bottom: ${margin.bottom};
  margin-left: ${margin.left};
  margin-right: ${margin.right}; 
  padding: 0;   
   border: 5px solid black;

  line {
    pointer-events: none;
  }
  svg text {
    pointer-events: none;
  }
  rect {
    margin-left: ${margin.left};
    margin-right: ${margin.right};
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-before: 0;
    -webkit-padding-after: 0;
    pointer-events: none;
  }
`;
const xSteps = (width, length) => d3.range(0, width, width / length);
class FisheyeSlideshow extends React.Component {
  state = {
    svgRef: React.createRef(),
    xSteps: xSteps(this.props.width, 15),
    xFisheye: fisheyeScale(d3.scaleIdentity)
      .domain([0, this.props.width])
      .focus(this.props.width / 2),
    yFisheye: d3.scaleLinear().domain([0, this.props.height]),
    regularScale: d3.scaleIdentity().range(0, this.props.width)
  };
  componentWillMount() {
    this.state.regularScale.domain(this.state.xSteps);
  }
  componentDidMount() {
    this.svg = d3
      .select(this.state.svgRef.current)
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      // .on("mouseover", () => {
      //   this.xLine.transition(d3.easeLinear).duration(200);
      //   this.textLabels.transition(d3.easeLinear).duration(200);
      //   this.gradients.transition(d3.easeLinear).duration(200);
      // })
      .on("touchmove", () => this.handleMove(this.getTouchPoint()))
      //.on("touchmove", this.getTouchPoints)
      .on("mouseout touchend", this.disableFishlens)
      .on("mouseenter", () => {
        this.xLine
          .interrupt()
        this.textLabels
          .interrupt()

        this.gradients
          .interrupt()
      })
      .on("mousemove", () => this.handleMove(this.getMousePoint()));
    this.renderSlideDeck();
  }

  disableFishlens = () => {
    
    this.xLine
      // .on("mouseenter", () => {
      //   this.xLine.interrupt();
      //   this.handleMove(this.getMousePoint());
      //   console.log(this);
      //   debugger;
      // })
      .transition()
      .duration(1000)
      .attr("x1", this.state.regularScale.invert)
      .attr("x2", this.state.regularScale.invert);
    this.textLabels
      // .on("mouseenter", ()=> {
      //  // this.textLabels.interrupt();
      //    this.textLabels.interrupt();
      //  this.handleMove(
      //                            this.getMousePoint()
      //                          );
      // })
      .transition()
      .duration(1000)

      .text(d => this.state.regularScale(d).toFixed(2))
      .attr("x", this.state.regularScale.invert);
    this.gradients
      //   .on("mouseenter", () => {
      //  // this.gradients.interrupt();
      //   this.gradients.interrupt(); this.handleMove(
      //                           this.getMousePoint()
      //                         );

      //   })
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
      .attr("height", this.props.height)
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

      .attr("y2", this.props.height);

    let text = this.slides
      .selectAll("text")
      .data(this.state.xSteps)
      .join("text");
    this.textLabels = text
      .attr("x", this.state.regularScale)
      .attr("y", this.props.height / 2)
      .text(d => this.state.regularScale(d).toFixed(2))

      .attr("font-size", "20px")
      .attr("fill", "red");
  };

  getTouchPoint = () => d3.touches(this.state.svgRef.current)[0];
  getMousePoint = () => d3.clientPoint(d3.event.target, d3.event);
  handleMove = mouse => {
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
    let x1 = scale(this.state.xSteps[i + 1]);
    if (!x1) x1 = this.props.width;
    return x1 - scale(d);
  };
  render() {
    return (
      <StyleWrapper className='container'>
        <svg
          ref={this.state.svgRef}
          width={this.props.width}
          height={this.props.height}>
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
