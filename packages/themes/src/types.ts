export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedMode = 'light' | 'dark';
export type Theme = string;

export interface ThemeTokens {
  // ── Base tokens (existing) ───────────────────────────────────────────────────
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

  // ── Semantic palette sub-tokens (RGB channels for alpha support) ─────────────
  'primary-light': string;
  'primary-dark': string;
  'primary-contrast': string;
  'primary-dark-bg': string;
  'secondary-light': string;
  'secondary-dark': string;
  'secondary-contrast': string;
  'secondary-dark-bg': string;
  'error-light': string;
  'error-dark': string;
  'error-contrast': string;
  'error-dark-bg': string;
  'warning-light': string;
  'warning-dark': string;
  'warning-contrast': string;
  'warning-dark-bg': string;
  'info-light': string;
  'info-dark': string;
  'info-contrast': string;
  'info-dark-bg': string;
  'success-light': string;
  'success-dark': string;
  'success-contrast': string;
  'success-dark-bg': string;

  // ── State / shade tokens (pre-computed rgba strings) ─────────────────────────
  'primary-state-contained': string;
  'primary-state-outlined': string;
  'primary-state-resting': string;
  'primary-shade-12': string;
  'primary-shade-16': string;
  'secondary-state-contained': string;
  'secondary-state-outlined': string;
  'secondary-state-resting': string;
  'secondary-shade-12': string;
  'secondary-shade-16': string;
  'error-state-contained': string;
  'error-state-outlined': string;
  'error-state-resting': string;
  'error-alert-bg': string;
  'error-alert-content': string;
  'error-shade-12': string;
  'error-shade-16': string;
  'warning-state-contained': string;
  'warning-state-outlined': string;
  'warning-state-resting': string;
  'warning-alert-bg': string;
  'warning-alert-content': string;
  'warning-shade-12': string;
  'warning-shade-16': string;
  'info-state-contained': string;
  'info-state-outlined': string;
  'info-state-resting': string;
  'info-alert-bg': string;
  'info-alert-content': string;
  'info-shade-12': string;
  'info-shade-16': string;
  'success-state-contained': string;
  'success-state-outlined': string;
  'success-state-resting': string;
  'success-alert-bg': string;
  'success-alert-content': string;
  'success-shade-12': string;
  'success-shade-16': string;

  // ── Text tokens ──────────────────────────────────────────────────────────────
  text: string;
  'text-secondary': string;
  'text-disabled': string;
  'text-info': string;
  'text-fill': string;
  'text-shade-12': string;
  'text-shade-16': string;

  // ── Surface tokens ───────────────────────────────────────────────────────────
  surface: string;
  'surface-paper': string;

  // ── Divider / border tokens ──────────────────────────────────────────────────
  divider: string;
  'outlined-border': string;
  'input-line': string;

  // ── Action tokens ────────────────────────────────────────────────────────────
  'action-active': string;
  'action-hover': string;
  'action-selected': string;
  'action-disabled': string;
  'action-disabled-bg': string;
  'action-focus': string;

  // ── Misc tokens ──────────────────────────────────────────────────────────────
  backdrop: string;
  'rating-active': string;
  'snackbar-bg': string;
  'map-grid': string;

  // ── Table tokens ─────────────────────────────────────────────────────────────
  'table-top-header': string;
  'table-header': string;
  'table-row': string;
  'table-col-border': string;
  'table-border': string;

  [key: string]: string;
}

export interface ThemeConfig {
  light: Partial<ThemeTokens> & Record<string, string>;
  dark: Partial<ThemeTokens> & Record<string, string>;
}
