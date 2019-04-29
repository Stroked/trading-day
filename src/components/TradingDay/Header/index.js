import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import {
  Header,
  Segment,
  Rail,
  Label,
  Sidebar,
  Menu,
  Icon
} from "semantic-ui-react";
// TRADING-DAY COMPONENTS
import SlideShow from "../Visualizations/SlideShow";
import { DataContext } from "../MarketData";
import Clock from "react-live-clock";
import SearchInput from "../Search";
const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: "100%";
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  Segment {
    width: 100vw;
  }

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
    <Sidebar.Pushable as={Segment}>
      <StyleWrapper>
        <Segment center inverted color='black'>
          <Header textAlign='center'>
            <Header.Subheader className='titleTop'>
              <Rail
                style={{ pointerEvents: "none" }}
                compact
                attached
                internal
                position='left'>
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

              <b>&mdash; The Global Financial Markets &mdash;</b>
            </Header.Subheader>
             <SlideShow height='200' width='900'/>
            <Sidebar
            
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              //onHide={handleSidebarHide}
              vertical
              visible={visible}
              width='thin'>
              <Menu.Item as='a'>
                <Icon name='' />
                Home
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='' />
                Games
              </Menu.Item>
              <Menu.Item>
                <Link to='/sp500'>S&P 500</Link>
              </Menu.Item>
            </Sidebar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Header.Content className='title' size='huge'>
                <span
                  onClick={() => setVisible(true)}
                  className='tradingdayTD'>
                  T
                </span>
                rading
                <span onClick={handleSidebarHide} className='tradingdayTD'>
                  D
                </span>
                ay
              </Header.Content>

              <SearchInput />
            </div>
            <SlideShow height='200' width='900'>
       
            </SlideShow>
            <Header.Subheader as='h4' className='titleTop'>
              <b>&mdash; Ajay Phogat &mdash;</b>
            </Header.Subheader>
          </Header>
        </Segment>
      </StyleWrapper>
    </Sidebar.Pushable>
  );
};
