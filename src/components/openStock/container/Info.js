import React from "react";
import * as d3 from "d3";
import Company from "../Company.js";
import CardGraph from "../CardGraph.js";
import Graph from "../Graph.js";
import Statistics from "../Statistics.js";
import Spinner from "../Spinner.js";
import NewsCard from "../NewsCard.js";
import CandleStickChart from "../../TradingDay/Charts/CandleStick";
import styled from 'styled-components';

const StyledWrapper = styled.div`

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;
class Info extends React.Component {
  state = {
    fetched: false,
    companyFetched: false,
    newsFetched: false,
    peersFetched: false,
    hasError: false,
    companyInfo: "",
    companyName: "",
    interval: "",
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
    if (prevProps.symbol !== this.props.symbol) {
      this.setState({
        fetched: false,
        companyFetched: false,
        peersFetched: false,
        hasError: false,
        companyInfo: "",
        companyName: "",
        interval: "",
        times: [],
        prices: [],
        d: [],
        peers: [],
        peerData: {}
      });
      this.makeApiCall();
      this.changeActive("1d");
      this.getCompanyInfo();
      this.getPeers();
      this.getNews();
    }
  }

  getPeers = async () => {
    // Get peers and batch request trading-day quote
    const peers = await d3.json(
      `https://api.iextrading.com/1.0/stock/${this.props.symbol}/peers`
    );
    const quotePeers = await d3.json(
      `https://api.iextrading.com/1.0/stock/market/batch?symbols=${peers.join()}&types=quote,chart&range=1d`
    );
    this.setState({
      peersFetched: true,
      peers: peers,
      peerData: quotePeers
    });
  };

  getCompanyInfo = async () => {
    const companyInfo = await d3.json(
      `https://api.iextrading.com/1.0/stock/${this.props.symbol}/company`
    );
    this.setState({
      companyFetched: true,
      companyInfo: companyInfo["description"],
      companyName: companyInfo["companyName"]
    });
  };

  getNews = async () => {
    const news = await d3.json(
      `https://api.iextrading.com/1.0/stock/${this.props.symbol}/news`
    );
    this.setState({
      newsFetched: true,
      newsData: news
    });
  };

  makeApiCall = async (frequency = "1y") => {
    let url = `https://api.iextrading.com/1.0/stock/${
      this.props.symbol
    }/chart/${frequency}`;
    let timeParser = d3.timeParse("%Y-%m-%d");

    if (frequency === "1d") {
      timeParser = d3.timeParse("%Y%m%d%H:%M");
    }

    let prices = [];
    let times = [];
    const d = await d3.json(url);

    // Check for failure to retry.
    if (d[0]["date"] == null) {
      this.makeApiCall(frequency);
      return;
    }

    for (let i = 0; i < d.length; i++) {
      if (d[i]["marketNumberOfTrades"] === 0 || d[i]["marketAverage"] === -1) {
        d.splice(i, 1);
        i--;
        continue;
      }

      if (frequency === "1d") {
        d[i]["close"] = d[i]["marketAverage"];
        d[i]["date"] = timeParser(d[i]["date"] + d[i]["minute"]);
      } else {
        d[i]["date"] = timeParser(d[i]["date"]);
      }

      times.push(d[i]["date"]);
      prices.push(d[i]["close"]);
    }

    this.setState({
      fetched: true,
      times: times,
      prices: prices,
      interval: frequency,
      d: d
    });
  };

  changeActive = id => {
    let buttons = document.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
      buttons.item(i).classList.remove("active");
    }

    document.getElementById(id).classList.add("active");
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
        <div className='col peers-card'> No Peers </div>
      ) : (
        peers.map((peer, i) => (
          <div className='col-4 card-stock card-peer' key={i}>
            <CardGraph
              name={peer}
              companyName={peer}
              d={this.state.peerData[peer].chart}
              latestPrice={this.state.peerData[peer].quote.latestPrice}
              changePercent={this.state.peerData[peer].quote.changePercent}
              volume={this.state.peerData[peer].quote.latestVolume}
              width='150'
              height='75'
            />
          </div>
        ))
      );

    if (this.state.hasError) {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col' />
            <div className='col Stock'>
              <h2>{this.props.symbol.toUpperCase()}</h2>
              <p> Failed to Load </p>
            </div>
            <div className='col' />
          </div>
        </div>
      );
    } else {
      return (
       <StyledWrapper>
          <div className='row'>
            <div className='col-sm-3' />
            <div className='col Stock'>
              <div className=''>
                <h2>
                  {this.state.companyName} ({this.props.symbol.toUpperCase()})
                </h2>
                <h3>
                  <button
                    onClick={() => this.changeActive("1d")}
                    id='1d'
                    className='active'>
                    1D
                  </button>
                  <button onClick={() => this.changeActive("1m")} id='1m'>
                    1M
                  </button>
                  <button onClick={() => this.changeActive("3m")} id='3m'>
                    3M
                  </button>
                  <button onClick={() => this.changeActive("6m")} id='6m'>
                    6M
                  </button>
                  <button onClick={() => this.changeActive("1y")} id='1y'>
                    1Y
                  </button>
                  <button onClick={() => this.changeActive("5y")} id='5y'>
                    5Y
                  </button>
                </h3>
                {this.state.fetched ? (
                  <div style={{alignContent:"center",margin:"500 500"}}>
                    <CandleStickChart width={900} height={500} data={this.state.d}
                      symbol={this.props.symbol.toUpperCase()}
                    />
                
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
            <div className='col-sm-3' />
          </div>
          <div className='row'>
            <div className='col-sm-3' />
            <div className='col-sm-3 company'>
              {this.state.companyFetched ? (
                <Company
                  name={this.state.companyName}
                  info={this.state.companyInfo}
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className='col-sm-2 statistics'>
              {this.state.fetched ? (
                <Statistics
                  prices={this.state.prices}
                  interval={this.state.interval}
                />
              ) : (
                <Spinner />
              )}
            </div>
            <div className='col-sm-4' />
          </div>
          <div className='row'>
            <div className='col-3' />
            {this.state.peersFetched ? (
              <div className='col-6'>
                <div className='row'>{peerGraphs}</div>
              </div>
            ) : (
              <div className='col-6'>
                <Spinner />
              </div>
            )}
            <div className='col-3' />
          </div>
          <div className='row'>
            <div className='col-3' />
            <div className='col-6'>
              {this.state.newsFetched ? (
                <NewsCard data={this.state.newsData} />
              ) : (
                <Spinner />
              )}
            </div>
            <div className='col-3' />
          </div>
        </StyledWrapper>
      );
    }
  }
}

export default Info;
