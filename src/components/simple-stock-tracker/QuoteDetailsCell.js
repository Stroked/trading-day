import React from "react";
import PropTypes from 'prop-types';

function QuoteDetailsCell(props) {
  return (
    <td>
      <div className="cellTitle">{props.keyName}</div>
      <div>{props.value}</div>
    </td>
  );
}

QuoteDetailsCell.propTypes = {
};

export { QuoteDetailsCell }