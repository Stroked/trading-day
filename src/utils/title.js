const setTitle = (symbol, quote) => {
  let title = '';
  if (symbol && quote) {
    title = `${symbol} - ${quote}`;
  } else {
    title = 'TradingDay.By.Ajay';
  }

  document.title = title;
  return title;
};

export default setTitle;
