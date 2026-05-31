# @structyl/themes

> Runtime theming for React, powered by CSS variables.

![npm](https://img.shields.io/npm/v/@structyl/themes)
![license](https://img.shields.io/npm/l/@structyl/themes)

The theming layer of [structyl](https://github.com/imirfanul/structyl). It provides a `ThemeProvider` that drives a CSS-variable design-token system, with light/dark/system color modes, an SSR-safe script to prevent the flash of unstyled content, and a runtime accent-color preset API. It powers the look of `@structyl/styled` and the DataTable, but works standalone in any React app — App Router or otherwise.

## Installation

```bash
pnpm add @structyl/themes
```

```bash
npm install @structyl/themes
```

```bash
yarn add @structyl/themes
```

## Usage

Wrap your app in `ThemeProvider` and read or update the theme with `useTheme`:

```tsx
import { ThemeProvider, useTheme } from '@structyl/themes';

function ModeToggle() {
  const { mode, setMode, resolvedMode, theme, setTheme, themes } = useTheme();

  return (
    <div>
      <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
        Toggle ({mode} → {resolvedMode})
      </button>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {themes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="slate" defaultMode="system">
      <ModeToggle />
      {/* your app */}
    </ThemeProvider>
  );
}
```

### Prevent the flash of unstyled content (SSR / Next.js)

Render `ThemeScript` in your document `<head>` so the correct theme is applied from `localStorage` before first paint:

```tsx
// app/layout.tsx
import { ThemeScript } from '@structyl/themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript defaultTheme="slate" defaultMode="system" />
      </head>
      <body>
        <ThemeProvider defaultTheme="slate" defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Runtime accent presets

Layer a custom accent color on top of the active theme. `useColorPreset` persists the choice and re-applies it across theme and mode changes:

```tsx
import { useColorPreset, createColorPreset } from '@structyl/themes';

function AccentPicker() {
  const brand = createColorPreset('brand', 'Brand Blue', '#1a6cf0');
  const { presets, activeId, setPreset, clearPreset } = useColorPreset({
    extraPresets: [brand],
  });

  return (
    <div>
      {presets.map((p) => (
        <button key={p.id} onClick={() => setPreset(p.id, p.hex)} style={{ background: p.hex }}>
          {p.name}
        </button>
      ))}
      {activeId && <button onClick={clearPreset}>Reset</button>}
    </div>
  );
}
```

The theme tokens are exposed as CSS custom properties on `:root` (e.g. `--color-primary`, `--color-bg`, `--color-fg`), so you can consume them directly in CSS or via Tailwind.

## Features

- **ThemeProvider** — manages the active theme plus `light` / `dark` / `system` modes, injects token CSS variables onto `document.documentElement`, and persists the selection to `localStorage`.
- **System mode** — follows `prefers-color-scheme` and reacts live to OS changes.
- **No-flash SSR** — `ThemeScript` applies the stored theme before paint and sets `color-scheme`, eliminating the dark-mode flash.
- **CSS-variable tokens** — a broad `ThemeTokens` contract covering surfaces, semantic colors (primary, success, warning, info, destructive), state/shade rgba shades, text, borders, and table tokens.
- **Built-in themes** — ships `slate`, `zinc`, `rose`, and `structyl`; extend or override via the `themes` prop.
- **Accent presets** — 10 built-in presets plus `useColorPreset` / `applyColorPreset` for runtime accent switching, with custom presets supported.
- **SSR-safe & zero runtime deps** — guards all `window` / `document` access; React is the only peer dependency.

## API

| Export | Kind | Description |
| --- | --- | --- |
| `ThemeProvider` | Component | Root provider that applies tokens, tracks mode, and persists state. Props: `defaultTheme`, `defaultMode`, `storageKey`, `enableTransitions`, `themes`, `attribute`. |
| `useTheme()` | Hook | Returns `{ theme, setTheme, mode, setMode, resolvedMode, themes }`. Must be used inside a `ThemeProvider`. |
| `ThemeScript` | Component | Inline `<style>` + script for the document `<head>` that prevents the FOUC. |
| `useColorPreset(options?)` | Hook | Manages a runtime accent preset (`presets`, `activeId`, `activePreset`, `setPreset`, `clearPreset`). |
| `COLOR_PRESETS` | Const | The 10 built-in accent presets. |
| `createColorPreset(id, name, hex)` | Function | Build a typed custom `ColorPreset`. |
| `applyColorPreset(hex)` | Function | Imperatively override the primary-color CSS variables. |
| `clearColorPreset()` | Function | Remove preset overrides, restoring the theme's colors. |
| `defaultThemes` | Const | Map of built-in `ThemeConfig`s (`slate`, `zinc`, `rose`, `structyl`). |
| `staticPalette`, `generalColors` | Const | Raw palette references used to build themes. |
| `sharedSemanticLight`, `sharedSemanticDark` | Const | Shared semantic token sets for light / dark modes. |

**Types:** `Theme`, `ThemeMode`, `ThemeConfig`, `ThemeTokens`, `ColorPreset`, `ColorPresetId`, `UseColorPresetOptions`, `UseColorPresetReturn`, `PaletteColor`, `AlertPaletteColor`, `StructylScale`, `StaticPalette`.

### Stylesheets

```ts
import '@structyl/themes/styles.css';        // base token stylesheet
import '@structyl/themes/themes/slate.css';  // a specific theme's variables
```

## Part of structyl

This package is part of [structyl](https://github.com/imirfanul/structyl) — the React UI library with structure. See the full documentation at [structyl.dev](https://structyl.dev).

## License

[MIT](https://github.com/imirfanul/structyl/blob/main/LICENSE)
