import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ScrollBasedBezier from "./Header/Curvy";
import RoundButtons from '../coolook/RoundButtons.js';
import {
  Header,
  Segment,
  Rail,
  Label,
} from "semantic-ui-react";
// TRADING-DAY COMPONENTS
import SlideShow from "./Visualizations/SlideShow";
import { DataContext } from "./MarketData";
import Clock from "react-live-clock";
import SearchInput from "./Search/index.js";

const HeaderStyles = styled.div`
  user-select: none;
  @import url(https://fonts.googleapis.com/css?family=Arvo:700);
  @import url(https://fonts.googleapis.com/css?family=Seaweed+Script);
  #title_intro {
    background-color: #222;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
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

  .clock {
  }

  .search {
  }
`;


const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .titleTop {
    color: white;
    background: white;
    font-weight: 500;
    color: #000;
    text-align: center;
    margin: 20;
    text-transform: uppercase;
    letter-spacing: 0.5rem;
  }
  .title {
    color: rgba(255, 255, 255, 1);
    border: 4px double rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
    text-align: center;
    background: #090d00;
    font-size: 6em;
    font: 500 4em/1 "Alfa Slab One", sans-serif;
    letter-spacing: 0;
    padding: 0.25rem 0;
    display: block;
    margin: 0 auto;
    text-shadow: 0 0 80px rgba(255, 255, 255, 0.9);
    width: 100vw;
    background-clip: text;
    backface-visibility: hidden;
  }

  .tradingdayTD {
    font-size: 2em;
  }
`;

export default props => {
  const { fetchingIncidies, indiciesData } = useContext(DataContext);
  const [visible, setVisible] = useState(false);
  const handleSidebarHide = () => setVisible(false);
  return (
    <>
      {/* <StyleWrapper>
        <Segment center inverted color='black'>
          <Header textAlign='center'>
            <Header.Subheader className='titleTop'>
              <Rail
                style={{ pointerEvents: "none" }}
                attached
                internal
                position='right'>
                <Label
                  style={{
                    color: "black",
                    fontWeight: "100",
                    fontSize: "1rem",
                    zIndex: "100"
                  }}>
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={"America/New_York"}
                    interval={1000}
                  />
                </Label>
              </Rail>
              <Rail
                //style={{ margin: "0 20px" }}
                // style={{ pointerEvents: "none" }}
                //attached
                internal
                position='left'>
                <SearchInput />
              </Rail>

              <b>&mdash; The Global Financial Markets &mdash;</b>
            </Header.Subheader>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header.Content className='title' size='huge'>
                
                <span className='tradingdayTD'>T</span>
                rading
                <span className='tradingdayTD'>D</span>
                ay
              </Header.Content>
              <Header.Subheader as='h4' className='titleTop'>
                <b>&mdash; Ajay Phogat &mdash;</b>
              </Header.Subheader>
            </div>
          </Header>
        </Segment>
      </StyleWrapper> */}
      <HeaderStyles className='App'>
        <div
          style={{
       
            textAlign: "center",
            background: "white",
            color: "#000",
            letterSpacing: "0.5rem",
            color: "black",
            fontWeight: "500",
            fontSize: "1.5rem",
            zIndex: "100",
            borderRadius: "0.25em",
            lineHeight: "2rem",
            alignSelf: "center"
          }}
          className='clock'>
          <Clock
            format={"HH:mm:ss"}
            ticking={true}
            timezone={"America/New_York"}
            interval={1000}
          />
        </div>
        <div id='title_intro'>
          <p className='lined'>
            <span>The American Financial Markets</span>
          </p>
          <p className='tradingDay'>
            Trading Day
          </p>
          <p className='lined'>
            <span>by Ajay Phogat</span>
          </p>
          <div
            className='search'
            style={{
              width: "100%"
            }}>
            <SearchInput />
          </div>
        </div>
      </HeaderStyles>

      {/* <ScrollBasedBezier headerHeight={100} /> */}
    </>
  );
};
