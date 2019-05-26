import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import { Rail, Grid, Segment, Header, Image, Label } from "semantic-ui-react";

import Clock from "react-live-clock";

import StatsPrice from "./StatsPrice";
import StatsDetails from "./StatsDetails";
import DarkButtons from "../../coolook/DarkButtons";
import NewsItems from "../News";

import NotFound from "../NotFound";
import LineChart from "../Charts/LineChart";

import { quoteFormatting } from "../../../utils/format";
import setTitle from "../../../utils/title";

import HeikinAshi from "../Charts/HeikinAshi";
import { StylizedCandleStickChart } from "../Charts/StylizedCandlestick";

const PeerPerformance = ({ peers, peerData }) => {
  return peers.map((peer, i) => (
    <LineChart
      style={{ display: "inlineBlock" }}
      key={`${i}-${peerData[peer].quote.symbol}`}
      name={peerData[peer].quote.symbol}
      companyName={peerData[peer].quote.companyName}
      data={peerData[peer].chart}
      latestPrice={peerData[peer].quote.latestPrice}
      changePercent={peerData[peer].quote.changePercent}
      volume={peerData[peer].quote.latestVolume}
      width='150'
      height='75'
    />
  ));
};

const QuoteData = props => {
  if (props.data) {
    // format quote data
    const { quote, stats, logo, news } = props.data;

    const display = quoteFormatting(quote, stats);
    setTitle(display.symbol, display.latestPrice);
 
    console.log(logo);
    const [activePeriod, setActivePeriod] = useState("1Y");
    const [imgSrc, setImgSrc] = useState(logo.url);
    useEffect(() => {
      setImgSrc(logo.url);
    }, [logo.url]);

    //when chart range changed, get new chart data
    useEffect(() => {
      props.rangeData(display.symbol, activePeriod);
    }, [activePeriod]);



    return (
      <Segment>
        <Grid columns={3}>
          <Grid.Column width={2}>
            {imgSrc ? (
              <Image
                onError={e => setImgSrc(null)}
                bottom
                src={imgSrc}
                size='small'
              />
            ) : null}
          </Grid.Column>
          <Grid.Column width={11}>
            <Header
              style={{
                fontFamily: "Dancing Script",
                fontSize: "4vw",
                fontWeight: "800"
              }}
              textAlign='center'>
              {display.companyName} ({display.symbol})
            </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <StatsPrice
              last={display.latestPriceSimple}
              change={display.change}
              percent={display.changePercent}
              color={display.status}
            />
            {/* <Rail attached position='right'>
              <Label>
                <Clock
                  format={"HH:mm:ss"}
                  ticking={true}
                  timezone={"America/New_York"}
                  interval={1000}
                />
              </Label>
            </Rail> */}
          </Grid.Column>
        </Grid>

        <Segment basic>
          <Grid stackable>
            {props.chartData ? (
              <>
                {/* {console.log(ohlcData)} */}
                <div
                  style={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    position: "block",
                    border: "2px solid "
                  }}>
                  <HeikinAshi
                    style={{ margin: "auto" }}
                    height={600}
                    data={props.chartData.d}
                    type='hybrid'
                    ticker={display.symbol}
                    xAxis='date'
                    yAxis='volume'
                  />
                </div>

                <DarkButtons
                  default={"ytd"}
                  timeRangeArray={[
                    "d1",
                    "m1",
                    "m3",
                    "m6",
                    "y1",
                    "y5",
                    "ytd"
                  ]}
                  clickEffect={e => {
                    //hook-dependency
                    setActivePeriod(e);
                  }}
                />
                <StatsDetails data={display} />
                <Segment>
                  <StylizedCandleStickChart
                    height={600}
                    width={900}
                    data={props.chartData.d}
                    ticker={display.symbol}
                    logo={imgSrc}
                  />
                </Segment>
              </>
            ) : (
              "NO OHLC DATA"
            )}

            <Segment>
              {props.peers ? (
                <PeerPerformance
                  peers={props.peers.peers}
                  peerData={props.peers.peerData}
                />
              ) : (
                <h1>NO PEERS</h1>
              )}
            </Segment>
            <NewsItems news={news} />
          </Grid>
        </Segment>
      </Segment>
    );
  }

  return <NotFound />;
};

QuoteData.propTypes = {
  symbol: PropTypes.string,
  data: PropTypes.object
};

QuoteData.defaultProps = {
  symbol: null,
  data: {}
};

export default QuoteData;
