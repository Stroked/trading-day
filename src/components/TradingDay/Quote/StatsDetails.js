import React from "react";
import PropTypes from "prop-types";
import { Grid, List } from "semantic-ui-react";
import styled from 'styled-components';


const Item = ({ title, value }) => {
  let formattedValue = value;
  let num = +value;

  if (num && num.toString().includes(".")) formattedValue = num.toFixed(2);
  return (
    <List.Item>
      <List.Content floated='right'>{formattedValue}</List.Content>
      <List.Content floated='left' style={{ color: "#a0a0a0" }}>
        {title}
      </List.Content>
    </List.Item>
  );
};

const InfoStyles =styled.div`

display:flex;
align-items:center;
justify-content:center;
`

const StatsDetails2 = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Item title='Open' value={data.regularMarketOpen} />
        <Item title='High' value={data.regularMarketDayHigh} />
        <Item title='Low' value={data.regularMarketDayLow} />
      </div>
      <div>
        <Item title='Volume' value={data.regularMarketVolume} />
        <Item title='P/E' value={data.forwardPE} />
        <Item title='Mkt Cap' value={data.marketCap} />
      </div>

      <div>
        <Item title='52W H' value={data.fiftyTwoWeekHigh} />
        <Item title='52W L' value={data.fiftyTwoWeekLow} />
        <Item title='52W Ch' value={data.fiftyTwoWeekHighChangePercent} />
      </div>
      <div>
        <Item title='Yield' value={data.trailingAnnualDividendRate} />
        <Item title='Ex-Div' value={data.dividendDate} />
        <Item title='EPS' value={data.epsTrailingTwelveMonths} />
      </div>
    </div>
  );
};

const StatsDetails = ({ data }) => {
  return (
    <React.Fragment>
      <Grid.Row columns={4}>
        <Grid.Column>
          <List>
            <Item title='Open' value={data.regularMarketOpen} />
            <Item title='High' value={data.regularMarketDayHigh} />
            <Item title='Low' value={data.regularMarketDayLow} />
          </List>
        </Grid.Column>
        <Grid.Column>
          <List>
            <Item title='Volume' value={data.regularMarketVolume} />
            <Item title='P/E' value={data.forwardPE} />
            <Item title='Mkt Cap' value={data.marketCap} />
          </List>
        </Grid.Column>
        <Grid.Column>
          <List>
            <Item title='52W H' value={data.fiftyTwoWeekHigh} />
            <Item title='52W L' value={data.fiftyTwoWeekLow} />
            <Item title='52W Ch' value={data.fiftyTwoWeekHighChangePercent} />
          </List>
        </Grid.Column>
        <Grid.Column>
          <List>
            <Item title='Yield' value={data.trailingAnnualDividendRate} />
            <Item title='Ex-Div' value={data.dividendDate} />
            <Item title='EPS' value={data.epsTrailingTwelveMonths} />
          </List>
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  );
};

StatsDetails.propTypes = {
  data: PropTypes.object.isRequired
};

export default StatsDetails;
