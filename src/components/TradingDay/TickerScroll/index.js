import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import Ticker from "react-ticker";
import {
  Header,
  Icon,
  Container,
  Segment,
  List,
  Label,Divider,Item
} from "semantic-ui-react";

const GetSectorPerformance = () => {
  const [sectors, setSectors] = useState("");
  useEffect(() => {
    async function fetchData() {
      const sectorPerformanceFromAPI = await d3.json(
        `https://www.alphavantage.co/query?function=SECTOR&apikey=TRDGNTGBQG2BI9J0`
      );
      setSectors(sectorPerformanceFromAPI["Rank A: Real-Time Performance"]);
    }
    fetchData();
  }, []);
  // A placeholder is needed, to tell react-ticker, that width and height might have changed
  // It uses MutationObserver internally
  return sectors ? (
    <p style={{ whiteSpace: "nowrap" }}>
      {Object.keys(sectors).map(sector => {
        let sectorPerformance = sectors[sector].substring(
          0,
          sectors[sector].length - 1
        );;
        const isUp = sectorPerformance > 0 ? true : false;

        return (
          <Segment style={{ display: "inline-block" }}>
            {sector.toUpperCase()}:
            {isUp ? (
              <>
                <Icon color='green' name='angle up' />
                <Label
                  style={{ marginLeft: "-5px", marginTop: "-6px" }}
                  horizontal
                  color='green'
                  inverted>
                  {sectors[sector]}
                </Label>
              </>
            ) : (
              <>
                <Icon color='red' name='angle down' />
                <Label
                  style={{ marginLeft: "-5px", marginTop: "-6px" }}
                  horizontal
                  color='red'
                  inverted>
                  {sectors[sector]}
                </Label>
              </>
            )}
            {/* <Divider color="black" vertical /> */}
          </Segment>
        );
      })}
    </p>
  ) : (
    <p style={{ visibility: "hidden" }}>Placeholder</p>
  );
};

function StockTicker() {
  return (
    <Ticker offset='0' speed={5}>
      {() => <GetSectorPerformance />}
    </Ticker>
  );
}

export default StockTicker;
