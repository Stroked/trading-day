const EnumsManager = {
  // supported types in IEX API https://iextrading.com/developer/docs/#list
  StockListTypes: [
    {
      type: "MostActive",
      api: "https://api.iextrading.com/1.0/stock/market/list/mostactive",
      text: "Most Active",
    }, {
      type: "Gainers",
      api: "https://api.iextrading.com/1.0/stock/market/list/gainers",
      text: "Top Gainers",
    }, {
      type: "Losers",
      api: "https://api.iextrading.com/1.0/stock/market/list/losers",
      text: "Top Losers",
    }
  ],
  StockListColumns: [
    { key: "companyName", name: "company name", },
    { key: "symbol", name: "symbol", },
    { key: "sector", name: "sector", },
    {
      key: "change",
      name: "change",
      alignRight: true,
      numOfPrecision: 3,
    },
    {
      key: "changePercent",
      name: "change percent",
      alignRight: true,
      numOfPrecision: 3,
    },
    {
      key: "avgTotalVolume",
      name: "avg volume",
      alignRight: true,
    },
  ],
  StockDetails: [
    { key: "latestPrice", name: "last" },
    { key: "change", name: "change" },
    { key: "changePercent", name: "% change" },
    { key: "latestVolume", name: "volume" },
    { key: "avgTotalVolume", name: "avg. total volume" },
    { key: "open", name: "open" },
    { key: "high", name: "high" },
    { key: "low", name: "low" },
    { key: "close", name: "close" },
    { key: "delayedPrice", name: "delayed price" },
    { key: "previousClose", name: "previous close" },
    { key: "week52High", name: "52wkhi" },
    { key: "week52Low", name: "52wklo" },
    { key: "ytdChange", name: "ytdchange" },
    { key: "primaryExchange", name: "exchange" },
    { key: "sector", name: "sector" },
  ],
};

export default EnumsManager;