import React from "react";
import PropTypes from 'prop-types';

function SlideButton(props) {
  return (
    <div className="slideButtonContainer">
      <span>{props.text}</span>
      <label className="switch">
        <input type="checkbox" onChange={props.onChange} />
        <span className="slider round" />
      </label>
    </div>
  );
}

SlideButton.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export { SlideButton }