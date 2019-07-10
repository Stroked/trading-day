import React from "react";
import styled from "styled-components";
// TRADING-DAY COMPONENTS
import Clock from "react-live-clock";
import SearchInput from "./Search/index.js";

const HeaderStyles = styled.div`
  user-select: none;
  @import url(https://fonts.googleapis.com/css?family=Arvo:700);
  @import url(https://fonts.googleapis.com/css?family=Seaweed+Script);

  #titling {
    background-color: #222;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }

  .clock {
    text-align: center;
    background: white;
    color: #000;
    letter-spacing: 0.5rem;
    color: black;
    font-weight: 500;
    font-size: 1.5rem;
    border-radius: 0.25em;
    line-height: 2rem;
    align-self: center;
  }

  .tradingDay {
    font-size: 5rem;
    color: #fff;
    font-family: Arvo;
    font-weight: bold;
    text-shadow: -3px -3px 0 #222, 3px -3px 0 #222, -3px 3px 0 #222,
      3px 3px 0 #222, 4px 4px 0 #fff, 5px 5px 0 #fff, 6px 6px 0 #fff,
      7px 7px 0 #fff;
    letter-spacing: 0.1em;
    margin: 0;
    margin-top: -0.2em;
    margin-bottom: 0.2em;
    text-align: center;
    line-height: 1em;
  }

  .lined span {
    background-color: #222;
    padding: 0 0.3em;
    display: inline-block;
    position: relative;
    font-family: "Seaweed Script";
    color: #fff;
    text-align: center;
    font-size: 2.5rem;
    margin: 0;
    line-height: 1em;
  }
  .lined span:before,
  .lined span:after {
    content: "";
    position: absolute;
    height: 0.5em;
    border-bottom: 10px solid white;
    top: 0;
    width: 100vw;
  }
  .lined span:before {
    right: 100%;
    margin-right: 15px;
  }
  .lined span:after {
    left: 100%;
    margin-left: 15px;
  }

  .search {
    width: 100%;
  }
`;

export default Header => {
  return (
    <HeaderStyles>
      <div className='clock'>
        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"America/New_York"}
          interval={1000}
        />
      </div>
      <div id='titling'>
        <p className='lined'>
          <span>The American Financial Markets</span>
        </p>
        <p className='tradingDay'>Trading Day</p>
        <p className='lined'>
          <span>by Ajay Phogat</span>
        </p>
        <div className='search'>
          <SearchInput />
        </div>
      </div>
    </HeaderStyles>
  );
};
