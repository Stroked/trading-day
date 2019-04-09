import _ from "lodash";
import React, { Component } from "react";
import { Table } from "semantic-ui-react";

const tableData = [
  { name: "John", age: 15, gender: "Male" },
  { name: "Amber", age: 40, gender: "Female" },
  { name: "Leslie", age: 25, gender: "Female" },
  { name: "Ben", age: 70, gender: "Male" }
];

export default class SpotLightTable extends Component {
  state = {
    column: null,
    data: this.props.data,
    direction: null
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "company name" ? direction : null}
              onClick={this.handleSort("company name")}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "symbol" ? direction : null}
              onClick={this.handleSort("symbol")}>
              Age
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "sector" ? direction : null}
              onClick={this.handleSort("sector")}>
              Gender
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ ticker, name, sector }) => (
            <Table.Row key={name}>
              <Table.Cell>{ticker}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{sector}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
