import React, {Component} from 'react';

import { Runtime, Inspector } from "@observablehq/runtime";
import circlePack from "@stroked/major-indexes-angry-bird-edition";
import styled from 'styled-components'
const circlePackStyles = styled.svg`
  .titles {
    width: 100%;
    line-height: 1;
    text-transform: uppercase;
    font-family: "screentyperegular", Georgia, "Times New Roman", Times, serif;
    fill: url(#sanbornHatch);
    stroke: black;
    stroke-width: 1;
    filter: url(#dropshadow);
  }
`;

class MajorIndexesCirclePack extends Component {
  circlePackRef = React.createRef();

  componentDidMount() {
    const runtime = new Runtime();
    runtime.module(circlePack, name => {
      if (name === "InteractiveCirclePack") {
        return new Inspector(this.circlePackRef.current);
      }
    });
  }

  render() {
    return (
      <circlePackStyles
        ref={this.circlePackRef}
        height={window.innerHeight}
        width={window.innerWidth}>
        <defs>
          <pattern
            id='sanbornHatch'
            width='4'
            height='4'
            patternTransform='rotate(45 0 0)'
            patternUnits='userSpaceOnUse'>
            <line
              x1='0'
              y1='0'
              x2='0'
              y2='4'
              style={{ stroke: "black", strokeWidth: 1, fill: "black" }}
            />
          </pattern>
          <filter id='dropshadow' height='130%'>
            <feGaussianBlur in='SourceAlpha' stdDeviation='3' />
            <feOffset dx='10' dy='10' result='offsetblur' />
            <feMerge>
              <feMergeNode /> <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
      </circlePackStyles>
    );
  }
}

export default MajorIndexesCirclePack