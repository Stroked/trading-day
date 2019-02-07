import React from 'react';
import PropTypes from 'prop-types';

import StatisticsTable from '../openStock/StatisticsTable.js';
import Spinner from '../openStock/Spinner.js';

class StocksStatistics extends React.Component {
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

  getGainers = () => {
    let parent = this;
    fetch('https://api.iextrading.com/1.0/stock/market/list/gainers', {
      method: 'GET'
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          fetchedGainers: true,
          gainers: json
        });
      });
  };

  getLosers = () => {
    let parent = this;
    fetch('https://api.iextrading.com/1.0/stock/market/list/losers', {
      method: 'GET'
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          fetchedLosers: true,
          losers: json
        });
      });
  };

  getActive = () => {
    let parent = this;
    fetch('https://api.iextrading.com/1.0/stock/market/list/mostactive', {
      method: 'GET'
    })
      .then(function(data) {
        return data.json();
      })
      .then(function(json) {
        parent.setState({
          fetchedActive: true,
          active: json
        });
      });
  };

  render() {
    return (
      <div className="StocksStats">
        <div className="row">
          <div className="col-sm-3 d-none d-sm-block" />
          <div className="col-sm-6 col-12">
            {this.state.fetchedGainers ? (
              <StatisticsTable name="Gainers" data={this.state.gainers} />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-sm-3 d-none d-sm-block" />
        </div>
        <div className="row">
          <div className="col-sm-3 d-none d-sm-block" />
          <div className="col-sm-6 col-12">
            {this.state.fetchedLosers ? (
              <StatisticsTable name="Losers" data={this.state.losers} />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-sm-3 d-none d-sm-block" />
        </div>
        <div className="row">
          <div className="col-sm-3 d-none d-sm-block" />
          <div className="col-sm-6 col-12">
            {this.state.fetchedActive ? (
              <StatisticsTable name="Most Active" data={this.state.active} />
            ) : (
              <Spinner />
            )}
          </div>
          <div className="col-sm-3 d-none d-sm-block" />
        </div>
      </div>
    );
  }
}

export default StocksStatistics;
