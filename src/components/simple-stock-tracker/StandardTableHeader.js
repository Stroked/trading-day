import React from "react";
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react'

function StandardTableHeader(props) {



  const columnHeaders = props.columns.map((col) => {
    let sortClass = "";
    let column ='';
    let direction=''
    if (col.key === props.columnOnSort.column) {
      sortClass = props.columnOnSort.order === "asc" ? "ascend" : "descend";
      column=col.key;
direction= props.columnOnSort.order === "asc" ? "ascending" : "descending";
    }
    console.table(col)
    console.table(sortClass);
    return <Table.HeaderCell sorted={column===col.Key?direction:null}  key={col.key} className={sortClass + (col.alignRight ? " alignRight" : "")} >
            {col.name}
           </Table.HeaderCell>
  });
  columnHeaders.unshift(<Table.HeaderCell key='no'>no</Table.HeaderCell>);

  return (
    <Table.Header>
      <Table.Row>{columnHeaders}</Table.Row>
    </Table.Header>
  );
}

StandardTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  columnOnSort: PropTypes.object.isRequired,
};

export { StandardTableHeader }