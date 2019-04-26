import React from "react";
import styled from "styled-components";
import RoundButtons from '../coolook/RoundButtons'
import { Header, Segment, Container } from "semantic-ui-react";
import SlideShow from './Visualizations/SlideShow/';


const TradingDayStyles = styled.div`
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
    width:100vh;
  }
  
  .titleTop {
    color: white;
    background: white;
    font-size: 50rem;
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
    font: 700 4em/1 "Alfa Slab One", sans-serif;
    letter-spacing: 0;
    padding: 0.25rem 0;
    display: block;
    margin: 0 auto;
    text-shadow: 0 0 80px rgba(255, 255, 255, 0.9);
    width: 100vw;
    /* Clip Background Image */

    /*background: url(http://f.cl.ly/items/010q3E1u3p2Q0j1L1S1o/animated_text_fill.png)
      repeat-x;*/
    background-clip: text;

    /* Animate Background Image */

    animation: aitf 80s linear infinite;

    /* Activate hardware acceleration for smoother animations */

    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  /* Animate Background Image */

  @keyframes aitf {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`

const TradingDayHeader = () => {
  return (
  
      <TradingDayStyles>
        <Segment center inverted color='black'>

          <Header textAlign='center'>
            <Header.Subheader className='titleTop'>
              <b>&mdash; The Global Financial Markets &mdash;</b>
            </Header.Subheader>
              <Header.Content  className='title' size='huge'>
            <Segment>

               <SlideShow style={{width:'100%'}}>


               </SlideShow> 
               TradingDay
               <SlideShow>

               </SlideShow>
            </Segment> 
              </Header.Content>
            <Header.Subheader as='h4' className='titleTop'>
              <b>&mdash; Ajay Phogat &mdash;</b>
            </Header.Subheader>
          </Header>
        </Segment>
      </TradingDayStyles>
  );
};

export default TradingDayHeader;
