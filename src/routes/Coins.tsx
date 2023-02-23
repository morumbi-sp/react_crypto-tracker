import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinsData } from '../api';

const Container = styled.div`
  width: 450px;
  margin: auto;
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
  transition: background-color 0.3s, box-shadow 0.3s;
  a {
    display: flex;
    font-size: 17px;
    font-weight: 400;
    padding: 1rem;
    width: 100%;
    align-items: center;
    transition: color 0.3s;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    box-shadow: 0 0.2rem 0.75rem ${(props) => props.theme.shadowHoverColor};
  }
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoinsData);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
