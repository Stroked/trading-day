import React, { Component } from 'react';
import styled from 'styled-components';

const KnobInset = styled.div`
  position: block;
  top: 50%;
  left: 50%;
  margin: -5.5em auto;
  border-radius: 50%;
  width: 11em;
  height: 11em;
  background: linear-gradient(#d6d6d6, #f5f5f5);
`;

const Knob = styled.div`
  position: relative;
  width: 10em;
  height: 10em;
  top: 0.5em;
  left: 0.5em;
  cursor: pointer;
  transition: 1000ms ease-in-out;
  
  border-radius: 50%;
  animation: knob-spin infinite 60s linear;
  background: linear-gradient(
    90deg,
    #d4cfc3 10%,
    #bab19e 40.8%,
    #cfc9bc 42%,
    #cfc9bc 58%,
    #ebe8e3 59.2%,
    #d4cfc3 90%
  );
  box-shadow: 0 0.1em 0.2em 0 rgba(235, 232, 227, 0.9) inset,
    0 -0.1em 0.3em 0 rgba(235, 232, 227, 0.3) inset,
    0 0.08em 0.3em 0 rgba(0, 0, 17, 0.3),
    0.5em 0 1em 0 rgba(235, 232, 227, 0.5) inset,
    -0.5em 0 1em 0 rgba(186, 177, 158, 0.3) inset,
    0 4em 1em -3.5em rgba(0, 0, 34, 0.3);

  ::before {
    position: absolute;
    content: '';
    left: 4.86em;
    width: 0.3em;
    height: 1.7em;
    border-radius: 0 0 0.2em 0.2em;
    background: #b44;
    box-shadow: -0.05em 0 0.1em 0 #ebe8e3,
      -0.05em 0 0.1em 0 rgba(0, 0, 0, 0.4) inset;
  }
  :hover {
    transform: rotate(90deg);
  }
  @keyframes knob-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default class ControlKnob extends Component {
  render() {
    return (
      <KnobInset>
        <Knob />
      </KnobInset>
    );
  }
}
