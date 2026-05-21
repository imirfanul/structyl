# Theming

aura-ui uses a **CSS variables + Tailwind** approach for theming. This gives you:

- Runtime theme switching with no re-renders
- Type-safe theme tokens
- Easy custom theme creation
- Dark mode built in
- SSR-friendly (no flash of unstyled content)

---

## Quick start

```tsx
import { ThemeProvider } from '@aura-ui/themes';

export function App() {
  return (
    <ThemeProvider defaultTheme="slate" defaultMode="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

That's it. Components automatically use the theme.

---

## How it works

```
ThemeProvider
    │
    │  sets data-theme="slate" data-mode="dark"
    ▼
<html data-theme="slate" data-mode="dark">
    │
    │  CSS variables match this combination
    ▼
:root[data-theme="slate"][data-mode="dark"] {
  --color-bg: 222 47% 11%;
  --color-fg: 210 40% 98%;
  --color-primary: 210 40% 98%;
  ...
}
    │
    │  Tailwind config exposes them as utility classes
    ▼
className="bg-bg text-fg" → uses CSS variables
```

---

## Built-in themes

We ship 10 themes out of the box:

**Neutral palettes** (use these as a base):
- `slate` (default)
- `gray`
- `zinc`
- `neutral`
- `stone`

**Accent themes** (vibrant variants):
- `blue`
- `green`
- `violet`
- `rose`
- `orange`

Each works in both light and dark mode.

---

## Using `useTheme()`

```tsx
import { useTheme } from '@aura-ui/themes';

function ThemeToggle() {
  const { theme, setTheme, mode, setMode, resolvedMode } = useTheme();

  return (
    <>
      <button onClick={() => setMode(resolvedMode === 'dark' ? 'light' : 'dark')}>
        {resolvedMode === 'dark' ? '☀️' : '🌙'}
      </button>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="slate">Slate</option>
        <option value="blue">Blue</option>
        {/* ... */}
      </select>
    </>
  );
}
```

### API

| Property | Type | Description |
|---|---|---|
| `theme` | `string` | Current theme name |
| `setTheme` | `(theme: string) => void` | Change theme |
| `mode` | `'light' \| 'dark' \| 'system'` | User's mode preference |
| `setMode` | `(mode) => void` | Change mode |
| `resolvedMode` | `'light' \| 'dark'` | Effective mode (resolves `'system'`) |
| `themes` | `string[]` | All available theme names |

---

## ThemeProvider props

```tsx
<ThemeProvider
  defaultTheme="slate"          // Initial theme
  defaultMode="system"          // 'light' | 'dark' | 'system'
  storageKey="aura-ui-theme"   // localStorage key (false to disable)
  enableTransitions={true}      // Animate theme changes
  themes={{                     // Add custom themes
    myBrand: {
      light: { ... },
      dark: { ... },
    },
  }}
  attribute="data-theme"        // Where theme is stored on <html>
>
```

---

## Semantic color tokens

All themes expose these semantic tokens. Components use these — never use raw colors.

| Token | Description |
|---|---|
| `bg` | Page background |
| `fg` | Page foreground (text) |
| `card` / `card-fg` | Card surface + text |
| `popover` / `popover-fg` | Popover surface + text |
| `primary` / `primary-fg` | Primary action color |
| `secondary` / `secondary-fg` | Secondary action |
| `muted` / `muted-fg` | Muted surface + text |
| `accent` / `accent-fg` | Accent / highlight |
| `destructive` / `destructive-fg` | Destructive action |
| `border` | Default border color |
| `input` | Input border |
| `ring` | Focus ring color |

Plus design tokens:

| Token | Description |
|---|---|
| `--radius` | Base border radius |
| `--font-sans` | Sans-serif font stack |
| `--font-mono` | Monospace font stack |

---

## Creating a custom theme

### Option 1: Inline in ThemeProvider

```tsx
<ThemeProvider
  themes={{
    coral: {
      light: {
        bg: '0 0% 100%',
        fg: '20 14% 4%',
        primary: '14 90% 60%',
        'primary-fg': '0 0% 100%',
        // ... rest of tokens
      },
      dark: {
        bg: '20 14% 4%',
        fg: '60 9% 98%',
        primary: '14 90% 60%',
        'primary-fg': '0 0% 100%',
        // ...
      },
    },
  }}
  defaultTheme="coral"
>
```

### Option 2: CSS file

```css
/* your-theme.css */
:root[data-theme='coral'] {
  --color-bg: 0 0% 100%;
  --color-fg: 20 14% 4%;
  --color-primary: 14 90% 60%;
  --color-primary-fg: 0 0% 100%;
  /* ... */
}

:root[data-theme='coral'][data-mode='dark'] {
  --color-bg: 20 14% 4%;
  --color-fg: 60 9% 98%;
  /* ... */
}
```

### Option 3: Theme generator

Visit the docs site → Theme Generator → pick colors → export as CSS or JSON.

---

## Tailwind preset

To use semantic tokens in your own Tailwind classes, extend our preset:

```js
// tailwind.config.js
import yourLibPreset from '@aura-ui/styled/tailwind-preset';

export default {
  presets: [yourLibPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@aura-ui/styled/dist/**/*.js',
  ],
};
```

Now you can use:

```tsx
<div className="bg-bg text-fg border-border" />
<button className="bg-primary text-primary-fg" />
```

---

## SSR considerations

`ThemeProvider` includes a script that sets `data-theme` and `data-mode` **before** hydration. This prevents the dreaded flash of incorrect theme.

For Next.js App Router, place it in your root layout:

```tsx
// app/layout.tsx
import { ThemeProvider, ThemeScript } from '@aura-ui/themes';

export default function RootLayout({ children }) {
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

`suppressHydrationWarning` is needed because the `<html>` attributes are mutated by the script before React hydrates.

---

## Accessibility considerations

- All built-in themes meet WCAG AA contrast ratios.
- The theme generator includes a contrast checker.
- Mode preference defaults to `'system'` — respects the user's OS setting.
- Mode changes can be animated, but respect `prefers-reduced-motion`.
