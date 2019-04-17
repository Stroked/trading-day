import { Tooltip } from "@vx/vx";
import React from "react";
import styled from "styled-components";
const StyledDetails = styled.div`
  .details {
    display: flex;
    flex-direction: row;
  }
  .detail {
    margin-right: 1rem;
  }
  .tooltip-label {
    font-size: 9px;
    font-weight: 900;
    color: #5473b8;
  }
`;

export default function Details({
  formatPrice,
  formatNumber,
  bucket,
  xScale,
  yScale
}) {
  const left = xScale(bucket.closeTime) + xScale.bandwidth() + 5;
  const halfway = xScale.range()[1] / 2;


  return (
    <StyledDetails>
      <Tooltip
        style={{
          borderRadius: 0,
          boxShadow: "0 1px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#27273f",
          color: "white",
          transform: xScale(bucket.closeTime) > halfway ? "translate(-104%)" : ""
        }}
        top={yScale(bucket.lowPrice)}
        left={left}>
        {" "}
        <div className='details'>
          <div className='detail'>
            <div className='tooltip-label' style={{ fontSize: "9px",fontWeight: "900",color: "#5473b8"}}>high</div>
            <div>{formatPrice(bucket.highPrice)}</div>
          </div>
          <div className='detail'>
            <div className='tooltip-label'>low</div>
            <div>{formatPrice(bucket.lowPrice)}</div>
          </div>
          <div className='detail'>
            <div className='tooltip-label'>open</div>
            <div>{formatPrice(bucket.openPrice)}</div>
          </div>
          <div className='detail'>
            <div className='tooltip-label'>close</div>
            <div>{formatPrice(bucket.closePrice)}</div>
          </div>
          <div className='detail'>
            <div className='tooltip-label'>volume</div>
            <div>{formatNumber(bucket.volume)}</div>
          </div>
        </div>
      </Tooltip>
    </StyledDetails>
  );
}
