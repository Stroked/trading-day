import React from "react";
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react'

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

    return (
      <Table.Cell
        key={col.key}
        className={col.alignRight ? "alignRight" : null}>
        {col.numOfPrecision ? value.toFixed(col.numOfPrecision) : value}
      </Table.Cell>
    );
  });
  row.unshift(<Table.Cell key='no'>{props.index + 1}</Table.Cell>);

  return <Table.Row data-symbol={symbol}>{row}</Table.Row>;
}

StandardTableRow.propTypes = {
  columns: PropTypes.array.isRequired,
  rowData: PropTypes.object.isRequired,
};

export { StandardTableRow }