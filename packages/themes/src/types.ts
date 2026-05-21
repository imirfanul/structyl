export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedMode = 'light' | 'dark';
export type Theme = string;

export interface ThemeTokens {
  bg: string;
  fg: string;
  card: string;
  'card-fg': string;
  popover: string;
  'popover-fg': string;
  primary: string;
  'primary-fg': string;
  secondary: string;
  'secondary-fg': string;
  muted: string;
  'muted-fg': string;
  accent: string;
  'accent-fg': string;
  destructive: string;
  'destructive-fg': string;
  border: string;
  input: string;
  ring: string;
  [key: string]: string;
}

export interface ThemeConfig {
  light: ThemeTokens;
  dark: ThemeTokens;
}
