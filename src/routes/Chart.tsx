import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ICoinId {
  coinId: string;
}

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['coinHistory', coinId],
    () => fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
