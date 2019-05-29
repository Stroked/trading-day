import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Statistic } from "semantic-ui-react";

const StatWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 5px;
  position: left;
  margin-top: 0;

  @media (min-width: 768px) {
    justify-content: space-around;
    margin-top: 0.5rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

;
const Price = styled.span`
  font-size: 4vw;

`;
const Dollar = styled.span`
  font-size: 4vw;
  /* text-justify: */
`;
const ChangeWrap = styled.span`
  color: ${props=>props.isUp ? 'green':'red'}
  font-size: 2vw;
  line-height:1.5;


`
const StatsPrice = ({ last, change, percent, color }) => {
  return (
    <StatWrap>
      <Price>
        <Dollar>$</Dollar>
        {last}
      </Price>
      <ChangeWrap isUp={+change > 0}>
        {change}{<br/>}
        {percent}
      </ChangeWrap>
    </StatWrap>
  );
};

StatsPrice.propTypes = {
  last: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired
};

export default StatsPrice;
