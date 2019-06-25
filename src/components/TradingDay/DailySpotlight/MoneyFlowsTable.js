import React from "react";
import { Table, Icon, Header } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import * as d3 from "d3";

class MoneyFlowsTable extends React.Component {
  render() {

    /*    
      0: "Company"
  1: "Price"
  2: "Chg"
  3: "% Chg"
  4: "1-wk % chg"
  5: "Money Flow"
  6: "Tick Up"
  7: "Tick Down"
  8: "Up/Down Ratio"
  9: "Money Flow"
  10: "Tick Up"
  11: "Tick Down"
  12: "Up/Down Ratio"
    */
   
    const stats = this.props.data.map((e, i) => {
        let ticker =  e["Company"].split('(').reverse()[0].replace(')','');
        
        
        return (
      <Table.Row key={Math.Random + "-" + i} selectable>
        <Table.Cell textAlign='center'>
          {e["Company"]}
        </Table.Cell>
        <Table.Cell textAlign='center'>
            <Link to={`${ticker}`}> 
                  {ticker}
            </Link>
        </Table.Cell>

        <Table.Cell textAlign='right'>
          {d3.format("$,.2f")(e["Price"])}
        </Table.Cell>

        {e["Chg"] >= 0 ? (
          <Table.Cell className='green' textAlign='right'>
            +{d3.format("$,.2f")(e["Chg"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red' textAlign='right'>
            {d3.format("$,.2f")(e["Chg"])}
          </Table.Cell>
        )}

        {e["% Chg"] >= 0 ? (
          <Table.Cell className='green' green textAlign='left'>
            +{d3.format(".2%")(e["% Chg"])}
          </Table.Cell>
        ) : (
          <Table.Cell className='red' red textAlign='left'>
            {d3.format(".2%")(e["% Chg"]/100)}
            
          </Table.Cell>
        )}

        <Table.Cell textAlign='center'>{e["Up/Down Ratio"]}</Table.Cell>
      </Table.Row>)});
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
              <Table.HeaderCell textAlign='center'>
                Listing
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Ticker
              </Table.HeaderCell>

              <Table.HeaderCell textAlign='right'>Latest</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>
                Change ($)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='left'>
                Change (%)
              </Table.HeaderCell>
              <Table.HeaderCell>Up Down Ratio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{stats}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default  MoneyFlowsTable 