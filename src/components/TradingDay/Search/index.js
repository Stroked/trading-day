import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import { connectAutoComplete } from "react-instantsearch-dom";
import { withRouter } from "react-router-dom";
import { Search, Label, Message } from "semantic-ui-react";

const formatHits = hits => {
  return _.chain(hits)
    .map(h => {
      return { ticker: h.Symbol, name: h.Description };
    })
    .slice(0, 5)
    .value();
};
const resultRenderer = ({ ticker, name }) => (
    <><Label>{ticker}</Label>
  <span style={{ fontWeight: "400", fontSize: "10px", letterSpacing: 0, margin:0, paddingLeft:'5px' }}>
     <i>{name}</i>
  </span></>
);
const SearchInput = props => {
  const [val, setVal] = useState("");

  const onChange = (e, { value }) => {
    setVal(value);
    props.refine(value);
  };

  const onSelect = (e, { result }) => {
    setVal(result.ticker);
    props.history.push({
      pathname: `${result.ticker.toLowerCase()}`
    });
  };

  return (
    <Search
      color='black'
      transparent
      icon='search'
      iconPosition='right'
      style={{ width: "100%" }}
      fluid
      input={{ style: { width: "100%" } }}
      size='small'
      placeholder='Enter Company or Symbol'
      value={val}
      onSearchChange={_.debounce(onChange, 2000, {
        leading: true
      })}
      selectFirstResult
      onResultSelect={onSelect}
      results={formatHits(props.hits)}
      resultRenderer={resultRenderer}
    />
  );
};

SearchInput.propTypes = {
  refine: PropTypes.func.isRequired,
  hits: PropTypes.array.isRequired
};

export default connectAutoComplete(withRouter(SearchInput));
