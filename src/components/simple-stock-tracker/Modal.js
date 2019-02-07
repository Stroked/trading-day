import React from "react";
import PropTypes from 'prop-types';

function Modal(props) {
  // if (!props.content) {
  //   return null;
  // }
  return (
    <div className="modalWrapper">
      <div className="modal">
        <div className="modalHeader">{props.title}</div>
        <div className="modalBody">{props.content}</div>
        <div className="modalFooter">{props.footerBtns}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  footerBtns: PropTypes.array,
};

export { Modal }