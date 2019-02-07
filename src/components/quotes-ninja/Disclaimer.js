import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const DisclaimerWrap = styled.div`
  font-size: 0.8rem;
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
  @media (max-width: 374px) {
    font-size: 0.5rem;
  }
  a {
    color: #808080;
    text-decoration: underline;
  }
`;

const Disclaimer = ({ session }) => {
  return (
    <DisclaimerWrap>
      <span>
        Data provided for free by{' '}
        <a href="https://iextrading.com/developer/">IEX</a> | View{' '}
        <a href="https://iextrading.com/api-exhibit-a/">IEX's Terms of Use</a> |{' '}
      </span>
      {session && (
        <span>
          <a href="https://iextrading.com/developer/">IEX Real Time Price</a> |{' '}
        </span>
      )}
      <span>
        Search by <a href="https://www.algolia.com/">Algolia</a>
      </span>
    </DisclaimerWrap>
  );
};

Disclaimer.propTypes = {
  session: PropTypes.bool.isRequired,
};

export const DisclaimerPop = ({ session }) => {
  return (
    <Popup
      on="click"
      trigger={
        <Button
          basic
          compact
          floated="right"
          size="tiny"
          icon
          style={{ fontSize: '0.6rem', marginTop: '-0.5rem' }}
        >
          <Icon name="info circle" /> Disclaimer
        </Button>
      }
      content={<Disclaimer session={false} />}
    />
  );
};
export default Disclaimer;
