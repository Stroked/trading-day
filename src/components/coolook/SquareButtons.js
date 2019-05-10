import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const StylesWrapper = styled.div`
  width: 22.5em;
  height: 4.25em;
  border-radius: 0.25em;
  background: #c4cac8;
  box-shadow: 0 -1px 0.3em rgba(0, 0, 34, 0.2) inset,
    0 -1px 1px rgba(0, 0, 34, 0.03) inset, 2px 2px 3px rgba(0, 0, 34, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  .mm-item {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-width: 0;
    box-sizing: border-box;
    display: block;
    position: relative;
    top: -0.25em;
    width: 4.5em;
    height: 4.5em;
    text-decoration: none;
    border-radius: 0.15em;
    transition: 250ms;
    background: linear-gradient(#f6f7f9, #d6d8dc) 0 50%;
    background-size: 100% 200%;
  }

  .mm-item:hover {
    top: -0.35em;
    background-position: 0 0%;
  }
  .mm-item:focus,
  .mm-item:active,
  .active {
    background: linear-gradient(#f6f7f9, rgba(255, 255, 255, 0.15)) 0 50%;

    outline: none;
    top: -0.15em;
  }
  .mm-item,
  .mm-item:first-of-type:focus,
  .mm-item:first-of-type:active,
  .mm-item:hover:focus + .mm-item,
  .mm-item:hover:active + .mm-item,
  .mm-item + .active {
    box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.15) inset,
      0 0 0 0 transparent inset,
      0.2em 0.2em 0.3em -0.07em rgba(255, 255, 255, 0.6) inset,
      -0.2em -0.3em 0.3em -0.07em rgba(0, 0, 0, 0.08) inset;
  }

  .mm-item:hover + .mm-item,
  .mm-item:focus,
  .mm-item:active,
  .mm-item + .active {
    box-shadow: 0 0.3em 0.3em -0.2em rgba(255, 255, 255, 0.6) inset,
      1px 0 0 0 rgba(0, 0, 0, 0.02) inset,
      0.35em 0 0.3em -0.2em rgba(0, 0, 34, 0.07) inset,
      -0.2em -0.3em 0.3em -0.07em rgba(0, 0, 0, 0.08) inset;
  }
  .mm-item:hover + .mm-item:focus,
  .mm-item + .active {
    box-shadow: 0 0.3em 0.3em -0.2em rgba(255, 255, 255, 0.6) inset,
      1px 0 0 0 rgba(0, 0, 0, 0.01) inset,
      0.45em 0 0.3em -0.2em rgba(0, 0, 34, 0.09) inset,
      -0.2em -0.3em 0.3em -0.07em rgba(0, 0, 0, 0.08) inset;
  }
`;

export default function SquareButtons(props) {
  const [active, setActive] = useState("1Y");

  // useEffect(() => {
  //   props.clickEffect(active);
  // }, [active]);

  return (
    <StylesWrapper>
      {props.timeRangeArray.map(period => {
        return (
          <button
            id={period}
            onClick={(e) => {e.preventDefault();setActive(period);}}
            className={`mm-item ${active === period ? " active" : ''}`}
            
            >
            {period}
          </button>
        );
      })}
    </StylesWrapper>
  );
}
