import * as React from 'react';
import type { ThemeMode } from './types';

interface ThemeScriptProps {
  defaultTheme?: string;
  defaultMode?: ThemeMode;
  storageKey?: string;
  attribute?: string;
}

/**
 * Renders an inline script that applies the saved theme + mode to <html>
 * BEFORE React hydrates. Prevents flash of incorrect theme on SSR.
 *
 * Place inside <head> of your root layout.
 */
export function ThemeScript({
  defaultTheme = 'slate',
  defaultMode = 'system',
  storageKey = 'your-lib-theme',
  attribute = 'data-theme',
}: ThemeScriptProps): React.JSX.Element {
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

  return <script dangerouslySetInnerHTML={{ __html: script }} suppressHydrationWarning />;
}
