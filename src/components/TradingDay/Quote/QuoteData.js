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
import StylizedCandleStickChart from "../Charts/StylizedCandlestick";

const PeerPerformance = ({ peers, peerData }) => {
  // console.log(peerData)
  return peers.map((peer, i) => (
  !peerData[peer] ? null :
    !peerData[peer].chart.length>0 ? null :
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

const fetchChartData = activePeriod=>{

}


const QuoteData = props => {
  // format quote data
  const { quote, stats, logo, news } = props.data.quote;
  const rangeButtons = Object.keys(props.data.rangeData);
  const display = quoteFormatting(quote, stats);
  setTitle(display.symbol, display.latestPrice);

  const [activePeriod, setActivePeriod] = useState("YTD");
  const [imgSrc, setImgSrc] = useState(null);
  // useEffect(()=>{
  //   const fetcher =async p=>{
  //    data = await d3.json(`http://cors-anywhere.herokuapp.com/`);
  //   }

  // },[activePeriod])


  useEffect(() => {
    setImgSrc(logo.url);
  }, [logo.url]);

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

      <Grid stackable>
        {
            !props.data.rangeData? null :
          <>
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                position: "block"
              }}>
              {console.log(props.data)}
              <HeikinAshi
                style={{ margin: "auto" }}
                height={600}
                data={props.data.rangeData[activePeriod]}
                type='hybrid'
                ticker={display.symbol}
                xAxis='date'
                yAxis='volume'
              />
            </div>
            <DarkButtons
              default={"YTD"}
              timeRangeArray={rangeButtons}
              clickEffect={setActivePeriod}
              // onClick={e=>e.stopPropogation()}
            />
            <StatsDetails data={display} />
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                position: "block"
              }}>
              <StylizedCandleStickChart
                style={{ margin: "auto" }}
                height={600}
                data={props.data.rangeData[activePeriod]}
                ticker={display.symbol}
                logo={imgSrc}
              />
            </div>
          </>
        }

        {/* <Segment>
        {console.log(props.peers)}
          {props.peers ? (
            <PeerPerformance
              peers={props.peers.peers}
              peerData={props.peers.peerData}
            />
          ) : (
            <h1>NO PEERS</h1>
          )}
        </Segment> */}
        <NewsItems news={news} />
      </Grid>
    </Segment>
  );
};


class Quote extends React.Component {
  state = {
    activePeriod: "YTD"
  };

  updateChart = async activePeriod => {
    await this.props.rangeData(this.state.display.symbol, activePeriod);
  };
  componentDidMount() {
    if (this.props.data) {
      // format quote data
      const { quote, stats, logo, news } = this.props.data;
      const display = quoteFormatting(quote, stats);
      setTitle(display.symbol, display.latestPrice);
      this.setState({ display, imgSrc: logo.url, news });
    }
  }

  componentDidUpdate() {}
  render() {
    return (
      <Segment>
        <Grid columns={3}>
          <Grid.Column width={2}>
            {this.state.imgSrc ? (
              <Image
                onError={e => null}
                bottom
                src={this.state.imgSrc}
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
              {this.state.display.companyName} ({this.state.display.symbol})
            </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <StatsPrice
              last={this.state.display.latestPriceSimple}
              change={this.state.display.change}
              percent={this.state.display.changePercent}
              color={this.state.display.status}
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

        <Grid stackable>
          <>
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                position: "block"
              }}>
              <HeikinAshi
                style={{ margin: "auto" }}
                height={600}
                data={this.props.chartData.d}
                type='hybrid'
                ticker={this.state.display.symbol}
                xAxis='date'
                yAxis='volume'
              />
            </div>
            <DarkButtons
              default={"ytd"}
              timeRangeArray={["d1", "m1", "m3", "m6", "y1", "y5", "ytd"]}
              clickEffect={this.updateChart}
            />
            <StatsDetails data={this.state.display} />
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                position: "block"
              }}>
              <StylizedCandleStickChart
                style={{ margin: "auto" }}
                height={600}
                data={[...this.props.chartData.d]}
                ticker={[...this.state.display.symbol]}
                logo={[...this.state.imgSrc]}
              />
            </div>
          </>

          <Segment>
            {this.props.peers ? (
              <PeerPerformance
                peers={this.props.peers.peers}
                peerData={this.props.peers.peerData}
              />
            ) : (
              <h1>NO PEERS</h1>
            )}
          </Segment>
          <NewsItems news={this.state.news} />
        </Grid>
      </Segment>
    );
  }
}

export {Quote};
export default QuoteData;
