import React from "react";
import PropTypes from 'prop-types';
import EnumsManager from "./enumsManager";

import { QuoteDetailsCell } from "./QuoteDetailsCell";

function QuoteDetails(props) {
  if (!props.data) {
    return null;
  }

  let cells = [];
  const data = props.data;
  // loop selected columns
  EnumsManager.StockDetails.forEach((obj) => {
    const key = obj.key;
    if (data[key] !== undefined) {
      const cell = <QuoteDetailsCell key={key} keyName={obj.name} value={data[key]} />;
      cells.push(cell);
    } else {
      const cell = <QuoteDetailsCell key={key} keyName={obj.name} value="--" />;
      cells.push(cell);
    }
  });

  const rows = [];
  const defaultColumns = 4;
  const totalColumns = EnumsManager.StockDetails.length;
  for (let i = 0; i < totalColumns; i = i + defaultColumns) {
    const row = [];
    for (let j = i; j < i + defaultColumns; j++) {
      row.push(cells[j]);
    }
    rows.push(<tr key={Math.random()}>{row}</tr>);
  }

  return (
    <table className="additionalInfo">
      <tbody>{rows}</tbody>
    </table>
  );
}

QuoteDetails.propTypes = {
};

export { QuoteDetails }