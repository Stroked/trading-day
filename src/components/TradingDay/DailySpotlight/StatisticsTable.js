import React from "react";
import { Table } from "semantic-ui-react";
import * as d3 from "d3";
class StatisticsTable extends React.Component {
  render() {
    const stats = this.props.data.map((e, i) => (
      <Table.Row key={i}>
        <Table.Cell>
          <a href={"/Stocks?symbol=" + e["symbol"]}>{e["symbol"]}</a>
        </Table.Cell>
        <Table.Cell textAlign="right"> {d3.format("$,.2f")(e["latestPrice"])} </Table.Cell>
        {e["change"] >= 0 ? (
          <Table.Cell className='green'>        
            +{d3.format("$,.2f")(e["change"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red'>
            {d3.format("$,.2f")(e["change"])}
          </Table.Cell>
        )}
        {e["changePercent"] >= 0 ? (
          <Table.Cell className='green'>
            +{d3.format(".2%")(e["changePercent"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red'>
            {d3.format(".2%")(e["changePercent"])}
          </Table.Cell>
        )}
        <Table.Cell> {d3.format(".2s")(e["latestVolume"])} </Table.Cell>
      </Table.Row>
    ));
    const { name, color, ...rest } = this.props;
    return (
      <div className='statisticsTable card'>
        <h2> {name} </h2>
        <Table color={color} {...rest}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Latest</Table.HeaderCell>
              <Table.HeaderCell>Change ($)</Table.HeaderCell>
              <Table.HeaderCell>Change (%)</Table.HeaderCell>
              <Table.HeaderCell>Volume</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{stats}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default StatisticsTable;
