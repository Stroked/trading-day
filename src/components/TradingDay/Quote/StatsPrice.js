import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Statistic } from 'semantic-ui-react';

const StatWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: space-around;
    flex-direction: inherit;
  }
`;

const ChangeWrap = styled.div`
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const Dollar = styled.span`
  font-size: 2rem;
  text-align: center;
`;

const StatsPrice = ({ last, change, percent, color }) => {
  return (
    <StatWrap>
      <Statistic style={{ position: 0 }}>
        <Statistic.Value><Dollar>$</Dollar>{last}</Statistic.Value>
      </Statistic>
      <ChangeWrap>
        <Statistic size="mini" color={color} style={{ marginBottom: 0 }}>
          <Statistic.Value>{change}</Statistic.Value>
        </Statistic>
        <Statistic size="mini" color={color} style={{ marginBottom: 0 }}>
          <Statistic.Value>{percent}</Statistic.Value>
        </Statistic>
      </ChangeWrap>
    </StatWrap>
  );
};

StatsPrice.propTypes = {
  last: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
};

export default StatsPrice;
