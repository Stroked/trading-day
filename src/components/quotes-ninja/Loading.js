import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = props => {
  return props.page ? (
    <Dimmer active page={false}>
      <Loader inline content={props.content} />
    </Dimmer>
  ) : (
    <Loader inline active content={props.content} />
  );
};

Loading.propTypes = {
  page: PropTypes.bool,
  content: PropTypes.string,
};

Loading.defaultProps = {
  page: true,
  content: 'Loading...',
};

export default Loading;
