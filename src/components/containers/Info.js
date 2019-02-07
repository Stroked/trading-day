import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

import Company from '../openStock/Company.js';
import CardGraph from '../openStock/CardGraph.js';
import Graph from '../openStock/Graph.js';
import Statistics from '../openStock/Statistics.js';
import Spinner from '../openStock/Spinner.js';
import NewsCard from '../openStock/NewsCard.js';

class Info extends React.Component {
  state = {
    fetched: false,
    companyFetched: false,
    newsFetched: false,
    peersFetched: false,
    hasError: false,
    companyInfo: '',
    companyName: '',
    interval: '',
    times: [],
    prices: [],
    d: [],
    peers: [],
    peerData: {},
    newsData: {}
  };
  componentDidMount() {
    this.makeApiCall();
    this.getCompanyInfo();
    this.getPeers();
    this.getNews();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.symbol != this.props.symbol) {
      this.setState({
        fetched: false,
        companyFetched: false,
        peersFetched: false,
        hasError: false,
        companyInfo: '',
        companyName: '',
        interval: '',
        times: [],
        prices: [],
        d: [],
        peers: [],
        peerData: {}
      });
      this.makeApiCall();
      this.changeActive('1d');
      this.getCompanyInfo();
      this.getPeers();
      this.getNews();
    }
  }

  componentWillUnmount() {}

  getPeers = () => {
    let parent = this;
    let symbols;
    // API CALL
    // Seperate symbols with a,b,c
    // https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1d
    // Get Rivals and batch call.
    fetch(
      'https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/peers',
      {
        method: 'GET'
      }
    )
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        let s = '';
        symbols = json;

        json.forEach(symbol => {
          s += symbol + ',';
        });

        fetch(
          'https://api.iextrading.com/1.0/stock/market/batch?symbols=' +
            s +
            '&types=quote,chart&range=1d',
          {
            method: 'GET'
          }
        )
          .then(function(data) {
            return data.json();
          })
          .then(function(json) {
            parent.setState({
              peersFetched: true,
              peers: symbols,
              peerData: json
            });
          });
      })
      .catch(function() {
        this.getPeers();
      });
  };

  getCompanyInfo = () => {
    let parent = this;
    fetch(
      'https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/company',
      {
        method: 'GET'
      }
    )
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          companyFetched: true,
          companyInfo: json['description'],
          companyName: json['companyName']
        });
      });
  };

  getNews = () => {
    // API CALL
    // https://api.iextrading.com/1.0/stock/market/news
    let parent = this;
    fetch(
      'https://api.iextrading.com/1.0/stock/' + this.props.symbol + '/news',
      {
        method: 'GET'
      }
    )
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

  makeApiCall = (frequency = '1d') => {
    let url =
      'https://api.iextrading.com/1.0/stock/' +
      this.props.symbol +
      '/chart/' +
      frequency;
    let timeParser = d3.timeParse('%Y-%m-%d');

    if (frequency == '1d') {
      timeParser = d3.timeParse('%Y%m%d%H:%M');
    }

    let parent = this;
    let prices = [];
    let times = [];

    d3.json(url)
      .then(function(d) {
        // Check for failure to retry.
        if (d[0]['date'] == null) {
          this.makeApiCall(frequency);
          return;
        }

        for (let i = 0; i < d.length; i++) {
          if (
            d[i]['marketNumberOfTrades'] == 0 ||
            d[i]['marketAverage'] == -1
          ) {
            d.splice(i, 1);
            i--;
            continue;
          }

          if (frequency == '1d') {
            d[i]['close'] = d[i]['marketAverage'];
            d[i]['date'] = timeParser(d[i]['date'] + d[i]['minute']);
          } else {
            d[i]['date'] = timeParser(d[i]['date']);
          }

          times.push(d[i]['date']);
          prices.push(d[i]['close']);
        }

        parent.setState({
          fetched: true,
          times: times,
          prices: prices,
          interval: frequency,
          d: d
        });
      })
      .catch(error => {
        console.error('error: ', error);
        parent.setState({
          hasError: true
        });
        return;
      });
  };

  changeActive = id => {
    let buttons = document.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
      buttons.item(i).classList.remove('active');
    }

    document.getElementById(id).classList.add('active');
    // Change graph to different one.
    this.makeApiCall(id);
  };

  render() {
    let peers = this.state.peers;
    while (peers.length % 3 !== 0) {
      peers.pop();
    }

    const peerGraphs =
      peers > 0 ? (
        <div className="col peers-card"> No Peers </div>
      ) : (
        peers.map((peer, i) => (
          <div className="col-4 card-stock card-peer" key={i}>
            <CardGraph
              name={peer}
              companyName={peer}
              d={this.state.peerData[peer].chart}
              latestPrice={this.state.peerData[peer].quote.latestPrice}
              changePercent={this.state.peerData[peer].quote.changePercent}
              volume={this.state.peerData[peer].quote.latestVolume}
              width="150"
              height="75"
            />
          </div>
        ))
      );

    if (this.state.hasError) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col" />
            <div className="col Stock">
              <h2>{this.props.symbol.toUpperCase()}</h2>
              <p> Failed to Load </p>
            </div>
            <div className="col" />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col Stock">
              <div className="">
                <h2>
                  {this.state.companyName} ({this.props.symbol.toUpperCase()})
                </h2>
                <h3>
                  <button
                    onClick={() => this.changeActive('1d')}
                    id="1d"
                    className="active"
                  >
                    1D
                  </button>
                  <button onClick={() => this.changeActive('1m')} id="1m">
                    1M
                  </button>
                  <button onClick={() => this.changeActive('3m')} id="3m">
                    3M
                  </button>
                  <button onClick={() => this.changeActive('6m')} id="6m">
                    6M
                  </button>
                  <button onClick={() => this.changeActive('1y')} id="1y">
                    1Y
                  </button>
                  <button onClick={() => this.changeActive('5y')} id="5y">
                    5Y
                  </button>
                </h3>
                {this.state.fetched ? (
                  <Graph
                    times={this.state.times}
                    prices={this.state.prices}
                    d={this.state.d}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
            <div className="col-sm-3" />
          </div>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-3 company">
              {this.state.companyFetched ? (
                <Company
                  name={this.state.companyName}
                  info={this.state.companyInfo}
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className="col-sm-2 statistics">
              {this.state.fetched ? (
                <Statistics
                  prices={this.state.prices}
                  interval={this.state.interval}
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className="col-sm-4" />
          </div>
          <div className="row">
            <div className="col-3" />
            {this.state.peersFetched ? (
              <div className="col-6">
                <div className="row">{peerGraphs}</div>
              </div>
            ) : (
              <div className="col-6">
                <Spinner />
              </div>
            )}
            <div className="col-3" />
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
}

export default Info;
