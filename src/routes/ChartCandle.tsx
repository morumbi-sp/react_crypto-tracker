import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styled from 'styled-components';

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

const Error = styled.div`
  margin-top: 100px;
  text-align: center;
  font-size: 20px;
`;

function ChartCandle({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['coinHistory', coinId],
    () => fetchCoinHistory(coinId)
  );
  if (data && 'error' in data) {
    return <Error>Nicco doesn't provide data.</Error>;
  }
  const options: ApexOptions = {
    chart: {
      height: 300,
      width: 500,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },
    yaxis: {
      show: true,
    },
    xaxis: {
      labels: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      type: 'datetime',
      categories: data?.map((price) =>
        new Date(price.time_close * 1000).toISOString()
      ),
    },
    tooltip: {
      y: {
        formatter(val, _) {
          return '$ ' + val.toFixed(2);
        },
      },
    },
  };

  const candleSeries =
    data?.map((item) => ({
      x: new Date(item.time_close),
      y: [
        Number(item.open),
        Number(item.high),
        Number(item.low),
        Number(item.close),
      ],
    })) ?? [];
  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              name: 'Price',
              data: candleSeries,
            },
          ]}
          options={options}
        />
      )}
    </>
  );
}

export default ChartCandle;

//[opening, highest, lowest, closing]
