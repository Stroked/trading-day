import React from "react";
import Styled from "styled-components";
import * as d3 from "d3";
import LineChart from "../components/openStock/LineChart";
import NewsCard from "../components/openStock/NewsCard.js";
import Spinner from "../components/openStock/Spinner.js";
import Header from "../components/openStock/Header.js";
import { } from "@vx/vx";

const StyledHeader = Styled.div`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: white;
`;

class OpenStockHome extends React.Component {
  state = {
    indicesFetched: false,
    newsFetched: false,
    indicesData: {},
    newsData: {}
  };

  componentDidMount() {
    this.getIndices();
    this.getNews();
  }

  getIndices = async () => {
    let data = await d3.json(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=QQQ,SPY,DIA&types=quote,chart&range=1d`
    );
    this.setState({
      indicesFetched: true,
      indicesData: data
    });
  };


  getNews = async () => {
    let data = await d3.json(
      `https://api.iextrading.com/1.0/stock/market/news`
    );
    this.setState({
      newsFetched: true,
      newsData: data
    });
  };

  render() {

let i=0;
    return (
      <div>
        <StyledHeader>
          <Header />
        </StyledHeader>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexBasis: "1fr 1fr 1fr"
          }}>
          {this.state.indicesFetched ? (
            Object.keys(this.state.indicesData).map(key => (
              <LineChart
                key={`${i++}-${this.state.indicesData[key].quote.symbol}`}
                data={this.state.indicesData[key].chart}
                name={this.state.indicesData[key].quote.symbol}
                companyName={this.state.indicesData[key].quote.companyName}
                latestPrice={this.state.indicesData[key].quote.latestPrice}
                changePercent={
                  this.state.indicesData[key].quote.changePercent
                }
                volume={this.state.indicesData[key].quote.latestVolume}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>

        <div>
          {this.state.newsFetched ? (
            <NewsCard data={this.state.newsData} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}

export default OpenStockHome;
