import React from "react";
import PropTypes from 'prop-types';

import { SectionHeader } from "./SectionHeader";
import { QuoteSummary } from "./QuoteSummary";
import { QuoteDetails } from "./QuoteDetails";

export class StockQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const settingBtn = <button key="settings" className="btnSettings" />;
    const title = "Quote" + (this.props.symbol ? " - " + this.props.symbol : "");

    return (
      <div>
        <SectionHeader title={title} buttons={[settingBtn]} collapsible={true} />
        <div className="sectionBody">
          <QuoteSummary data={this.props.data} />
          <QuoteDetails data={this.props.data} />
        </div>
      </div>
    );
  }
}

StockQuote.propTypes = {
};