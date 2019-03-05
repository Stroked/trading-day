import React from "react";
import styled from "styled-components";
import LookUp from "./LookUp";
import ListingInfo from "./ListingInfo";
import Spotlight from "./Spotlight";

export default props => {
  return (
    <React.Fragment>
      <LookUp />
      <ListingInfo />
      <Spotlight></Spotlight>
    </React.Fragment>
  );
};
