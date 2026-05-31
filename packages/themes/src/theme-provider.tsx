'use client';

import * as React from 'react';
import { defaultThemes } from './themes';
import type { ResolvedMode, Theme, ThemeConfig, ThemeMode } from './types';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedMode: ResolvedMode;
  themes: string[];
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultMode?: ThemeMode;
  storageKey?: string | false;
  enableTransitions?: boolean;
  themes?: Record<string, ThemeConfig>;
  attribute?: string;
}

export function ThemeProvider(props: ThemeProviderProps): React.JSX.Element {
  const {
    children,
    defaultTheme = 'slate',
    defaultMode = 'system',
    storageKey = 'structyl-theme',
    enableTransitions = true,
    themes: customThemes,
    attribute = 'data-theme',
  } = props;

  const themes = React.useMemo(
    () => ({ ...defaultThemes, ...customThemes }),
    [customThemes],
  );

  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [mode, setModeState] = React.useState<ThemeMode>(defaultMode);
  const [systemMode, setSystemMode] = React.useState<ResolvedMode>('light');

  // Hydrate from storage on mount
  React.useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as { theme?: Theme; mode?: ThemeMode };
        if (parsed.theme) setThemeState(parsed.theme);
        if (parsed.mode) setModeState(parsed.mode);
      }
    } catch {
      // ignore corrupted storage
    }
  }, [storageKey]);

  // Track system preference
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemMode(mql.matches ? 'dark' : 'light');
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const resolvedMode: ResolvedMode = mode === 'system' ? systemMode : mode;

  // Apply data-* attributes and inject CSS variables
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    if (!enableTransitions) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          '*,*::before,*::after{transition:none!important;animation:none!important}',
        ),
      );
      document.head.appendChild(css);
      // force reflow then remove
      void window.getComputedStyle(document.body);
      requestAnimationFrame(() => document.head.removeChild(css));
    }

    root.setAttribute(attribute, theme);
    root.setAttribute('data-mode', resolvedMode);
    root.style.colorScheme = resolvedMode;

    // Inject CSS variables from current theme
    const cfg = themes[theme];
    if (cfg) {
      const tokens = cfg[resolvedMode];
      for (const [key, value] of Object.entries(tokens)) {
        root.style.setProperty(`--color-${key}`, value);
      }
    }
  }, [theme, resolvedMode, themes, attribute, enableTransitions]);

  // Persist to storage on change
  React.useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ theme, mode }));
    } catch {
      // storage may be unavailable (Safari private mode, etc.)
    }
  }, [theme, mode, storageKey]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      mode,
      setMode: setModeState,
      resolvedMode,
      themes: Object.keys(themes),
    }),
    [theme, mode, resolvedMode, themes],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext };
