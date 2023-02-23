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

function Chart({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['coinHistory', coinId],
    () => fetchCoinHistory(coinId)
  );
  if (data && 'error' in data) {
    return <Error>Nicco doesn't provide data.</Error>;
  }
  const options: ApexOptions = {
    theme: {
      mode: 'dark',
    },
    chart: {
      height: 300,
      width: 500,
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      type: 'datetime',
      categories: data?.map((price) =>
        new Date(price.time_close * 1000).toISOString()
      ),
    },
    fill: {
      type: 'gradient',
      gradient: { gradientToColors: ['#0be881'], stops: [0, 80] },
    },
    colors: ['#0fbcf9'],
    tooltip: {
      y: {
        formatter(val, _) {
          return '$ ' + val.toFixed(2);
        },
      },
    },
  };

  const closePrice = data?.map((item) => Number(item.close)) ?? [];
  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: closePrice,
            },
          ]}
          options={options}
        />
      )}
    </>
  );
}

export default Chart;
