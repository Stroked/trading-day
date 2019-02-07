import React, { useContext } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import  {DataContext}  from '../components/quotes-ninja/WithDataContext';
import NewsItems from '../components/quotes-ninja/NewsItems';
import setTitle from '../utils/title';

const QuotesHomepage = props => {
  const  context  = useContext(DataContext);
  debugger;
  setTitle(null, null);
  return (
    <Segment>
      {!context.fetchingIncidies.loading && (
        <React.Fragment>
          <Header style={{ fontWeight: 300, fontSize: '2rem' }}>
            Latest Headlines
          </Header>
          <NewsItems news={context.indiciesData.news} slice={10} />
        </React.Fragment>
      )}
    </Segment>
  );
};

export default QuotesHomepage;
