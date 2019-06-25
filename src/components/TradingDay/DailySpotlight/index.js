import React from "react";
import { json } from "d3";
import StatisticsTable from "./StatisticsTable";
import MoneyFlowsTable from "./MoneyFlowsTable";

import styled from "styled-components";
import { Grid, Divider } from "semantic-ui-react";
import * as d3 from "d3";

const fetchMoneyFlows = async url => {
  const file = await fetch(url);
  let response = await file.text();
  let data = response.trim();
  data = data.substring(data.indexOf("C"));
  data = d3.tsvParse(data, d3.autoType);
  return data;
};

const StyledSpotlight = styled.div`
  .moneyFlowTables {
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
  }

  .moneyflowTable {
   /* // width:40%; */





  }
`;
class Spotlight extends React.Component {
  state = {
    fetchedGainers: false,
    fetchedLosers: false,
    fetchedActive: false,
    fetchedBuyingOnWeakness: false,
    fetchedSellingOnStrength: false,
    gainers: [],
    losers: [],
    active: [],
    buyingOnWeakness: [],
    sellingOnStrength: []
  };
  componentDidMount() {
    // this.getGainers();
    // this.getLosers();
    // this.getActive();
    this.getSellingOnStrength();
    this.getBuyingOnWeakness();
  }

  getSellingOnStrength = async () => {
    const data = await fetchMoneyFlows(
      "http://cors-anywhere.herokuapp.com/online.wsj.com/mdc/public/npage/2_3045-mflppg-mfxml2csv.html"
    );

    this.setState({
      fetchedSellingOnStrength: true,
      sellingOnStrength: data
    });
  };
  getBuyingOnWeakness = async () => {
    const data = await fetchMoneyFlows(
      "http://cors-anywhere.herokuapp.com/online.wsj.com/mdc/public/npage/2_3045-mfgppl-mfxml2csv.html"
    );

    this.setState({
      fetchedBuyingOnWeakness: true,
      buyingOnWeakness: data
    });
    console.log(data);
  };

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
        <div class='spotlight'>
          <Grid columns={2} relaxed='very' divided stackable>
            <Grid.Column>
            
                {this.state.fetchedSellingOnStrength ? (
                  <MoneyFlowsTable
                    className='sellingOnStrength'
                    key='SellingFlow'
                    name='Selling Strength'
                    color='red'
                    data={this.state.sellingOnStrength}
                    icon='arrow right'
                    // onClick={evt=>evt.stopPropogration}
                  />
                ) : (
                  <h1> Loading</h1>
                )}
        
              {/* {this.state.fetchedLosers ? (
                <StatisticsTable
                  key='TopLosers'
                  name='Top Losers'
                  color='red'
                  data={this.state.losers}
                  icon='arrow down'
                />
              ) : (
                <h1> Loading</h1>
              )} */}
            </Grid.Column>
         
            <Grid.Column>
          
                {this.state.fetchedBuyingOnWeakness ? (
                  <MoneyFlowsTable
                    className='buyingOnWeakness'
                    key='BuyingFlow'
                    name='Buying Weakness'
                    color='green'
                    data={this.state.buyingOnWeakness}
                    icon='arrow left'
                    // onClick={evt=>evt.stopPropogration}
                  />
                ) : (
                  <h1> Loading</h1>
                )}
            
              {/* {this.state.fetchedGainers ? (
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
              )} */}
            </Grid.Column>
          </Grid>
        </div>
      </StyledSpotlight>
    );
  }
}

export default Spotlight;
