import React from 'react';
import NotFound from "../components/TradingDay/NotFound";
import setTitle from '../utils/title';

const NotFoundPage = () => {
  setTitle(null, null);
  return <NotFound />;
};

export default NotFoundPage;
