import styled from "styled-components";
import React, { Component } from "react";

const PillButtonStyleWrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90vh;
    position: relative;
  }

  .button-big {
    width: 200px;
    height: 100px;
    border-radius: 50px;
    background-image: linear-gradient(to right bottom, #dadfe1, #abb7b7);
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4),
      inset 2px 4px 4px rgba(255, 255, 255, 0.4);
  }

  .button-small {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 170px;
    height: 70px;
    border-radius: 50px;
    box-shadow: inset 2px 4px 4px -2px rgba(255, 255, 255, 0.6),
      0px 4px 4px rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to right bottom, #dadfe1, #abb7b7);
  }

  .click {
    display: none;
  }

  .click:checked + label .button-small {
    background-image: linear-gradient(to right bottom, #abb7b7, #dadfe1);
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1),
      inset -2px -2px 4px rgba(255, 255, 255, 0.4);
  }

  .click:checked ~ .bg {
    transform: scale(80);
    background-color: #333333;
    transition: 0.4s;
  }

  .click ~ .bg {
    transition: 0.4s;
  }

  .bg {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: 0.4s;
    z-index: -1;
  }
`;
class PillButton extends Component {
  render() {
    return (
      <PillButtonStyleWrapper>
        <div className='container'>
          <div className='button-big'>
            <input type='checkbox' id='checked' className='click' />
            <label for='checked'>
              <div className='button-small' />
            </label>
            <div className='bg' />
          </div>
        </div>
      </PillButtonStyleWrapper>
    );
  }
}

export default PillButton;
