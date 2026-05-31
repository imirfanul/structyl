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

export interface StructylScale {
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
  yellow: StructylScale;
  amber: StructylScale;
  blue: StructylScale;
  blueGrey: StructylScale;
  brown: StructylScale;
  teal: StructylScale;
  red: StructylScale;
  purple: StructylScale;
  pink: StructylScale;
  orange: StructylScale;
  lime: StructylScale;
  lightGreen: StructylScale;
  cyan: StructylScale;
  deepOrange: StructylScale;
  deepPurple: StructylScale;
  green: StructylScale;
  grey: StructylScale;
  indigo: StructylScale;
  lightBlue: StructylScale;
}
