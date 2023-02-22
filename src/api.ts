const BASE_URL = 'https://api.coinpaprika.com/v1';

export const fetchCoinsData = async () => {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  return json.slice(0, 50);
};

export const fetchCoinInfo = async (coinId: string) => {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  const json = await response.json();
  return json;
};

export const fetchCoinTicker = async (coinId: string) => {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  const json = await response.json();
  return json;
};

export const fetchCoinHistory = async (coinId: string) => {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  const json = await response.json();
  return json;
};
