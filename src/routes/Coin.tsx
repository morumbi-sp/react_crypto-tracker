import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Price from './Price';
import Chart from './Chart';
import ChartSimple from './ChartSimple';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTicker } from '../api';
import { Helmet } from 'react-helmet';

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

const BackBtn = styled(Link)`
  position: absolute;
  left: 0;
  font-size: 2.2rem;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  span {
    font-size: 33px;
  }
`;

const ChartSelectorBtn = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  span {
    font-size: 33px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 400;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;

  font-size: 14px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.boxColor};
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
  padding: 7px 0px;
  border-radius: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  a {
    width: 100%;
    align-items: center;
    transition: color 0.3s;
  }
  &:hover {
    color: ${(props) =>
      props.isActive ? props.theme.textColor : props.theme.accentColor};
    box-shadow: 0 0.2rem 0.75rem ${(props) => props.theme.shadowHoverColor};
  }
`;
const ChartTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 140px;
  height: 10px;
`;

const ChartTab = styled.span<{ isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;

  font-size: 12px;
  font-weight: 400;
  opacity: 0.8;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.boxColor};
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.shadowColor};
  padding: px 0px;
  :first-child {
    border-radius: 10px 0 0 10px;
  }
  :last-child {
    border-radius: 0 10px 10px 0;
  }

  transition: background-color 0.3s, box-shadow 0.3s;
  a {
    width: 100%;
    align-items: center;
    transition: color 0.3s;
  }
  &:hover {
    color: ${(props) =>
      props.isActive ? props.theme.textColor : props.theme.accentColor};
    box-shadow: 0 0.2rem 0.75rem ${(props) => props.theme.shadowHoverColor};
  }
`;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');
  const simpleChartMatch = useRouteMatch('/:coinId/simpleChart');

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTicker(coinId)
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn to={`/`}>
          <span className='material-symbols-outlined'>arrow_back_ios_new</span>
        </BackBtn>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply} </span>
            </OverviewItem>
            <OverviewItem>
              <span>Max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:id/price`}>
              <Price tickersData={tickersData} />
            </Route>
            <Route path={`/:id/chart`}>
              <ChartTabs>
                <ChartTab isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Candle</Link>
                </ChartTab>
                <ChartTab isActive={simpleChartMatch !== null}>
                  <Link to={`/${coinId}/simpleChart`}>Line</Link>
                </ChartTab>
              </ChartTabs>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/:id/simpleChart`}>
              <ChartTabs>
                <ChartTab isActive={chartMatch !== null}>
                  <Link to={`/${coinId}/chart`}>Candle</Link>
                </ChartTab>
                <ChartTab isActive={simpleChartMatch !== null}>
                  <Link to={`/${coinId}/simpleChart`}>Line</Link>
                </ChartTab>
              </ChartTabs>
              <ChartSimple coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
