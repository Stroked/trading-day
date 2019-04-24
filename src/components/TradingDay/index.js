import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";


import LookUp from "./LookUp";
import ListingInfo from "./ListingInfo";
import BubblePack from "./Visualizations/BubblePack";
import TreeMap from "./Visualizations/TreeMap";
import HeatMap from "./Visualizations/HeatMap";
const TradingDay = props => {
  return (
    <>
      <LookUp />
      <ListingInfo />
      <BubblePack height={600} width={900} />
      <TreeMap height={600} width={900} />
      <HeatMap height={600} width={900} />
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
