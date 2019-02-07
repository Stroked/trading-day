import React from "react";
import PropTypes from 'prop-types';

function StandardTableRow(props) {
  let symbol;
  const row = props.columns.map((col) => {
    let value = props.rowData[col.key];
    
    if (col.key === "symbol") {
      symbol = value;
    }

    if (col.key === "avgTotalVolume") {
      value = value.toLocaleString();
    }

    return <td key={col.key} className={col.alignRight ? "alignRight" : null} >
            {col.numOfPrecision ? value.toFixed(col.numOfPrecision) : value}
           </td>;
  });
  row.unshift(<td key="no">{props.index + 1}</td>);

  return (
    <tr data-symbol={symbol}>{row}</tr>
  );
}

StandardTableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  rowData: PropTypes.object.isRequired,
};

export { StandardTableRow }