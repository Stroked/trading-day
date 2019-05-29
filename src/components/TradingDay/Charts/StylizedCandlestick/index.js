import { default as TopCorner } from "./topcorner/TopCorner";
import { default as Banner } from "./banner/Banner";
import { default as Chart } from "./chart/CandleStickChart";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Droid+Sans+Mono");

  .stylizedCandleStick {

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-content: center;
    
    /* background-color: #f6f0f2; */
    font-family: "Droid Sans Mono", monospace;
    padding:0;
    margin:0;
  }
  .container {
    height: 75vh;
    width: 95vw;
    /* background-color: #ecc3c7; */
    position: relative;
  }
  .chart-container {
    cursor: crosshair;
    height: 100%;
    width: 100%;
  }
`;

const StylizedCandleStickChart = ({ ticker, data, logo, ...props }) => {
  if (data) {
    const [numItems, setNumItems] = useState(180);
    const [imgSrc, setImgSrc] = useState(logo);
    useEffect(() => {
      setImgSrc(logo);
    }, [logo]);

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
      .reverse()
      .slice(0, numItems);
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
      <StyleWrapper>
        <div className='stylizedCandleStick'>
          <div className='container' width={props.width}>
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
      </StyleWrapper>
    );
  }
  return null;
};

export default StylizedCandleStickChart;
