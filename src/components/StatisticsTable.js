import React from 'react';
import PropTypes from 'prop-types';

import CardGraph from './CardGraph';

class StatisticsTable extends React.Component {
  render() {
    const stats = this.props.data.map((e, i) => (
      <tr key={i}>
        <td>
          <a href={'/Stocks?symbol=' + e['symbol']}>{e['symbol']}</a>
        </td>
        <td> ${e['latestPrice']} </td>
        {e['change'] >= 0 ? (
          <td className="green"> +{e['change']} </td>
        ) : (
          <td className="red"> {e['change']} </td>
        )}
        {e['changePercent'] >= 0 ? (
          <td className="green"> +{e['changePercent']}% </td>
        ) : (
          <td className="red"> {e['changePercent']}% </td>
        )}
        <td> {e['latestVolume']} </td>
      </tr>
    ));
    return (
      <div className="statisticsTable card">
        <h2> {this.props.name} </h2>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change ($)</th>
              <th>Change (%)</th>
              <th>Volume (24h)</th>
            </tr>
          </thead>
          <tbody>{stats}</tbody>
        </table>
      </div>
    );
  }
}

export default StatisticsTable;
