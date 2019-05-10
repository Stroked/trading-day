import React, { useState, useEffect } from "react";
import styled from "styled-components";
const DarkButtonStyles = styled.div`
  display: inline-block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-radius: 45px;
  background: #151515;
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.5);

  ul {
    display: inline-block;
    padding: 3px 0px;
    margin: 0 -2px;
    list-style: none;
    width: inherit;
    height: inherit;
    display: flex;
  }
  ul li {
    display: flex;
    margin: 1px 2px;
    height: 90%;
    width: 100%;
    background: #202020;
    border-top: 1px solid #353535;
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
  }
  ul li:nth-of-type(1) {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    button {
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }
  }
  ul li:last-of-type {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    button {
      border-bottom-right-radius: 40px;
      border-top-right-radius: 40px;
    }
  }
  ul li button {
    height: 100%;
    width: 100%;
    color: #999999;
    background: transparent;
    background-color: transparent;
    text-shadow: inset 1px 1px 2px rgba(225, 225, 225, 0.5);
    background-clip: text;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.5s;
    border-style: hidden;
    border: none;
    outline: none;
    &:focus {
      outline: none;
      outline-width: 0;
      border-bottom: 1px solid #252525;
      border-style: hidden;
    }
    &:hover {
      cursor: pointer;
    }
    &:active {
    }
  }

  .active {
    border-style: none;
    background: #151515;

    border-bottom: 1px solid #252525;
    box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, 0.8);
  }

  .active-text {
    color: crimson;
    text-shadow: 0 0 15px rgba(220, 10, 10, 0.5);
    background-clip: padding-box;
  }
`;

export default function DarkButton(props) {
  const [activePeriod, setActivePeriod] = useState(props.default);

  // useEffect(() => {
  //   props.clickEffect(activePeriod);
  // }, [props.clickEffect, activePeriod]);

  return (
    <DarkButtonStyles className='buttons-container'>
      <ul>
        {props.timeRangeArray.map(period => {
          const text =
            period === "ytd"
              ? "YTD"
              : [...period]
                  .sort()
                  .join("")
                  .toUpperCase();
          return (
            <li
              key={period}
              className={activePeriod === period ? "active" : null}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActivePeriod(period);
                  props.clickEffect(text);
                }}
                className={
                  activePeriod === period ? "active-text" : null
                }>
                {text}
              </button>
            </li>
          );
        })}

        {/* <li>
         <button onClick={() => changeActive("1m")} id='1m'>
           1M
         </button>
       </li>
       <li>
         <button onClick={() => changeActive("3m")} id='3m'>
           3M
         </button>
       </li>
       <li>
         <button onClick={() => changeActive("6m")} id='6m'>
           6M
         </button>
       </li>
       <li className='active'>
         <button
           className='active-text'
           onClick={() => changeActive("1y")}
           id='1y'>
           1Y
         </button>
       </li>
       <li>
         <button onClick={() => this.changeActive("5y")} id='5y'>
           5Y
         </button>
       </li> */}
      </ul>
    </DarkButtonStyles>
  );
}
