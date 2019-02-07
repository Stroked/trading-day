import React from "react";
import { fetchData } from "./utils";

import { StockQuote } from "./StockQuote";
import { StockNews } from "./StockNews";
import HeikinAshi from "./HeikinAshi";

export class RightPanel extends React.Component {

   state = {
      quote: null,
      news: [],
      chart: []
    };
  

  componentDidMount() {
    this.fetchStockBatchData();
  }

  componentWillReceiveProps() {
    this.fetchStockBatchData();
  }

  fetchStockBatchData=()=> 
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockSymbol}/batch?types=quote,news,chart&range=1y&last=10`)    
    .then(response => response.json())    
    .then(data =>{console.log(data.chart);
        this.setState({
      quote: data.quote,
      news: data.news,
      chart: data.chart
    })})

  render() {

    return (
      <div className="floatPanel rightPanel">
        {this.state.quote ? (
          <StockQuote data={this.state.quote} symbol={this.props.stockSymbol} />
        ) : null}

        <StockNews data={this.state.news} />
        {this.state.chart && this.state.chart.length 
             ?   <HeikinAshi height={700}  data={this.state.chart} type="svg" ticker={this.props.stockSymbol}  xAxis="date" yAxis="volume" /> 
             : <span>No Data...</span>}
        
      </div>
    );
  }
}
