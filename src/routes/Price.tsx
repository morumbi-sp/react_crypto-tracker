import styled from 'styled-components';

interface Quotes {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: Quotes;
  };
}

interface PriceProps {
  tickersData?: PriceData;
}

const PriceTabs = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  /* padding: 10px 20px; */
`;

const PriceTab = styled.div<{ numColor: number | undefined }>`
  height: 40px;
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  span:first-child {
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => ((props.numColor ?? []) > 0 ? 'tomato' : 'teal')};
  }
  span.ath {
    color: ${(props) => props.theme.textColor};
  }
`;

function Price({ tickersData }: PriceProps) {
  const BASE_KEY = tickersData?.quotes.USD;
  return (
    <PriceTabs>
      <PriceTab numColor={0}>
        <span>Ath_Price</span>
        <span className='ath'>$ {BASE_KEY?.ath_price.toFixed(3)}</span>
      </PriceTab>
      <PriceTab numColor={BASE_KEY?.percent_change_30d}>
        <span>Change percent : 1 Month</span>
        <span>{BASE_KEY?.percent_change_30d} %</span>
      </PriceTab>
      <PriceTab numColor={BASE_KEY?.percent_change_7d}>
        <span>Change percent : 7 days</span>
        <span>{BASE_KEY?.percent_change_7d} %</span>
      </PriceTab>
      <PriceTab numColor={BASE_KEY?.percent_change_24h}>
        <span>Change percent : 24 hours</span>
        <span>{BASE_KEY?.percent_change_24h} %</span>
      </PriceTab>
      <PriceTab numColor={BASE_KEY?.percent_change_6h}>
        <span>Change percent : 6 hours</span>
        <span>{BASE_KEY?.percent_change_6h} %</span>
      </PriceTab>
    </PriceTabs>
  );
}

export default Price;
