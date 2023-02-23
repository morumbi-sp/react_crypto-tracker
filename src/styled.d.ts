import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    boxColor: string;
    shadowColor: string;
    shadowHoverColor: string;
    accentColor: string;
  }
}
