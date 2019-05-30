import React from "react";
import { Table, Icon, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import * as d3 from "d3";
class StatisticsTable extends React.Component {
  render() {
    const stats = this.props.data.map((e, i) => (
      <Table.Row key={Math.Random + "-" + i} selectable>
        <Table.Cell textAlign='center' selectable>
          <Link to={"/" + e["symbol"]}>{e["symbol"]}</Link>
        </Table.Cell>

        <Table.Cell textAlign='right'>
          {d3.format("$,.2f")(e["latestPrice"])}{" "}
        </Table.Cell>

        {e["change"] >= 0 ? (
          <Table.Cell className='green' textAlign='right'>
            +{d3.format("$,.2f")(e["change"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red' textAlign='right'>
            {d3.format("$,.2f")(e["change"])}
          </Table.Cell>
        )}

        {e["changePercent"] >= 0 ? (
          <Table.Cell className='green' textAlign='left'>
            +{d3.format(".2%")(e["changePercent"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red' textAlign='left'>
            {d3.format(".2%")(e["changePercent"])}
          </Table.Cell>
        )}

        <Table.Cell textAlign='center'>
          {" "}
          {d3.format(".2s")(e["latestVolume"])}{" "}
        </Table.Cell>
      </Table.Row>
    ));
    const { name, color, ...rest } = this.props;
    return (
      <div className='statisticsTable card'>
        <Header textAlign='center' color={color} as='h2' attached='top'>
          <Icon name={this.props.icon} />
          {this.props.name}
        </Header>
        <Table color={color} {...rest}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Symbol</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Latest</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Change ($)</Table.HeaderCell>
              <Table.HeaderCell textAlign='left'>Change (%)</Table.HeaderCell>
              <Table.HeaderCell>Volume</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{stats}</Table.Body>
        </Table>
      </div>
    );
  }
}

// export default withRouter(StatisticsTable);
export default StatisticsTable;
