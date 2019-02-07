import React from "react";
import PropTypes from 'prop-types';

export class SectionHeader extends React.Component {
 

  handleHeaderClick=(e)=> {
    const isHeader = e.target.classList.contains("sectionHeader");
    if (isHeader) {
      // toggle arrow orientation
      if (this.props.collapsible) {
        e.target.classList.toggle("collapsed");
      }
      // toggle body visibility
      const sectionBody = e.target.nextElementSibling;
      const hasBody = sectionBody.classList.contains("sectionBody");
      if (hasBody) {
        sectionBody.classList.toggle("hidden");
      }
    }
  }

  render() {
    const className = "sectionHeader" + (this.props.collapsible ? " collapsible" : "");
    let btnsContainer = null;
    if (this.props.buttons !== null) {
      btnsContainer = <div className="btnsContainer">
                        {this.props.buttons}
                      </div>;
    }

    return (
      <div className={className} onClick={e=>this.handleHeaderClick(e)} >
        {this.props.title}
        {btnsContainer}
      </div>
    );
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired, // the "isRequired" will check if the prop is undefined/null by '===', so empty string will pass this check
  buttons: PropTypes.array,
};