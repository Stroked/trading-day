import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LookUp from "./LookUp";
import ListingInfo from "./ListingInfo";
import Spotlight from "./Spotlight";
import {quoteFormatting }from '../../utils/format'
import setTitle from "../../utils/title";
import placeholder from "../../assets/orange-wheel-art-800x800.png";
export default props => {
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
  return (
    <React.Fragment>
      <LookUp />
      <ListingInfo />
      <Spotlight></Spotlight>
    </React.Fragment>
  );
  }
