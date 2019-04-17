import React, { useContext } from "react";
import { Segment, Header } from "semantic-ui-react";
import { DataContext } from "../components/quotes-ninja/WithDataContext";
import NewsItems from "../components/quotes-ninja/NewsItems";
import StocksSpotlight from "../components/TradingDay/DailySpotlight";
import TickerScroll from "../components/TradingDay/TickerScroll";
import setTitle from "../utils/title";

const Markets = props => {
  const context = useContext(DataContext);
  setTitle(null, null);
  return (
    <Segment><Header>


    <TickerScroll/>

    </Header>
      <StocksSpotlight />
      {!context.fetchingIncidies.loading && (
        <React.Fragment>
          <Header style={{ fontWeight: 300, fontSize: "2rem" }}>
            Latest Headlines
          </Header>
          <NewsItems news={context.indiciesData.news} slice={10} />
        </React.Fragment>
      )}
    </Segment>
  );
};

export default Markets;
