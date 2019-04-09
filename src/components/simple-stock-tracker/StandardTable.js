import React from "react";
import PropTypes from 'prop-types';
import EnumsManager from "./enumsManager";
import {Table} from 'semantic-ui-react'

import { StandardTableHeader } from "./StandardTableHeader";
import { StandardTableRow } from "./StandardTableRow";

function StandardTable(props) {
  // find highlight column for the activeType
  const columnOnSort = getHighlightedColumns(props.activeType);
  const orderedData = sortData(props.data, columnOnSort);

  const rows = orderedData.map((rowData, index) => {
    console.table(rowData)
    return (
        <StandardTableRow
          key={index}
          columns={props.columns}
          rowData={rowData}
          index={index}
        />
    );
  });

  return (
    <Table sortable onClick={props.onClick}>
      <StandardTableHeader
        columns={props.columns}
        columnOnSort={columnOnSort}
      />
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
}

function getHighlightedColumns(activeType) {
  const typeColumnMap = [
    {
      type: EnumsManager.StockListTypes[0].type,
      column: "avgTotalVolume",
      order: "desc"
    },
    {
      type: EnumsManager.StockListTypes[1].type,
      column: "change",
      order: "desc"
    },
    {
      type: EnumsManager.StockListTypes[2].type,
      column: "change",
      order: "asc"
    }
  ];

  let orderByCol = null;
  typeColumnMap.forEach((value) => {
    if (value.type === activeType) {
      orderByCol = {
        column: value.column,
        order: value.order,
      };
    }
  });

  return orderByCol;
}

function sortData(data, columnOnSort) {
  const column = columnOnSort.column;
  const orderNum = columnOnSort.order === "asc" ? 1 : -1;
  data.sort((a, b) => {
    if (a[column] <= b[column]) {
      return -1 * orderNum;
    }
    return 1 * orderNum;
  });
  return data;
}

StandardTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  activeType: PropTypes.string.isRequired,
};

export { StandardTable }