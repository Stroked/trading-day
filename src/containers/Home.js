import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';

import StackedBarGraph from '../components/StackedBarGraph.js';
import CardGraph from '../components/CardGraph.js';
import NewsCard from '../components/NewsCard.js';
import Spinner from '../components/Spinner.js';

const Header = Styled.div`
background-color: #282c34;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: white;
`;

class Home extends React.Component {
  state = {
    stocksFetched: false,
    marketFetched: false,
    newsFetched: false,
    stocks: [],
    stocksData: {},
    marketData: {},
    newsData: {}
  };

  componentDidMount() {
    this.getExchanges();
    this.getMarket();
    this.getNews();
  }

  getExchanges = () => {
    // API CALL
    // https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1d
    // Get Exchanges and batch call.
    let parent = this;
    fetch(
      'https://api.iextrading.com/1.0/stock/market/batch?symbols=NDAQ,SPY,DIA&types=quote,chart&range=1d',
      {
        method: 'GET'
      }
    )
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          stocksFetched: true,
          stocks: ['NDAQ', 'SPY', 'DIA'],
          stocksData: json
        });
      })
      .catch(function() {});
  };

  getMarket = () => {
    // API CALL
    // https://api.iextrading.com/1.0/market
    let parent = this;
    fetch('https://api.iextrading.com/1.0/market', {
      method: 'GET'
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          marketFetched: true,
          marketData: json
        });
      })
      .catch(function() {});
  };

  getNews = () => {
    // API CALL
    // https://api.iextrading.com/1.0/stock/market/news
    let parent = this;
    fetch('https://api.iextrading.com/1.0/stock/market/news', {
      method: 'GET'
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          newsFetched: true,
          newsData: json
        });
      })
      .catch(function() {});
  };

  render() {
    const NDAQ = this.state.stocksData['NDAQ'];
    const DIA = this.state.stocksData['DIA'];
    const SPY = this.state.stocksData['SPY'];

    return (
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-3"></div> */}
          <div className="d-none d-sm-block col-6 market card">
            <h2 className="large"> Market Trading Volume (24h) </h2>
            {this.state.marketFetched ? (
              <StackedBarGraph name="market" d={this.state.marketData} />
            ) : (
              <Spinner />
            )}
          </div>
          {/* <div className="col-3"></div> */}
        </div>
        <div className="row">
          <div className="d-none d-lg-block col" />
          <div className="d-none d-lg-block col" />
          <div className="col card-stock">
            {this.state.stocksFetched ? (
              <CardGraph
                name="NDAQ"
                d={NDAQ.chart}
                companyName="Nasdaq Inc."
                latestPrice={NDAQ.quote.latestPrice}
                changePercent={NDAQ.quote.changePercent}
                volume={NDAQ.quote.latestVolume}
                width="250"
                height="75"
              />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col card-stock">
            {this.state.stocksFetched ? (
              <CardGraph
                name="SPY"
                d={SPY.chart}
                companyName="S&P 500"
                latestPrice={SPY.quote.latestPrice}
                changePercent={SPY.quote.changePercent}
                volume={SPY.quote.latestVolume}
                width="250"
                height="75"
              />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col card-stock">
            {this.state.stocksFetched ? (
              <CardGraph
                name="DIA"
                d={DIA.chart}
                companyName="Dow Jones"
                latestPrice={DIA.quote.latestPrice}
                changePercent={DIA.quote.changePercent}
                volume={DIA.quote.latestVolume}
                width="250"
                height="75"
              />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="d-none d-lg-block col" />
          <div className="d-none d-lg-block col" />
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            {this.state.newsFetched ? (
              <NewsCard data={this.state.newsData} />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default Home;
