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
      <StyleWrapper>
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
                {/* <img src='./../../assets/orange-wheel-art-800x800.png' style={{left:0, height:50, width:50}}></img> */}
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
      </StyleWrapper>
      <SlideShow height={window.innerHeight / 5} width={window.innerWidth} />
      <RoundButtons></RoundButtons>
      {/* <ScrollBasedBezier headerHeight={100} /> */}
    </>
  );
};
