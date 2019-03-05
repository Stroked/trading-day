import React from "react";
import { Component } from "react";

export default class ListingInfo extends Component {
  render() {
    return (
      <table
        width='100%'
        cellpadding='3'
        cellspacing='0'
        border='2'
        className='snapshot-table2'>
        <tbody>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Major index membership'>
              Index
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>S&amp;P 500</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Price-to-Earnings (ttm)'>
              P/E
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>158.80</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              EPS (ttm)
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>0.33</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Insider ownership'>
              Insider Own
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              {" "}
              <b>0.10%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Shares outstanding'>
              Shs Outstand
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>910.05M</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Perf Week
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-4.22%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Market capitalization'>
              Market Cap
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>48.12B</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Forward Price-to-Earnings (next fiscal year)'>
              Forward P/E
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>9.40</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              EPS next Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>5.62</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Insider transactions (6-Month change in Insider Ownership)'>
              Insider Trans
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>0.20%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Shares float'>
              Shs Float
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>896.81M</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Perf Month
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>1.34%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Income (ttm)'>
              Income
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>366.00M</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Price-to-Earnings-to-Growth'>
              PEG
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>4.35</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='EPS estimate for next quarter'>
              EPS next Q
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>1.24</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Institutional ownership'>
              Inst Own
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>89.10%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Short interest share'>
              Short Float
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>1.96%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Performance (Quarter)'>
              Perf Quarter
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-3.01%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Revenue (ttm)'>
              Sales
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>48.85B</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              P/S
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>0.99</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              EPS this Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>194.50%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Institutional transactions (3-Month change in Institutional Ownership)'>
              Inst Trans
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-0.36%</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Short Ratio
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>3.03</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Performance (Half Year)'>
              Perf Half Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-11.02%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Book value per share (mrq)'>
              Book/sh
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>69.16</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              P/B
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>0.76</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='EPS growth next year'>
              EPS next Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>15.36%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Return on Assets (ttm)'>
              ROA
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-1.30%</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Target Price
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>62.87</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Performance (Year)'>
              Perf Year
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-16.61%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Cash per share (mrq)'>
              Cash/sh
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>2.31</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              P/C
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>22.88</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Long term annual growth estimate (5 years)'>
              EPS next 5Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>36.47%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Return on Equity (ttm)'>
              ROE
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-9.20%</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              52W Range
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <small>49.57 - 67.30</small>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Performance (Year To Date)'>
              Perf YTD
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-11.25%</span>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Dividend (annual)'>
              Dividend
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>1.28</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              P/FCF
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Annual EPS growth past 5 years'>
              EPS past 5Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-20.20%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Return on Investment (ttm)'>
              ROI
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>1.90%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Distance from 52-Week High'>
              52W High
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-21.43%</span>
              </b>
            </td>
            <td width='7%' class='snapshot-td2-cp' align='left' title='Beta'>
              Beta
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>1.23</b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Dividend yield (annual)'>
              Dividend %
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>2.42%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Quick Ratio (mrq)'>
              Quick Ratio
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Annual sales growth past 5 years'>
              Sales past 5Y
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-7.10%</span>
              </b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Gross Margin
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Distance from 52-Week Low'>
              52W Low
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#008800" }}>6.68%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Average True Range (14)'>
              ATR
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>0.91</b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Full time employees'>
              Employees
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>49800</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Current Ratio (mrq)'>
              Current Ratio
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Quarterly revenue growth (yoy)'>
              Sales Q/Q
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-7.00%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Operating Margin (ttm)'>
              Oper. Margin
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>4.30%</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Relative Strength Index'>
              RSI (14)
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>36.12</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Volatility (Week, Month)'>
              Volatility
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <small>1.71% 1.56%</small>
              </b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Stock has options trading on a market exchange'>
              Optionable
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>Yes</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Total Debt to Equity (mrq)'>
              Debt/Eq
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>0.54</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Quarterly earnings growth (yoy)'>
              EPS Q/Q
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-13.90%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Net Profit Margin (ttm)'>
              Profit Margin
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-13.00%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Relative volume'>
              Rel Volume
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>0.65</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Prev Close
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>53.64</b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Stock available to sell short'>
              Shortable
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>Yes</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Long Term Debt to Equity (mrq)'>
              LT Debt/Eq
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>0.54</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Earnings date<br><br>BMO = Before Market Open<br>AMC = After Market Close'>
              Earnings
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>Aug 01 AMC</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Dividend Payout Ratio (ttm)'>
              Payout
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>-</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Average volume (3 month)'>
              Avg Volume
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>5.81M</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Current stock price'>
              Price
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>52.88</b>
            </td>
          </tr>
          <tr className='table-dark-row'>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title="Analysts' mean recommendation (1=Buy 5=Sell)">
              Recom
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>2.20</b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Distance from 20-Day Simple Moving Average'>
              SMA20
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-2.70%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Distance from 50-Day Simple Moving Average'>
              SMA50
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-2.58%</span>
              </b>
            </td>
            <td
              width='7%'
              class='snapshot-td2-cp'
              align='left'
              title='Distance from 200-Day Simple Moving Average'>
              SMA200
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-9.50%</span>
              </b>
            </td>
            <td width='7%' class='snapshot-td2-cp' align='left' title='Volume'>
              {" "}
              Volume
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>3,771,433</b>
            </td>
            <td width='7%' className='snapshot-td2-cp' align='left' title=''>
              Change
            </td>
            <td width='8%' className='snapshot-td2' align='left'>
              <b>
                <span style={{ color: "#aa0000" }}>-1.42%</span>
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
