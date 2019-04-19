import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Grid, Item } from 'semantic-ui-react';

const NewsItems = ({ news, slice }) => {
  return (
    <Grid.Row>
      <Grid.Column>
        <Item.Group relaxed link>
          {_.chain(news)
            .slice(0, slice)
            .map(n => {
              return (
                <Item href={n.url} key={n.url} target="_blank">
                  <Item.Content>
                    <Item.Header>{n.headline}</Item.Header>
                    <Item.Meta>{`Via ${n.source}`}</Item.Meta>
                    <Item.Description>{n.summary}</Item.Description>
                    <Item.Extra>
                      {moment(n.datetime).format('dddd, MMMM Do YYYY, h:mm a')}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })
            .value()}
        </Item.Group>
      </Grid.Column>
    </Grid.Row>
  );
};

NewsItems.propTypes = {
  news: PropTypes.array.isRequired,
  slice: PropTypes.number,
};

NewsItems.defaultProps = {
  slice: 5,
};

export default NewsItems;
