import React, { Component } from "react";
import RelatedQueries from "../components/RelatedQueries";
import SearchBar from "../components/SearchBar";
import Graph from "../components/Graph";
import axios from "axios";
import { parseFinanceData } from "../graph/utils";

export default class TickerTrends extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      ticker: "",
      searchRelatedQueries: false,
      relatedQueries: [],
      data: [],
      financeData: []
    };
    this.updateGraph = this.updateGraph.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  updateGraph(keyword, ticker, searchRelatedQueries) {
    if (keyword && ticker) {
      this.fetchData(keyword, ticker, searchRelatedQueries);
    }
  }

  fetchData(keyword, ticker, searchRelatedQueries) {
    Promise.all([
      this.getInterestOverTime(keyword, searchRelatedQueries),
      this.getFinanceData(ticker)
    ])
      .then(dataArray => {
        this.setState({
          keyword,
          ticker,
          searchRelatedQueries,
          data: dataArray[0].timelineData,
          financeData: dataArray[1],
          relatedQueries: dataArray[0].relatedQueries
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getInterestOverTime(keyword, searchRelatedQueries) {
    return axios
      .get(`/api/fetchData/${keyword}`, {
        params: {
          searchRelatedQueries: searchRelatedQueries
        }
      })
      .then(res => {
        return {
          timelineData: res.data.default.timelineData,
          relatedQueries: res.data.queries
        };
      })
      .catch(err => {
        console.error(err);
      });
  }

  getFinanceData(ticker) {
    return axios
      .get("https://www.alphavantage.co/query", {
        params: {
          function: "TIME_SERIES_DAILY_ADJUSTED",
          symbol: ticker,
          outputsize: "full",
          datatype: "csv",
          apikey: "TRDGNTGBQG2BI9J0"
        }
      })
      .then(res => {
        return parseFinanceData(res.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container-fluid'>
        <h3>Google Search Query Stock Analyzer</h3>
        <div>
          <SearchBar
            updateGraph={this.updateGraph}
            query={this.state.keyword}
            ticker={this.state.ticker}
            searchRelatedQueries={this.state.searchRelatedQueries}
          />
          {this.state.searchRelatedQueries ? (
            <RelatedQueries relatedQueries={this.state.relatedQueries} />
          ) : null}
          <Graph data={this.state.data} financeData={this.state.financeData} />
        </div>
      </div>
    );
  }
}
