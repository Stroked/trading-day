import React from "react";
import PropTypes from 'prop-types';

function QuoteSummary(props) {
  const data = props.data;
  return (
    <div className="quoteSummary">
      <div>{data.companyName}</div>
      <div className="stockChanges">
        <span className="latestPrice">{data.latestPrice}</span>
        <span>{data.change.toFixed(3)} ({data.changePercent.toFixed(5) * 100}%)</span>
      </div>
      <div className="timeStamp">
        Last trade time: {new Date(data.closeTime).toLocaleString()}
        <div className="latestSource">{data.latestSource}</div>
      </div>
    </div>
  );
}

QuoteSummary.propTypes = {
};

export { QuoteSummary }