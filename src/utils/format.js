import _ from 'lodash';
import numeral from 'numeral';

export const price = price => {
  return numeral(price).format('$0,0.00');
};

export const priceSimple = price => {
  return numeral(price).format('0,0.00');
};

export const percent = percent => {
  return numeral(percent).format('+0.00%');
};

export const dividend = percent => {
  return numeral(percent / 100).format('0.00%');
};

export const formatNumber = num => {
  return numeral(num).format('0.00a');
};

export const numRounded = num => {
  return numeral(num).format('0,0');
};

export const formatBigPrice = cap => {
  return numeral(cap).format('(0.0a)');
};

export const formatBigPriceNoDecimal = cap => {
  return numeral(cap).format('($0a)');
};

export const color = num => {
  if (num > 0) {
    return 'green';
  } else if (num < 0) {
    return 'red';
  }
  return 'black';
};

export const calcPercCh = (close, last) => {
  const num = (last - close) / close;
  return { num, perc: percent(num), color: color(num) };
};

export const upper = symbol => {
  return _.toUpper(symbol);
};

export const chartUpDown = (range, data, display) => {
  if (range === 'd1') {
    // const last = _.has(_.last(data), 'marketChangeOverTime')
    //   ? _.last(data).marketChangeOverTime
    //   : 0;
    return { up: display.up , perc: display.changePercent };
  }
  const last = _.has(_.last(data), 'changeOverTime') ? _.last(data).changeOverTime : 0;
  return { up: last >= 0, perc: percent(last) };
};

export const formatDayChart = data => {
  return _.chain(data)
    .map((d, i) => {
      return _.assign(d, { close: d.close || d.marketClose, index: i });
    })
    .value();
};

export const quoteFormatting = (quote, stats) => {
  return {
    symbol: upper(quote.symbol),
    companyName: quote.longName,
    latestPrice: price(quote.latestPrice),
    latestPriceSimple: priceSimple(quote.latestPrice),
    change: price(quote.change),
    changePercent: percent(quote.changePercent),
    up: quote.changePercent > 0,
    status: color(quote.change),
    open: priceSimple(quote.open),
    high: priceSimple(quote.high),
    low: priceSimple(quote.low),
    vol: formatNumber(quote.latestVolume),
    avgVol: formatNumber(quote.avgTotalVolume),
    peRatio: quote.peRatio || '-',
    marketCap: formatBigPrice(quote.marketCap),
    week52High: priceSimple(quote.week52High),
    week52Low: priceSimple(quote.week52Low),
    week52Ch: stats ? percent(stats.week52change / 100) : null,
    week52Up: stats ? stats.week52change > 0 : null,
    ytdChange: stats ? percent(stats.ytdChangePercent) : null,
    yield: stats ? dividend(stats.dividendYield) : null,
    beta: stats ? formatNumber(stats.beta) : null,
    eps: stats ? priceSimple(stats.ttmEPS) : null,
  };
};
