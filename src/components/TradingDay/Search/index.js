import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { connectAutoComplete } from 'react-instantsearch-dom';
import { withRouter } from 'react-router-dom';
import { Segment,Search, Image,Container } from 'semantic-ui-react';


const formatHits = hits => {
  return _.chain(hits)
    .map(h => {
      return { title: h.Symbol, description: h.Description };
    })
    .slice(0, 10)
    .value();
};

const SearchInput = props => {
  const [val, setVal] = useState('');

  const onChange = (e, { value }) => {
    setVal(value);
    props.refine(value);
  };

  const onSelect = (e, { result }) => {
    setVal(result.title);
    props.history.push({
      pathname: `${result.title.toLowerCase()}`
    });
  };

  return (
    // <Segment attached="top" inverted padded="false" color='black'>
      <Search color="black"
        transparent
        icon='search'
        iconPosition='left'
        style={{ width: "100%" }}
        fluid
        input={{ style: { width: "100%" } }}
        size='large'
        placeholder='Enter Company or Symbol'
        value={val}
        onSearchChange={onChange}
        onResultSelect={onSelect}
        results={formatHits(props.hits)}
      />
    // </Segment>
  );
};
      {/* <Image src={algolia} size="mini" title="Search by Algolia" /> */}

SearchInput.propTypes = {
  refine: PropTypes.func.isRequired,
  hits: PropTypes.array.isRequired
};

export default connectAutoComplete(withRouter(SearchInput));
