import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

const ThemeButton = styled.button`
  display: flex;
  position: absolute;
  left: calc(50% + 140px);
  border: none;
  background-color: transparent;
  span {
    font-size: 35px;
    font-weight: 200;
    color: ${(props) => props.theme.textColor};
  }
`;

export default function ThemeBtn() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <ThemeButton onClick={toggleDarkAtom}>
      <span className='material-symbols-outlined'>
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </ThemeButton>
  );
}
