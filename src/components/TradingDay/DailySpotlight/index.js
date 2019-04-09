import React from "react";
import {json} from 'd3'
import StatisticsTable from "./StatisticsTable";
import styled from 'styled-components';

const StyledSpotlight=styled.div`
flex-basis:1fr 1fr 1fr;
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;

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
      <StyledSpotlight>
        {this.state.fetchedLosers ? (
          <StatisticsTable
            name='Losers'
            color='red'
            inverted
            data={this.state.losers}
          />
        ) : (
          <h1> Loading</h1>
        )}
        {this.state.fetchedActive ? (
          <StatisticsTable
            name='Most Active'
            color='black'
            inverted
            data={this.state.active}
          />
        ) : (
          <h1> Loading</h1>
        )}
        {this.state.fetchedGainers ? (
          <StatisticsTable
            name='Gainers'
            color='green'
            data={this.state.gainers}
          />
        ) : (
             <h1> Loading</h1>
        )}
      </StyledSpotlight>
    );
  }
}

export default Spotlight;
