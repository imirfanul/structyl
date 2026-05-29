import * as React from 'react';
import type { ThemeMode } from './types';
import { defaultThemes } from './themes';

interface ThemeScriptProps {
  defaultTheme?: string;
  defaultMode?: ThemeMode;
  storageKey?: string;
  attribute?: string;
}

function tokensToVars(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([k, v]) => `--color-${k}:${v}`)
    .join(';');
}

/**
 * Renders a <style> block with the default theme's CSS variables plus an inline
 * script that updates them from localStorage before first paint. Place inside
 * <head> of your root layout to prevent flash of unstyled content.
 */
export function ThemeScript({
  defaultTheme = 'slate',
  defaultMode = 'system',
  storageKey = 'aura-ui-theme',
  attribute = 'data-theme',
}: ThemeScriptProps): React.JSX.Element {
  const cfg = defaultThemes[defaultTheme as keyof typeof defaultThemes];
  const lightVars = cfg ? tokensToVars(cfg.light as Record<string, string>) : '';
  const darkVars = cfg ? tokensToVars(cfg.dark as Record<string, string>) : '';

  // Static CSS covers the default theme before JS runs (SSR + initial paint).
  // [data-mode="dark"] overrides are picked up as soon as the script below sets
  // the attribute on <html>, which happens before the browser paints.
  const staticCss = lightVars
    ? `:root{${lightVars}}:root[data-mode="dark"]{${darkVars}}`
    : '';

  const script = `
(function(){
  try {
    var stored = JSON.parse(localStorage.getItem(${JSON.stringify(storageKey)}) || '{}');
    var theme = stored.theme || ${JSON.stringify(defaultTheme)};
    var mode = stored.mode || ${JSON.stringify(defaultMode)};
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    var root = document.documentElement;
    root.setAttribute(${JSON.stringify(attribute)}, theme);
    root.setAttribute('data-mode', resolved);
    root.style.colorScheme = resolved;
  } catch (e) {}
})();`.trim();

  return (
    <>
      {staticCss && (
        <style dangerouslySetInnerHTML={{ __html: staticCss }} suppressHydrationWarning />
      )}
      <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />
    </>
  );
}
