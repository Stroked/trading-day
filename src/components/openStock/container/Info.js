import { Link } from "react-router-dom";
import React from "react";
import * as d3 from "d3";
import Company from "../Company.js";
import LineChart from "../LineChart.js";
import Statistics from "../Statistics.js";
import Spinner from "../Spinner.js";
import NewsCard from "../NewsCard.js";
import NewsItems from "../../TradingDay/NewsItems";
import CandleStickChart from "../../TradingDay/Charts/CandleStick";
import styled from "styled-components";
import DarkButtons from "../../coolook/DarkButtons";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* .buttons-container {
    display:inline;
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100px;
    width:100%;
    border-radius: 45px;
    background: #151515;
    box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.5);
  }
  ul {
    position: relative;
    list-style: none;
    width: inherit;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center; background-clip: padding-box;

    li { background-clip: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1px;
      height: 90px;
      width: 95px;
      background: #202020;
      border-top: 1px solid #353535;
      box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.5);
      transition: all 0.5s;
      &:nth-of-type(1) {          border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        button{
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
      }
      }
      &:last-of-type {
           border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
        button{
        border-bottom-right-radius: 40px;
        border-top-right-radius: 40px;
        }
      }
      &:hover {
        cursor: pointer;
      }
      button { 
        display: inline-block;
        height:100%;
        width:100%;
        color:#fff;
        background:Transparent;
        background-color: Transparent;
        border-style:hidden;
        text-decoration: none;
        transition: all 0.5s;
        font-size:2.5em;          
        outline:none;
        background-clip: border-box;
        &:focus{
            background-color:red;
            font-size:3em;
          outline:none;
          outline-width:0;
          border-bottom-width:0px;
          }  
        
      }
    
    
  .active {
    font-size:3em;
    color:#000;
     background-clip: padding-box;
    background:red;
    background-color:red;
    border-top: none;
    border-bottom: 1px solid #252525;
    box-shadow: inset 0 0 25px 1px rgba(0, 0, 0, 0.8);
  } */
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
    let timeParser = d3.timeParse('%Y-%m-%d');
    if (frequency === "1d") timeParser = d3.timeParse('%Y%m%d%H:%M');

    let prices = [];
    let times = [];
    const d = await d3.json(
      `https://api.iextrading.com/1.0/stock/${this.props.symbol}/chart/${frequency}`
    );

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
    const lis = document.querySelectorAll("li");
    const button = document.querySelectorAll("li button");

    for (let i = 0; i < lis.length; i++) {
      lis[i].addEventListener("click", function() {
        for (let i = 0; i < lis.length; i++) {
          lis[i].classList.remove("active");
          button[i].classList.remove("active-text");
        }
        this.classList.add("active");
        button[i].classList.add("active-text");
      });
    }
    this.makeApiCall(id);
  };

  render() {
    let peers = this.state.peers;
    // while (peers.length % 3 !== 0) {
    //   peers.pop();
    // }

    const peerGraphs =
      peers > 0 ? (
        <h2> No Peers Data Available </h2>
      ) : (
        peers.map((peer, i) => (
          <LineChart
            key={`${i}-${this.state.peerData[peer].quote.symbol}`}
            name={this.state.peerData[peer].symbol}
            companyName={this.state.peerData[peer].companyName}
            data={this.state.peerData[peer].chart}
            latestPrice={this.state.peerData[peer].quote.latestPrice}
            changePercent={this.state.peerData[peer].quote.changePercent}
            volume={this.state.peerData[peer].quote.latestVolume}
            width='150'
            height='75'
          />
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
                  {this.state.companyName} (
                  {this.props.symbol.toUpperCase()})
                </h2>

                <DarkButtons
                default={'1Y'}
                  timeRangeArray={["1D", "2W", "3M", "1Y", "5Y"]}
                  clickEffect={this.makeApiCall}
                />

                {this.state.fetched ? (
                  <div
                    style={{ alignContent: "center", margin: "500 500" }}>
                    <CandleStickChart
                      width={900}
                      height={500}
                      data={this.state.d}
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
                <NewsItems news={this.state.newsData} slice={10} />
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
