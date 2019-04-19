import React, { useState, useEffect } from "react";
import styled from "styled-components";
const RoundButtonStyles = styled.div`

  body {
    background-color: #e6e6e6;
  }

  main {
    max-width: 960px;
    margin: auto;
  }

  svg {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button-test {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  button {
    background-color: #e6e6e6;
    border: none;
    border-radius: 99999px;
    box-shadow: 0px -5px 10px 0px white, 0px 5px 10px 0px rgba(0, 0, 0, 0.15),
      0px 1px 2px 0px rgba(255, 255, 255, 0.5),
      inset 0px 0px 2px 1px rgba(255, 255, 255, 0.25);
    outline: none;
    position: relative;
    transition: all 1s;
    width: 5rem;
    height: 5rem;
    margin: 1rem;
  }

  button:active {
    box-shadow: 0px 2px 2px 0px white, 0px -2px 2px 0px rgba(0, 0, 0, 0.15),
      0px 1px 2px 0px rgba(255, 255, 255, 0.5),
      inset 0px -5px 2px 1px rgba(255, 255, 255, 0.25);
    text-shadow: 0px 2px 2px rgba(255, 255, 255, 0.5);
    transition: all 0.2s;
  }

  .icon {
    fill: rgba(0, 0, 0, 0.75);
    stroke: rgba(0, 0, 0, 0.75);
    stroke-width: 2px;
    transition: all 0.2s;
  }
  .icon circle {
    fill: none;
  }

  button.play.active .icon {
    fill: rgba(6, 250, 14, 0.9);
    stroke: rgba(6, 250, 14, 0.9);
  }
  button.play.active .icon-actual {
    filter: drop-shadow(0px 0px 20px rgba(6, 250, 14, 0.5));
  }

  button.pause.active .icon {
    fill: rgba(252, 145, 4, 0.9);
    stroke: rgba(252, 145, 4, 0.9);
  }
  button.pause.active .icon-actual {
    filter: drop-shadow(0px 0px 20px rgba(252, 145, 4, 0.5));
  }

  button.stop.active .icon {
    fill: rgba(254, 29, 44, 0.9);
    stroke: rgba(254, 29, 44, 0.9);
  }
  button.stop.active .icon-actual {
    filter: drop-shadow(0px 0px 20px rgba(254, 29, 44, 0.5));
  }

  /*circle {
  fill: $base-bg-color;
  filter:
    drop-shadow(0px -10px 20px rgba(255, 255, 255, 1)) 
    drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15)) 
    drop-shadow(0px 2px 4px rgba(255, 255, 255, .5));
  stroke: rgba($white, 1);
  stroke-width: 1px;
  transition: all 1s;
}

button:active circle {
  filter:
    drop-shadow(0 0 2px red);
  stroke: rgba(0,0,0,0);
  transition: all .5s;
}*/
`;

export default function RoundButtons(props) {
  const [active, setActive] = useState(props.default);

  useEffect(() => {
    props.clickEffect(active);
  }, [active]);

  return (
    <RoundButtonStyles className='buttons-container'>
      <main>
        <div className='button-test'>
          <button
            className={`play${active === "play" ? " active" : ""}`}
            onClick={() => setActive("play")}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 400 400'>
              <g class='icon icon-play'>
                <circle
                  class='icon-border'
                  stroke-miterlimit='10'
                  cx='200'
                  cy='200'
                  r='198'
                />
                <polygon
                  class='icon-actual'
                  stroke-miterlimit='10'
                  points='280,200 160,280 160,120'
                />
              </g>
            </svg>
          </button>
          <button
            className={`pause${active === "pause" ? " active" : ""}`}
            onClick={() => setActive("pause")}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 400 400'>
              <g class='icon icon-pause'>
                <circle
                  class='icon-border'
                  stroke-miterlimit='10'
                  cx='200'
                  cy='200'
                  r='198'
                />
                <rect
                  class='icon-actual'
                  x='130'
                  y='120'
                  stroke-miterlimit='10'
                  width='60'
                  height='160'
                />
                <rect
                  class='icon-actual'
                  x='210'
                  y='120'
                  stroke-miterlimit='10'
                  width='60'
                  height='160'
                />
              </g>
            </svg>
          </button>
          <button
            className={`stop${active === "stop" ? " active" : ""}`}
            onClick={() => setActive("stop")}>
            >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 400 400'>
              <g class='icon icon-stop'>
                <circle
                  class='icon-border'
                  stroke-miterlimit='10'
                  cx='200'
                  cy='200'
                  r='198'
                />
                <rect
                  class='icon-actual'
                  x='120'
                  y='120'
                  stroke-miterlimit='10'
                  width='160'
                  height='160'
                />
              </g>
            </svg>
          </button>
        </div>
      </main>
    </RoundButtonStyles>
  );
}