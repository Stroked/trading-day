import React from "react";
import PropTypes from 'prop-types';

function NewsComplexView(props) {
  const news = props.data.map((record, index) => {
    const dateTime = new Date(record.datetime).toLocaleString();
    return <li className="newsItem" key={record.url}>
            <a title={record.headline} 
               className="truncate newsLink"
               href={record.url}>
              {record.headline}
            </a>
            <div className="summary">{record.summary}</div>
            <span className="releaseDate">{dateTime}</span> . <span className="source">{record.source}</span>
           </li>;
  });
  return <ul className="newsList complexView">{news}</ul>;
}

NewsComplexView.propTypes = {
};

export { NewsComplexView }