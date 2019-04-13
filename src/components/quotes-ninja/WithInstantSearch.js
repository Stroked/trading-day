import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-dom';

const WithInstantSearch = ({ children }) => {
  return (
    <InstantSearch
      appId='33EO0JJW59'
      apiKey='82086de1fc1c9cc49784f09a485074ba'
      indexName='LISTINGS'>
      {children}
    </InstantSearch>
  );
};

WithInstantSearch.propTypes = {
  children: PropTypes.element.isRequired
};

export default WithInstantSearch;
