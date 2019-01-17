import React from 'react';
import PropTypes from 'prop-types';

class NewsCard extends React.Component {
  render() {
    const news = this.props.data.map((e, i) => (
      <div className="news-card" key={i}>
        <a href={e['url']}>
          <h2> {e['headline']} </h2>
          <p> {e['summary']} </p>
          <p> {e['source']} </p>
        </a>
      </div>
    ));
    return <div className="news">{news}</div>;
  }
}

export default NewsCard;
