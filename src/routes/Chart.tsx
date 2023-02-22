import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ICoinId {
  coinId: string;
}

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return <h1>Chart</h1>;
}

export default Chart;
