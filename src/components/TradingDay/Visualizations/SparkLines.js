import React, { useContext, Component, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientPurpleTeal,
  GradientSteelPurple,
  GradientTealBlue,
  RadialGradient} from '@vx/vx'
import PREMADE_GRADIENTS from "../../../constants/PREMADE_GRADIENTS";



class InteractiveSparkChart extends React.Component {
  state = {
    svgRef: React.createRef(),
    gradient: PREMADE_GRADIENTS[~~(Math.random() * PREMADE_GRADIENTS.length)]      
  };

  renderChart(data) {
                      const formatTime = d3.timeFormat(
                        "%Y-%m-%d %H:%m"
                      );
                      const numberFormat = d3.format(".4");
                      const bisect = d3.bisector(
                        d => d.date
                      );
                      const sparkHeight = 150;
                      
                      const height = sparkHeight;
                      const width = window.innerWidth;
                      const colorKeys = Object.keys(
                        ColorObject
                      );

                      const x = d3
                        .scaleTime()
                        .domain(
                          d3.extent(data.data, d => d.date)
                        )
                        .range([0, width]);

                      const y = d3
                        .scaleLog()
                        .domain(
                          d3.extent(data.data, d => d.value)
                        )
                        .rangeRound([sparkHeight, 0]);

                      const svg = d3
                        .select(this.state.svgRef.current)
                        .attr("width", width)
                        .attr("height", sparkHeight)
                        .datum(data);
                      // svg
                      //   .append("path")
                      //   .attr("stroke", "black")
                      //   .attr("fill", "none")
                      //   .attr("d", line(data.data));

                      svg
                        .append("rect")
                        .attr("width", width)
                        .attr("height", sparkHeight)
                        .attr("stroke", "gray")
                        .attr(
                          "fill",
                          ColorObject[
                            colorKeys[
                              ~~d3.randomUniform(
                                1,
                                colorKeys.length
                              )()
                            ]
                          ]
                        );
                      
                      svg
                        .append("text")
                        .text(d => d.symbol)
                        .attr("x", 0)
                        .attr("y", 0)
                        .attr(
                          "dominant-baseline",
                          "hanging"
                        )
                        .attr("text-anchor", "start")
                        .attr("fill", "black")
                        .attr("stroke", "black")
                        .attr("font-size", "3em")
                        .attr("opacity", 0.5);

                      svg
                        .append("path")
                        .attr("fill", "none")
                        .attr("stroke", "steelblue")
                        .attr("stroke-width", 1.5)
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("d", (d, i) =>
                          d3
                            .line()
                            //.curve(interpolations[interpolationMethod])
                            .defined(d => d.value !== null)
                            .x(d => x(d.date))
                            .y(d => y(d.value))(d.data)
                        );

                      let lookup = new Date(
                        data.data[data.data.length - 1].date
                      );

                      const bar = svg
                        .append("line")
                        .attr(
                          "style",
                          "stroke:#999; stroke-width:0.5; stroke-dasharray: 5 3;"
                        )
                        .attr("y2", sparkHeight)
                        .attr("x1", x(lookup))
                        .attr("x2", x(lookup));

                      const legend = svg
                        .append("text")
                        .style("font", "12px sans-serif")
                        .attr("x", 10)
                        .attr("y", 20);

                      const marker = svg
                        .append("circle")
                        .attr("r", 4)
                        .attr("cx", -100)
                        .attr("fill", "red")
                        .attr("stroke", "red");

                      function update(date) {
                        const i = bisect.right(
                          data.data,
                          date
                        );
                        if (i < data.data.length) {
                          legend
                            .text(
                              `${formatTime(
                                data.data[i].date
                              )}: $${data.data[i].value}`
                            )
                            .attr("x", x(data.data[i].date))
                            .attr(
                              "y",
                              y(data.data[i].value)
                            );
                          marker
                            .attr(
                              "cx",
                              x(data.data[i].date)
                            )
                            .attr(
                              "cy",
                              y(data.data[i].value)
                            );
                        }
                        lookup = new Date(date);
                        bar
                          .attr("x1", x(lookup))
                          .attr("x2", x(lookup));
                      }

                      svg.on(
                        "mousemove click touchmove",
                        function(d) {
                          const m = d3.mouse(this);
                          update(x.invert(m[0]));
                        }
                      );

                      update(lookup);
                    }

  componentDidMount() {
    this.container = d3.select(this.state.svgRef.current);

    this.renderChart(this.props.data);
    // console.table(sp500);
  }

  render() {
    return (
      <div>
        <svg ref={this.state.svgRef}>
          <defs>
            {/* <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0'>
                <stop
                  offset='0%'
                  style='stop-color:hsl(240,100%,50%)";stop-opacity:1'
                />
                <stop
                  offset='100%'
                  style='stop-color:hsl(51,100%,50%);stop-opacity:1'
                />
            </linearGradient> */}
          </defs>
        </svg>
      </div>
    );
  }
}

// https://learnui.design/tools/data-color-picker.html#single
const ColorObject = {
  lightpurple: "#DF7EEF",
  purple: "#C82CE0",
  darkpurple: "#6C0075",

  // https://www.colorbox.io/#steps=4#hue_start=190#hue_end=212#hue_curve=easeInQuad#sat_start=7#sat_end=50#sat_curve=easeOutQuad#sat_rate=200#lum_start=100#lum_end=46#lum_curve=easeOutQuad#minor_steps_map=0
  lightestblue: "#97E6F8",
  lightblue: "#57D0F1",
  blue: "#1288C5",
  darkblue: "#003775",

  // https://coolors.co/ffe066-ffd326-ff9f1b-ff9f1b-f77f00
  yellow: "#FFE066",
  darkyellow: "#ffd326",
  lightorange: "#FF9F1B",
  orange: "#F77F00",

  // https://coolors.co/4d4d68-8d99ae-d2d6d8-e83f6f-ff1554
  lightred: "#E83F6F",
  red: "#FF1554",

  lightgray: "#EDF2F4",
  gray: "#D2D6D8",
  midgray: "#8D99AE",
  darkgray: "#4D4D68",

  // https://coolors.co/2f2f5e-8d99ae-f7fcff-e83f6f-ff1554
  white: "#F7FCFF",
  black: "#2F2F5E",

  green: "#44AF69", // https://coolors.co/0c7c59-44af69-69b578-8fd694-d3edce
  truewhite: "#fff"
};


export default InteractiveSparkChart;