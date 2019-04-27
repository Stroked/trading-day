import { TopCorner, Banner, Chart } from "./ethereum";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Segment } from "semantic-ui-react";
import ethereumData from "./ethereum-180d";
import { DataContext } from "../../WithDataContext";
import DarkButtons from "../../../coolook/DarkButtons";

const EthereumChartWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Droid+Sans+Mono");

  .ethereum {
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-color: #f6f0f2;
    font-family: "Droid Sans Mono", monospace;
  }
  .container {
    height: 75vh;
    width: 90vw;
    background-color: #ecc3c7;
    position: relative;
  }
  .chart-container {
    cursor: crosshair;
    height: 100%;
    width: 100%;
  }

  .controls {
  }
`;

export const StylizedCandleStickChart = ({ ticker, data, logo, ...props }) => {
  if (data) {
    const [numItems, setNumItems] = useState(180);
    const [imgSrc, setImgSrc] = useState(logo.url);
    useEffect(() => {
      setImgSrc(logo.url);
    }, [logo.url]);

    const increaseNumItems = () => {
      if (numItems === 500) return;
      setNumItems(numItems + 20);
    };

    const decreaseNumItems = () => {
      if (numItems === 40) return;
      setNumItems(numItems - 20);
    };

  const buckets = data
    .map(b => {
      const { date, open, high, low, close, volume } = b;
      console.log(b);
      return {
        date: new Date(date),
        open: +open,
        high: +high,
        low: +low,
        close: +close,
        volume: +volume,
        hollow: +close > +open
      };
    })
    // .reverse()
    // .slice(0, numItems);
    console.log(buckets);
  const sortedBuckets = buckets.sort((a, b) => {
    return a.date - b.date;
  });
  const maxHighPrice = Math.max(
    ...buckets.map(b => Math.max(...[b.high, b.open, b.close]))
  );
  const minLowPrice = Math.min(
    ...buckets.map(b => Math.min(...[b.low, b.open, b.close]))
  );
  const maxVolume = Math.max(...buckets.map(b => b.volume));

  const start = sortedBuckets[0].date;
  const end = sortedBuckets[sortedBuckets.length - 1].date;
 
    return !data ? (
      <h1>NO DATA</h1>
    ) : (
      <EthereumChartWrapper>
        <div className='ethereum'>
          <div className='container'>
            <div className='chart-container'>
              <Chart
                data={{
                  buckets: sortedBuckets,
                  start,
                  end,
                  maxHighPrice,
                  minLowPrice,
                  maxVolume
                }}
              />
            </div>
            <TopCorner width={150} height={150} tickerSymbol={ticker} />

            <Banner
              logo={imgSrc}
              numItems={numItems}
              increaseNumItems={increaseNumItems}
              decreaseNumItems={decreaseNumItems}
            />
          </div>
        </div>
      </EthereumChartWrapper>
    );
  }
  return null;
};
class Ethereum extends React.Component {
  state = { numItems: 180 };
  // componentDidMount() {
  //   fetch("https://api.cryptowat.ch/markets/gdax/ethusd/ohlc?period=180")
  //     .then(res => res.json())
  //     .then(json => {
  //       // console.log(json);
  //       this.setState({
  //         data: json.result["180"]
  //       });
  //     });
  // }

  increaseNumItems = () => {
    if (this.state.numItems === 500) return;
    this.setState(() => ({ numItems: this.state.numItems + 20 }));
  };

  decreaseNumItems = () => {
    if (this.state.numItems === 40) return;
    this.setState(() => ({ numItems: this.state.numItems - 20 }));
  };

  render() {
    const data = ethereumData["180"];
    const unix = d => new Date(d * 1000);

    const buckets = data
      .map(b => {
        const [
          closeTime,
          openPrice,
          highPrice,
          lowPrice,
          closePrice,
          volume
        ] = b;
        return {
          closeTime: unix(closeTime),
          openPrice,
          highPrice,
          lowPrice,
          closePrice,
          volume,
          hollow: closePrice > openPrice
        };
      })
      .reverse()
      .slice(0, this.state.numItems);

    const sortedBuckets = buckets.sort((a, b) => {
      return a.closeTime - b.closeTime;
    });

    const maxHighPrice = Math.max(
      ...buckets.map(b => Math.max(...[b.highPrice, b.openPrice, b.closePrice]))
    );
    const minLowPrice = Math.min(
      ...buckets.map(b => Math.min(...[b.lowPrice, b.openPrice, b.closePrice]))
    );
    const maxVolume = Math.max(...buckets.map(b => b.volume));

    const start = sortedBuckets[0].closeTime;
    const end = sortedBuckets[sortedBuckets.length - 1].closeTime;
    return !data ? (
      <h1>NO DATA</h1>
    ) : (
      <EthereumChartWrapper>
        <div className='ethereum'>
          <div className='container'>
            <div className='chart-container'>
              <Chart
                data={{
                  buckets: sortedBuckets,
                  start,
                  end,
                  maxHighPrice,
                  minLowPrice,
                  maxVolume
                }}
              />
            </div>
            <TopCorner
              width={150}
              height={150}
              tickerSymbol={this.props.tickerSymbol}
            />
            <Banner
              numItems={this.state.numItems}
              increaseNumItems={this.increaseNumItems}
              decreaseNumItems={this.decreaseNumItems}
            />
          </div>
        </div>
      </EthereumChartWrapper>
    );
  }
}

export default Ethereum;
