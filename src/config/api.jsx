export const CoinList = (currency) =>
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-JNifjNzkzGgwHFsAJLuiVfrP`;
  
  export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-JNifjNzkzGgwHFsAJLuiVfrP`;
  
  export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
  
  export const TrendingCoins = (currency) =>
    `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-JNifjNzkzGgwHFsAJLuiVfrP&vs_currency=${currency}&order=gecko_desc&per_page=10#`;