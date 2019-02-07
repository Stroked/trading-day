import React from "react";
import PropTypes from 'prop-types';

function NewsSimpleView(props) {
  const news = props.data.map((record, index) => {
    return <li key={record.url}>
            <span className="newsOrder">{index + 1}</span>
            <a title={record.headline} className="truncate newsLink" href={record.url}>{record.headline}</a>
            <span className="releaseDate">{record.datetime.substr(0, 10)}</span>
           </li>;
  });
  return <ul className="newsList">{news}</ul>;
}

NewsSimpleView.propTypes = {
};

export { NewsSimpleView }