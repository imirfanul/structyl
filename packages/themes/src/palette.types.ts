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

export interface AuraScale {
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
  yellow: AuraScale;
  amber: AuraScale;
  blue: AuraScale;
  blueGrey: AuraScale;
  brown: AuraScale;
  teal: AuraScale;
  red: AuraScale;
  purple: AuraScale;
  pink: AuraScale;
  orange: AuraScale;
  lime: AuraScale;
  lightGreen: AuraScale;
  cyan: AuraScale;
  deepOrange: AuraScale;
  deepPurple: AuraScale;
  green: AuraScale;
  grey: AuraScale;
  indigo: AuraScale;
  lightBlue: AuraScale;
}
