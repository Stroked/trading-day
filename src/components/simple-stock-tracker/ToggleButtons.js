import React from "react";
import PropTypes from 'prop-types';

function ToggleButtons(props) {
  const activeClass = "active";
  const buttons = props.buttons.map((button) => {
    return <button key={button.type}
                   data-type={button.type}
                   className={props.activeType === button.type ? activeClass : ""}
                   onClick={props.onClick} >
             {button.text}
           </button>;
  });
  return (
    <div className="toggleButtonsContainer">
      {buttons}
    </div>
  );
}

ToggleButtons.propTypes = {
  buttons: PropTypes.array.isRequired,
};

export { ToggleButtons }