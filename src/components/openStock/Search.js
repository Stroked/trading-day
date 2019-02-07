import React from 'react';
import PropTypes from 'prop-types';

const Search = () => {
  return (
    <div className="search">
      <form action="./Stocks" method="get">
        <input
          type="text"
          name="symbol"
          placeholder="Enter Ticker.."
          id="submit"
        />
        <button>
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
};

export default Search;
