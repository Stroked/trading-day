import { Tooltip } from '@vx/vx';
import React from 'react';
import styled from 'styled-components'


const StyledTimeMarker = styled.div`

`;

export default function TimeMarker({ top, time, formatTime, xScale }) {
  const left= xScale(time);
  return (
    <StyledTimeMarker>
      <Tooltip
        style={{
          //transform: 'translate('+xScale(time)+'px)',
          borderRadius: 0,
          boxShadow: "0 1px 10px rgba(0,0,0,0.1)",
          backgroundColor: "#27273f",
          color: "white",
          fontSize: "11px"
        }}
        top={top}
        left={left}>
        <div>{formatTime(time)}</div>
      </Tooltip>
    </StyledTimeMarker>
  );
}
