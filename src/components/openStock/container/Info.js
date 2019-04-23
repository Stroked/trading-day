import { Link } from "react-router-dom";
import React from "react";
import * as d3 from "d3";
import CandleStickChart from "../../TradingDay/Charts/CandleStick";
import styled from "styled-components";
import DarkButtons from "../../coolook/DarkButtons";
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    let timeParser = d3.timeParse("%Y-%m-%d");
    if (frequency === "1d") timeParser = d3.timeParse("%Y%m%d%H:%M");

    let prices = [];
    let times = [];
    const d = await d3.json(
      `https://api.iextrading.com/1.0/stock/${
        this.props.symbol
      }/chart/${frequency}`
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

  render() {
    return (
      <StyledWrapper>
        <DarkButtons
          default={"1Y"}
          timeRangeArray={["1D", "2W", "3M", "1Y", "5Y"]}
          clickEffect={this.makeApiCall}
        />

        {this.state.fetched ? (
          <div style={{ alignContent: "center", margin: "500 500" }}>
            <CandleStickChart
              width={900}
              height={500}
              data={this.state.d}
              symbol={this.props.symbol.toUpperCase()}
            />
          </div>
        ) : (
          <h1>LOADING</h1>
        )}
      </StyledWrapper>
    );
  }
}

export default Info;
