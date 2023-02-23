import { createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  font-weight: 300;
  line-height: 1;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
  text-decoration: none;
  color:inherit;
}
*{
  box-sizing: border-box;
}
  `;

const ThemeButton = styled.button`
  margin-top: 60px;
  display: flex;
  position: absolute;
  left: calc(50% + 140px);
  border: none;
  background-color: transparent;
  z-index: 9999;
  span {
    font-size: 35px;
    font-weight: 200;
    color: ${(props) => props.theme.textColor};
  }
`;

function App() {
  const [isLight, setIsLight] = useState(true);
  const themeToggleHandler = () => {
    console.log('click');
    setIsLight((prev) => !prev);
  };
  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <ThemeButton onClick={themeToggleHandler}>
        <span className='material-symbols-outlined'>
          {isLight ? 'dark_mode' : 'light_mode'}
        </span>
      </ThemeButton>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
