import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import {
  Rail,
  Grid,
  Segment,
  Header,
  Image,
  Label
} from "semantic-ui-react";

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
export const makeApiCall = async (symbol, period = "1y") => {
  let timeParser = d3.timeParse("%Y-%m-%d");
  if (period === "1d") timeParser = d3.timeParse("%Y%m%d%H:%M");

  let prices = [];
  let times = [];
  const d = await d3.json(
    `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`
  );
  console.log(symbol, period);
  console.log(d);
  debugger;
  // Check for failure to retry.
  if (d[0]["date"] == null) {
    makeApiCall(symbol, period);
    return;
  }

  for (let i = 0; i < d.length; i++) {
    if (d[i]["marketNumberOfTrades"] === 0 || d[i]["marketAverage"] === -1) {
      d.splice(i, 1);
      i--;
      continue;
    }

    if (period === "1d") {
      d[i]["close"] = d[i]["marketAverage"];
      d[i]["date"] = timeParser(d[i]["date"] + d[i]["minute"]);
    } else {
      d[i]["date"] = timeParser(d[i]["date"]);
    }

    times.push(d[i]["date"]);
    prices.push(d[i]["close"]);
  }

  return { times, prices, d };

  // this.setState({
  //   fetched: true,
  //   times: times,
  //   prices: prices,
  //   interval: frequency,
  //   d: d
  // });
};

const QuoteData = props => {
  if (props.data) {
    // format quote data
    const { quote, stats, logo, news } = props.data;

    const display = quoteFormatting(quote, stats);
    setTitle(display.symbol, display.latestPrice);
    const [ohlcData, setOhlc] = useState(null);

    const [activePeriod, setActivePeriod] = useState("1Y");
    const [imgSrc, setImgSrc] = useState(logo.url);
    useEffect(() => {
      setImgSrc(logo.url);
    }, [logo.url]);
    useEffect(() => {
      const fetchData = async (symbol, range) => {
        const data = await makeApiCall(symbol, range);

        setOhlc(data);
      };
      fetchData(display.symbol, activePeriod);
    }, [activePeriod]);

    if (props.requestedRangeData)
    {
      console.log("THIS IS THE REQUESTED DATA")
      console.log(props.requestedRangeData);
      debugger;
    }
      return (
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={3}>
              {imgSrc ? <Image bottom src={imgSrc} size='small' /> : null}
            </Grid.Column>
            <Grid.Column width={12}>
              <Header
                style={{
                  fontFamily: "Dancing Script",
                  fontSize: "4vw",
                  fontWeight: "800"
                }}
                textAlign='center'>
                {display.companyName} ({display.symbol})
              </Header>
              <StatsPrice
                last={display.latestPriceSimple}
                change={display.change}
                percent={display.changePercent}
                color={display.status}
              />
              <Rail attached position='right'>
                <Label>
                  <Clock
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={"America/New_York"}
                    interval={1000}
                  />
                </Label>
              </Rail>
            </Grid.Column>
          </Grid>

          <Segment basic>
            <Grid stackable>
              <StatsDetails data={display} />
              <DarkButtons
                default={"ytd"}
                timeRangeArray={["d1", "m1", "m3", "m6", "y1", "y5", "ytd"]}
                clickEffect={setActivePeriod}
              />
              {ohlcData ? (
                <>
                  <HeikinAshi
                    height={500}
                    data={ohlcData.d}
                    type='hybrid'
                    ticker={display.symbol}
                    xAxis='date'
                    yAxis='volume'
                  />
                  <Segment>
                    <StylizedCandleStickChart
                      height={600}
                      width={900}
                      data={ohlcData.d}
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
