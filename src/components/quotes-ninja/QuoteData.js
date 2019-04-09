import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

import StatsPrice from "./StatsPrice";
import StatsDetails from "./StatsDetails";
import Chart from "./Chart";
import NewsItems from "./NewsItems";

import NotFound from "./NotFound";

import {quoteFormatting} from "../../utils/format";
import setTitle from "../../utils/title";

import placeholder from "../../assets/iex-logo.png";
import HeikinAshi from "../simple-stock-tracker/HeikinAshi";

const QuoteData = props => {
  if (props.data && props.charts) {
    // format quote data
    const { quote, stats, logo, news } = props.data;

    const display = quoteFormatting(quote, stats);
    setTitle(display.symbol, display.latestPrice);

    // set img
    const [imgSrc, setImgSrc] = useState(logo.url);
    useEffect(() => {
      setImgSrc(logo.url);
    }, [logo.url]);

    const handleErr = e => {
      setImgSrc(placeholder);
    };
    console.log(props.charts);
    return (
      <div>
        <Image src={imgSrc} size='tiny' centered onError={handleErr} />
        <Header size='huge' textAlign='center'>
          {display.symbol}
          <Header.Subheader>{display.companyName}</Header.Subheader>
        </Header>
        <StatsPrice
          last={display.latestPriceSimple}
          change={display.change}
          percent={display.changePercent}
          color={display.status}
        />
        <Segment basic>
          <Grid stackable>
            <StatsDetails data={display} />
            <HeikinAshi
              height={600}
              data={props.charts["m1"]}
              type='hybrid'
              ticker={display.symbol}
              xAxis='date'
              yAxis='volume'
            />
            {/* <Chart charts={props.charts} display={display} /> */}
            <NewsItems news={news} />
          </Grid>
        </Segment>
      </div>
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
