import React from "react";
import { json } from "d3";
import StatisticsTable from "./StatisticsTable";
import styled from "styled-components";
import {Grid,Divider} from 'semantic-ui-react';

const fetchMoneyFlows = async () => {
  const file = await fetch(
    "http://cors-anywhere.herokuapp.com/online.wsj.com/mdc/public/npage/2_3045-mfgppl-mfxml2csv.html"
  );
  let res = await file.text();
  console.log(res);
  let data = res.trim();
  data = data.substring(data.indexOf("C"));
  data = d3.tsvParse(data, d3.autoType);
  return data;
};

const StyledSpotlight = styled.div`

`;
class Spotlight extends React.Component {
  state = {
    fetchedGainers: false,
    fetchedLosers: false,
    fetchedActive: false,
    gainers: [],
    losers: [],
    active: []
  };
  componentDidMount() {
    this.getGainers();
    this.getLosers();
    this.getActive();
  }

  getGainers = async () => {
    const data = await json(
      "https://api.iextrading.com/1.0/stock/market/list/gainers"
    );
    this.setState({
      fetchedGainers: true,
      gainers: data
    });
  };
  getLosers = async () => {
    const data = await json(
      "https://api.iextrading.com/1.0/stock/market/list/losers"
    );
    this.setState({
      fetchedLosers: true,
      losers: data
    });
  };
  getActive = async () => {
    const data = await json(
      "https://api.iextrading.com/1.0/stock/market/list/mostactive"
    );
    this.setState({
      fetchedActive: true,
      active: data
    });
  };
  render() {
    return (
      <Grid columns={3} relaxed='very' divided stackable>
        <Grid.Column>
          {this.state.fetchedLosers ? (
            <StatisticsTable
            key='TopLosers'
              name='Top Losers'
              color='red'
              data={this.state.losers}
              icon='arrow down'
            />
          ) : (
            <h1> Loading</h1>
          )}
        </Grid.Column>
        <Grid.Column>
          {this.state.fetchedActive ? (
            <StatisticsTable
            key='MostActive'
              name='Most Active'
              color='black'
              inverted
              data={this.state.active}
              icon='bolt'
            />
          ) : (
            <h1> Loading</h1>
          )}
        </Grid.Column>
        <Grid.Column>
          {this.state.fetchedGainers ? (
            <StatisticsTable
            key='TopGainers'
              name='Top Gainers'
              color='green'
              data={this.state.gainers}
              icon='arrow up'
              // onClick={evt=>evt.stopPropogration}
            />
          ) : (
            <h1> Loading</h1>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Spotlight;
