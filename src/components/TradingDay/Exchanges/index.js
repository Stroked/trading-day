import React, { Component } from "react";
import styled from "styled-components";

const StyleWrapper = styled.div`
  font-weight: 400;
`;

export default class StockMarketExchanges extends Component {
  render() {
    return (
      <StyleWrapper>
        <h1 style={{ marginTop: 0 }}>
          The Relationship Between Stock Exchanges and Indices
        </h1>
        <h2 style={{ marginTop: 0 }}>
          Plotting almost 5,000 U.S. Large Caps on the NYSE, NASDAQ, S&amp;P
          500, and DJIA
        </h2>
        <img
          src='http://2oqz471sa19h3vbwa53m33yj.wpengine.netdna-cdn.com/wp-content/uploads/2016/03/stock-exchanges-and-indices.png'
          alt='The Relationship Between Stock Exchanges and Indices [Chart]'
          scale='0'
        />
        <p>
          The NYSE and NASDAQ are the two
          <a href='http://money.visualcapitalist.com/all-of-the-worlds-stock-exchanges-by-size/'>
            largest stock exchanges
          </a>
          in the world by market capitalization. However, what is their relation
          to major indices such as the S&amp;P 500, S&amp;P 100, and the Dow
          Jones Industrial Average?
        </p>
        <p>
          Today’s chart breaks down the composition of the 4,500+ large cap
          stocks that are traded on the NYSE and NASDAQ, showing how the indices
          are currently derived. (For another refresher, check out our post on
          <a href='http://www.visualcapitalist.com/whats-difference-dow-sp-500-nasdaq/'>
            the difference between the Dow, S&amp;P 500, and the NASDAQ
          </a>
          .)
        </p>
        <p>
          The <strong>S&amp;P 500</strong>, founded in 1923, is considered one
          of the best overall indicators of the U.S. stock market. Composed of
          118 companies from the NASDAQ and 382 companies from the NYSE, it
          represents the 500 companies with the highest market capitalizations
          that have common stock listed on either exchange. The S&amp;P 500 is a
          capitalization-weighted index with components weighted based on the
          total market value of their outstanding shares. The larger the
          company, the more the impact it will have on determining the price of
          the overall index.
        </p>
        <p>
          The <strong>S&amp;P 100</strong> is similar to the S&amp;P 500, but it
          is composed of the 100 largest companies on the market, with 79 from
          the NYSE and 21 from the NASDAQ.
        </p>
        <p>
          Lastly, the <strong>Dow Jones Industrial Average</strong> is made up
          of 30 stocks, with 26 based on the NYSE and 4 based on the NASDAQ. The
          Dow ensures that it picks companies from every industry, while the
          S&amp;P 100 picks the 100 largest companies by market capitalization.
          That’s why Travellers Companies Inc., at a market cap of $34 billion,
          is the only company on the Dow that is not on the S&amp;P 100.
        </p>
      </StyleWrapper>
    );
  }
}
