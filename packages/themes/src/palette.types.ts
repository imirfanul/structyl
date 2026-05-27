export interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  darkBackground?: string;
  state: {
    containedHover: string;
    outlinedHover: string;
    outlinedResting: string;
  };
  shade: {
    12: string;
    16: string;
  };
}

export interface AlertPaletteColor extends PaletteColor {
  alert: {
    background: string;
    content: string;
  };
}

export interface MaterialScale {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

export interface StaticPalette {
  yellow: MaterialScale;
  amber: MaterialScale;
  blue: MaterialScale;
  blueGrey: MaterialScale;
  brown: MaterialScale;
  teal: MaterialScale;
  red: MaterialScale;
  purple: MaterialScale;
  pink: MaterialScale;
  orange: MaterialScale;
  lime: MaterialScale;
  lightGreen: MaterialScale;
  cyan: MaterialScale;
  deepOrange: MaterialScale;
  deepPurple: MaterialScale;
  green: MaterialScale;
  grey: MaterialScale;
  indigo: MaterialScale;
  lightBlue: MaterialScale;
}
