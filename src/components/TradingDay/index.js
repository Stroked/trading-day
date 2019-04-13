import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";


import LookUp from "./LookUp";
import ListingInfo from "./ListingInfo";
import Spotlight from "./Spotlight";
import { DataContext } from "../quotes-ninja/WithDataContext";
import QuoteData  from "../quotes-ninja/QuoteData";
import {Segment} from 'semantic-ui-react';
import { quoteFormatting } from "../../utils/format";
import setTitle from "../../utils/title";
import placeholder from "../../assets/orange-wheel-art-800x800.png";
const TradingDay = props => {
  const {
    symbol,
    fetchingQuote,
    fetchingIncidies,
    handleSymbolChange,
    quoteData
  } = useContext(DataContext);

  useEffect(() => {
    if (props.symbol && props.symbol !== symbol)
      handleSymbolChange(props.symbol);
  }, [props.symbol, symbol]);
  return (
    <>
      <Segment
        loading={fetchingQuote.loading && !fetchingIncidies.loading}
        style={{ minHeight: "300px" }}>
        {!fetchingQuote.loading && (
          <QuoteData
            symbol={symbol}
            data={quoteData.quote}
            charts={quoteData.charts}
          />
        )}
      </Segment>{" "}
      <LookUp />
      <ListingInfo />
      <Spotlight />
    </>
  );
};

export default TradingDay
//  if (props.data && props.charts) {
//   // format quote data
//   const { quote, stats, logo, news } = props.data;

//   const display = quoteFormatting(quote, stats);
//   setTitle(display.symbol, display.latestPrice);

//   // set img
//   const [imgSrc, setImgSrc] = useState(logo.url);
//   useEffect(() => {
//     setImgSrc(logo.url);
//   }, [logo.url]);

//   const handleErr = e => {
//     setImgSrc(placeholder);
//   };
