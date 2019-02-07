import React from "react";
import PropTypes from 'prop-types';

function StandardTableHeader(props) {
  const columnHeaders = props.columns.map((col) => {
    let sortClass = "";
    if (col.key === props.columnOnSort.column) {
      sortClass = props.columnOnSort.order === "asc" ? "ascend" : "descend";
    }
    return <th key={col.key} className={sortClass + (col.alignRight ? " alignRight" : "")} >
            {col.name}
           </th>
  });
  columnHeaders.unshift(<th key="no">no</th>);

  return (
    <thead>
      <tr>{columnHeaders}</tr>
    </thead>
  );
}

StandardTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  columnOnSort: PropTypes.object.isRequired,
};

export { StandardTableHeader }