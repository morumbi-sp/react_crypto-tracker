import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
}

const Container = styled.div`
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-left: 40px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

function Coin() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const infoData = async () => {
    const response = await fetch(
      `https://api.coinpaprika.com/v1/coins/${coinId}`
    );
    const json = await response.json();
    setInfo(json);
  };
  const priceData = async () => {
    const response = await fetch(
      `https://api.coinpaprika.com/v1/tickers/${coinId}`
    );
    const json = await response.json();
    setPriceInfo(json);
  };

  useEffect(() => {
    infoData();
    priceData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading...'}</Title>
        <Link to={`/`}>back &rarr;</Link>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
