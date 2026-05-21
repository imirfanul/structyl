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
  'primary-hover': string;
  'primary-active': string;
  secondary: string;
  'secondary-fg': string;
  muted: string;
  'muted-fg': string;
  accent: string;
  'accent-fg': string;
  destructive: string;
  'destructive-fg': string;
  success: string;
  'success-fg': string;
  warning: string;
  'warning-fg': string;
  info: string;
  'info-fg': string;
  border: string;
  'border-strong': string;
  input: string;
  ring: string;
  overlay: string;
  shadow: string;
  [key: string]: string;
}

export interface ThemeConfig {
  light: ThemeTokens;
  dark: ThemeTokens;
}
