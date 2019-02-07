import React from "react";
import PropTypes from 'prop-types';

import { SectionHeader } from "./SectionHeader";
import { NewsSimpleView } from "./NewsSimpleView";
import { NewsComplexView } from "./NewsComplexView";
import { SlideButton } from "./SlideButton";

export class StockNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleView: true,
    }
  }

  handleSimpleViewToggleClick() {
    this.setState((prevState) => { 
      return { simpleView: !prevState.simpleView }
    });
  }

  render() {
    const slideBtn = <SlideButton key="settings"
                                  className="btnSettings"
                                  text="Compact View"
                                  onChange={this.handleSimpleViewToggleClick.bind(this)} />;
    const title = "News";
    const news = this.state.simpleView ? <NewsSimpleView data={this.props.data} /> : <NewsComplexView data={this.props.data} />;
    return (
      <div>
        <SectionHeader title={title} buttons={[slideBtn]} collapsible={true} />
        <div className="sectionBody">
          {news}
        </div>
      </div>
    );
  }
}

StockNews.propTypes = {
  data: PropTypes.array.isRequired
};