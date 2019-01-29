import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import Search from './Search';

const HeaderStyle = Styled.div`
background-color: #282c34;
min-width: 100vw;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
font-size: calc(10px + 2vmin);
color: white;
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderStyle>
        <Link to="/">TradingDay</Link>
        <Link to="/Stocks"> Daily Report </Link>
        <Search />
      </HeaderStyle>
    );
  }
}

export default Header;
