import React from "react";
import styled from "styled-components";

const StatWrap = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;

  @media (min-width: 768px) {
    justify-content: space-around;
    margin-top: 0.5rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatsPrice = ({ last, change, percent, color }) => {
  return (
    <StatWrap>
      <div style={{ fontSize: "3vw", padding: 0, margin: 0, lineHeight: 1 }}>
        ${last.toFixed(2)}
      </div>
      <div
        style={{
          color: +change > 0 ? "green" : "red",
          fontSize: "1.5vw",
          lineHeight: 1,
          padding: 0,
          margin: 0
        }}>
        {change.toFixed(2)}
        <br />
        {percent.toFixed(2)}%
      </div>
    </StatWrap>
  );
};



export default StatsPrice;
