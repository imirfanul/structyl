# Color Tokenization & Typography System Plan

> **Status:** Draft — awaiting review before implementation  
> **Scope:** Expand the existing CSS-variable theme system to a full MUI-style semantic palette, add a `color` prop to all interactive components, and introduce a typed typography variant system.

---

## How Colors Are Stored (the rule)

There are three kinds of colors in this system. Each is handled differently:

### Kind 1 — Theme-switchable semantic colors (change between light and dark mode)

`primary.main`, `primary.light`, `primary.dark`, `primary.contrastText`, `text.primary`, `background.default`, etc.

**Storage:** CSS variable holding `R G B` channel values (no `rgb()` wrapper).  
**Tailwind usage:** `rgb(var(--color-primary) / <alpha-value>)` → supports `bg-primary/50`, `text-primary/80`.

```css
/* light mode */
:root { --color-primary: 87 84 163; }
/* dark mode */
[data-theme="dark"] { --color-primary: 195 192 250; }
```

```ts
// tailwind-preset.ts
primary: { DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)' }
```

### Kind 2 — Pre-computed rgba values (state, shade, alert, overlay, action tokens)

`primary.state.containedHover`, `primary.shade.12`, `error.alert.background`, `action.hover`, `divider`, etc.

These are **already opacity-baked** (e.g. `rgba(87, 84, 163, 0.12)`). They do not need Tailwind alpha modifiers.

**Storage:** CSS variable holding the full color string.  
**Tailwind usage:** `var(--color-primary-shade-12)` directly. No alpha modifier support — not needed.

```css
:root { --color-primary-shade-12: rgba(87, 84, 163, 0.12); }
```

```ts
// tailwind-preset.ts
'primary-shade-12': 'var(--color-primary-shade-12)'
```

### Kind 3 — Static palette colors (never change between light/dark)

Material color scales (yellow 50–900, grey A100, etc.) and general named colors (general.yellow.golden, etc.).

**Storage:** Baked directly into the Tailwind preset as hard-coded values. No CSS variables needed.  
**Tailwind usage:** `bg-palette-grey-500`, `text-palette-blue-A200`, `bg-general-yellow-golden`.

```ts
// tailwind-preset.ts
'palette-grey-500': '#9e9e9e',
'general-yellow-golden': 'rgba(255, 215, 0, 0.6)',
```

---

## Token Structure

### Semantic colors — sub-tokens per group

Each of `primary`, `secondary`, `error`, `warning`, `info`, `success` expands into:

```
{color}                     → Kind 1 (main)
{color}-light               → Kind 1
{color}-dark                → Kind 1
{color}-contrast            → Kind 1 (contrastText)
{color}-dark-bg             → Kind 1 (darkBackground)
{color}-state-contained     → Kind 2 (containedHoverBackground)
{color}-state-outlined      → Kind 2 (outlinedHoverBackground)
{color}-state-resting       → Kind 2 (outlinedRestingHover)
{color}-shade-12            → Kind 2
{color}-shade-16            → Kind 2
```

`error`, `warning`, `info`, `success` also get:

```
{color}-alert-bg            → Kind 2 (alert.background)
{color}-alert-content       → Kind 2 (alert.content)
```

### Text tokens

```
text                → Kind 1 (text.primary)
text-secondary      → Kind 1
text-disabled       → Kind 1
text-info           → Kind 1
text-fill           → Kind 1
text-shade-12       → Kind 2
text-shade-16       → Kind 2
```

### Surface tokens

```
surface             → Kind 1 (background.default)
surface-paper       → Kind 1 (background.paper)
```

### Divider & border tokens

```
divider             → Kind 2
outlined-border     → Kind 2 (others.outlinedBorder)
input-line          → Kind 2 (others.standardInputLine)
```

### Action tokens

```
action-active       → Kind 2
action-hover        → Kind 2
action-selected     → Kind 2
action-disabled     → Kind 2
action-disabled-bg  → Kind 2
action-focus        → Kind 2
```

### Other tokens

```
backdrop            → Kind 2 (others.backdropOverlay)
rating-active       → Kind 1
snackbar-bg         → Kind 1
map-grid            → Kind 1
```

### Table tokens

```
table-top-header    → Kind 1
table-header        → Kind 1
table-row           → Kind 1
table-col-border    → Kind 1
table-border        → Kind 2
```

### Static palette (Kind 3 — in Tailwind preset, no CSS vars)

All 19 Material color scales, each with 50–900 + A100/A200/A400/A700:
`palette-yellow-*`, `palette-amber-*`, `palette-blue-*`, `palette-blue-grey-*`,
`palette-brown-*`, `palette-teal-*`, `palette-red-*`, `palette-purple-*`,
`palette-pink-*`, `palette-orange-*`, `palette-lime-*`, `palette-light-green-*`,
`palette-cyan-*`, `palette-deep-orange-*`, `palette-deep-purple-*`,
`palette-green-*`, `palette-grey-*`, `palette-indigo-*`, `palette-light-blue-*`

### General named colors (Kind 3 — in Tailwind preset, no CSS vars)

```
general-yellow-golden, general-yellow-pale, general-yellow-amber,
general-yellow-sunshine, general-yellow-light, general-yellow-warm, general-yellow-soft
general-red-rose, general-red-crimson, ...(7 red variants)
general-blue-turquoise, ...(7 blue variants)
general-green-lime, ...(7 green variants)
general-orange-tangerine, ...(7 orange variants)
```

---

## CSS Variable Names (full list pattern)

```css
/* --- LIGHT MODE --- */
:root {
  /* Primary — Kind 1 (R G B channels) */
  --color-primary:               87 84 163;
  --color-primary-light:         195 192 250;
  --color-primary-dark:          27 20 100;
  --color-primary-contrast:      255 255 255;
  --color-primary-dark-bg:       32 28 86;

  /* Primary — Kind 2 (full rgba strings) */
  --color-primary-state-contained: rgba(42, 46, 52, 0.3);
  --color-primary-state-outlined:  rgba(87, 84, 163, 0.1);
  --color-primary-state-resting:   rgba(87, 84, 163, 0.5);
  --color-primary-shade-12:        rgba(27, 20, 100, 0.12);
  --color-primary-shade-16:        rgba(27, 20, 100, 0.16);

  /* Secondary — same pattern ... */
  /* Error — same pattern + alert tokens */
  /* Warning, Info, Success — same pattern + alert tokens */

  /* Text */
  --color-text:          42 46 52;
  --color-text-secondary: 42 46 52;   /* use with /60 alpha in Tailwind */
  --color-text-disabled:  42 46 52;   /* use with /38 alpha */
  --color-text-info:      117 106 234;
  --color-text-fill:      27 20 100;
  --color-text-shade-12:  rgba(42, 46, 52, 0.12);
  --color-text-shade-16:  rgba(42, 46, 52, 0.16);

  /* Surface */
  --color-surface:       250 250 250;
  --color-surface-paper: 255 255 255;

  /* Divider / borders */
  --color-divider:          rgba(42, 46, 52, 0.23);
  --color-outlined-border:  rgba(42, 46, 52, 0.12);
  --color-input-line:       rgba(42, 46, 52, 0.42);

  /* Action */
  --color-action-active:       rgba(42, 46, 52, 0.54);
  --color-action-hover:        rgba(37, 120, 255, 0.05);
  --color-action-selected:     rgba(42, 46, 52, 0.08);
  --color-action-disabled:     rgba(42, 46, 52, 0.26);
  --color-action-disabled-bg:  rgba(42, 46, 52, 0.12);
  --color-action-focus:        rgba(42, 46, 52, 0.12);

  /* Other */
  --color-backdrop:       rgba(0, 0, 0, 0.5);
  --color-rating-active:  251 191 36;
  --color-snackbar-bg:    42 46 52;
  --color-map-grid:       255 255 255;

  /* Table */
  --color-table-top-header: 238 245 255;
  --color-table-header:     238 239 239;
  --color-table-row:        255 255 255;
  --color-table-col-border: 250 250 250;
  --color-table-border:     rgba(229, 229, 230, 1);
}
```

Dark mode mirrors the same variable names with dark-mode values inside `[data-theme="dark"]`.

---

## Tailwind Preset Color Map

```ts
// packages/styled/src/tailwind-preset.ts (additions)
colors: {
  /* --- SEMANTIC --- */
  primary: {
    DEFAULT:    'rgb(var(--color-primary) / <alpha-value>)',
    light:      'rgb(var(--color-primary-light) / <alpha-value>)',
    dark:       'rgb(var(--color-primary-dark) / <alpha-value>)',
    contrast:   'rgb(var(--color-primary-contrast) / <alpha-value>)',
    'dark-bg':  'rgb(var(--color-primary-dark-bg) / <alpha-value>)',
    'state-contained': 'var(--color-primary-state-contained)',
    'state-outlined':  'var(--color-primary-state-outlined)',
    'state-resting':   'var(--color-primary-state-resting)',
    'shade-12': 'var(--color-primary-shade-12)',
    'shade-16': 'var(--color-primary-shade-16)',
  },
  // secondary, error, warning, info, success → same shape
  // error/warning/info/success also get:
  //   'alert-bg': 'var(--color-error-alert-bg)'
  //   'alert-content': 'var(--color-error-alert-content)'

  text: {
    DEFAULT:   'rgb(var(--color-text) / <alpha-value>)',
    secondary: 'rgb(var(--color-text-secondary) / 0.6)',
    disabled:  'rgb(var(--color-text-disabled) / 0.38)',
    info:      'rgb(var(--color-text-info) / <alpha-value>)',
    fill:      'rgb(var(--color-text-fill) / <alpha-value>)',
    'shade-12': 'var(--color-text-shade-12)',
    'shade-16': 'var(--color-text-shade-16)',
  },

  surface: {
    DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
    paper:   'rgb(var(--color-surface-paper) / <alpha-value>)',
  },

  divider:         'var(--color-divider)',
  'outlined-border': 'var(--color-outlined-border)',
  'input-line':    'var(--color-input-line)',

  action: {
    active:      'var(--color-action-active)',
    hover:       'var(--color-action-hover)',
    selected:    'var(--color-action-selected)',
    disabled:    'var(--color-action-disabled)',
    'disabled-bg': 'var(--color-action-disabled-bg)',
    focus:       'var(--color-action-focus)',
  },

  backdrop:      'var(--color-backdrop)',
  'rating-active': 'rgb(var(--color-rating-active) / <alpha-value>)',
  'snackbar-bg': 'rgb(var(--color-snackbar-bg) / <alpha-value>)',

  table: {
    'top-header':  'rgb(var(--color-table-top-header) / <alpha-value>)',
    header:        'rgb(var(--color-table-header) / <alpha-value>)',
    row:           'rgb(var(--color-table-row) / <alpha-value>)',
    'col-border':  'rgb(var(--color-table-col-border) / <alpha-value>)',
    border:        'var(--color-table-border)',
  },

  /* --- GENERAL NAMED COLORS (static) --- */
  general: {
    'yellow-golden':    'rgba(255, 215, 0, 0.6)',
    'yellow-pale':      'rgba(255, 255, 153, 0.4)',
    'yellow-amber':     'rgba(255, 191, 0, 0.7)',
    'yellow-sunshine':  'rgba(255, 239, 0, 0.5)',
    'yellow-light':     'rgba(255, 255, 0, 0.5)',
    'yellow-warm':      'rgba(255, 204, 0, 0.8)',
    'yellow-soft':      'rgba(255, 229, 153, 0.7)',
    'red-rose':         'rgba(255, 51, 51, 0.5)',
    'red-crimson':      'rgba(220, 20, 60, 0.6)',
    'red-light-coral':  'rgba(240, 128, 128, 0.5)',
    'red-fire-brick':   'rgba(178, 34, 34, 0.8)',
    'red-bright':       'rgba(255, 0, 0, 0.7)',
    'red-soft-coral':   'rgba(255, 102, 102, 0.6)',
    'red-dark':         'rgba(204, 0, 0, 0.8)',
    'blue-turquoise':   'rgba(64, 224, 208, 0.6)',
    'blue-dodger':      'rgba(30, 144, 255, 0.5)',
    'blue-navy':        'rgba(0, 0, 128, 0.8)',
    'blue-steel':       'rgba(70, 130, 180, 0.7)',
    'blue-sky':         'rgba(0, 153, 255, 0.5)',
    'blue-light':       'rgba(51, 204, 255, 0.7)',
    'blue-deep':        'rgba(0, 51, 204, 0.8)',
    'green-lime':       'rgba(50, 205, 50, 0.5)',
    'green-pale':       'rgba(152, 251, 152, 0.4)',
    'green-forest':     'rgba(34, 139, 34, 0.7)',
    'green-olive':      'rgba(128, 128, 0, 0.6)',
    'green-fresh':      'rgba(0, 204, 0, 0.6)',
    'green-soft-mint':  'rgba(102, 255, 153, 0.7)',
    'green-dark':       'rgba(0, 153, 76, 0.8)',
    'orange-tangerine': 'rgba(255, 140, 0, 0.6)',
    'orange-apricot':   'rgba(251, 206, 177, 0.5)',
    'orange-burnt':     'rgba(204, 85, 0, 0.7)',
    'orange-carrot':    'rgba(237, 145, 33, 0.6)',
    'orange-bright':    'rgba(255, 102, 0, 0.7)',
    'orange-soft-peach':'rgba(255, 178, 102, 0.6)',
    'orange-deep':      'rgba(204, 85, 0, 0.8)',
  },

  /* --- MATERIAL PALETTE SCALES (static, all 19 families) --- */
  palette: {
    yellow:       { '50':'#fffde7','100':'#fff9c4','200':'#fff59d','300':'#fff176','400':'#ffee58','500':'#ffeb3b','600':'#fdd835','700':'#fbc02d','800':'#f9a825','900':'#f57f17','A100':'#ffff8d','A200':'#ffff00','A400':'#ffea00','A700':'#ffd600' },
    amber:        { '50':'#fff8e1','100':'#ffecb3','200':'#ffe082','300':'#ffd54f','400':'#ffca28','500':'#ffc107','600':'#ffb300','700':'#ffa000','800':'#ff8f00','900':'#ff6f00','A100':'#ffe57f','A200':'#ffd740','A400':'#ffc400','A700':'#ffab00' },
    blue:         { '50':'#e3f2fd','100':'#bbdefb','200':'#90caf9','300':'#64b5f6','400':'#42a5f5','500':'#2196f3','600':'#1e88e5','700':'#1976d2','800':'#1565c0','900':'#0d47a1','A100':'#82b1ff','A200':'#448aff','A400':'#2979ff','A700':'#2962ff' },
    'blue-grey':  { '50':'#eceff1','100':'#cfd8dc','200':'#b0bec5','300':'#90a4ae','400':'#78909c','500':'#607d8b','600':'#546e7a','700':'#455a64','800':'#37474f','900':'#263238','A100':'#cfd8dc','A200':'#b0bec5','A400':'#78909c','A700':'#455a64' },
    brown:        { '50':'#efebe9','100':'#d7ccc8','200':'#bcaaa4','300':'#a1887f','400':'#8d6e63','500':'#795548','600':'#6d4c41','700':'#5d4037','800':'#4e342e','900':'#3e2723','A100':'#d7ccc8','A200':'#bcaaa4','A400':'#8d6e63','A700':'#5d4037' },
    teal:         { '50':'#e0f2f1','100':'#b2dfdb','200':'#80cbc4','300':'#4db6ac','400':'#26a69a','500':'#009688','600':'#00897b','700':'#00796b','800':'#00695c','900':'#004d40','A100':'#a7ffeb','A200':'#64ffda','A400':'#1de9b6','A700':'#00bfa5' },
    red:          { '50':'#ffebee','100':'#ffcdd2','200':'#ef9a9a','300':'#e57373','400':'#ef5350','500':'#f44336','600':'#e53935','700':'#d32f2f','800':'#c62828','900':'#b71c1c','A100':'#ff8a80','A200':'#ff5252','A400':'#ff1744','A700':'#d50000' },
    purple:       { '50':'#f3e5f5','100':'#e1bee7','200':'#ce93d8','300':'#ba68c8','400':'#ab47bc','500':'#9c27b0','600':'#8e24aa','700':'#7b1fa2','800':'#6a1b9a','900':'#4a148c','A100':'#ea80fc','A200':'#e040fb','A400':'#d500f9','A700':'#aa00ff' },
    pink:         { '50':'#fce4ec','100':'#f8bbd0','200':'#f48fb1','300':'#f06292','400':'#ec407a','500':'#e91e63','600':'#d81b60','700':'#c2185b','800':'#ad1457','900':'#880e4f','A100':'#ff80ab','A200':'#ff4081','A400':'#f50057','A700':'#c51162' },
    orange:       { '50':'#fff3e0','100':'#ffe0b2','200':'#ffcc80','300':'#ffb74d','400':'#ffa726','500':'#ff9800','600':'#fb8c00','700':'#f57c00','800':'#ef6c00','900':'#e65100','A100':'#ffd180','A200':'#ffab40','A400':'#ff9100','A700':'#ff6d00' },
    lime:         { '50':'#f9fbe7','100':'#f0f4c3','200':'#e6ee9c','300':'#dce775','400':'#d4e157','500':'#cddc39','600':'#c0ca33','700':'#afb42b','800':'#9e9d24','900':'#827717','A100':'#f4ff81','A200':'#eeff41','A400':'#c6ff00','A700':'#aeea00' },
    'light-green':{ '50':'#f1f8e9','100':'#dcedc8','200':'#c5e1a5','300':'#aed581','400':'#9ccc65','500':'#8bc34a','600':'#7cb342','700':'#689f38','800':'#558b2f','900':'#33691e','A100':'#ccff90','A200':'#b2ff59','A400':'#76ff03','A700':'#64dd17' },
    cyan:         { '50':'#e0f7fa','100':'#b2ebf2','200':'#80deea','300':'#4dd0e1','400':'#26c6da','500':'#00bcd4','600':'#00acc1','700':'#0097a7','800':'#00838f','900':'#006064','A100':'#84ffff','A200':'#18ffff','A400':'#00e5ff','A700':'#00b8d4' },
    'deep-orange':{ '50':'#fbe9e7','100':'#ffccbc','200':'#ffab91','300':'#ff8a65','400':'#ff7043','500':'#ff5722','600':'#f4511e','700':'#e64a19','800':'#d84315','900':'#bf360c','A100':'#ff9e80','A200':'#ff6e40','A400':'#ff3d00','A700':'#dd2c00' },
    'deep-purple':{ '50':'#ede7f6','100':'#d1c4e9','200':'#b39ddb','300':'#9575cd','400':'#7e57c2','500':'#673ab7','600':'#5e35b1','700':'#512da8','800':'#4527a0','900':'#311b92','A100':'#b388ff','A200':'#7c4dff','A400':'#651fff','A700':'#6200ea' },
    green:        { '50':'#e8f5e9','100':'#c8e6c9','200':'#a5d6a7','300':'#81c784','400':'#66bb6a','500':'#4caf50','600':'#43a047','700':'#388e3c','800':'#2e7d32','900':'#1b5e20','A100':'#b9f6ca','A200':'#69f0ae','A400':'#00e676','A700':'#00c853' },
    grey:         { '50':'#fafafa','100':'#f5f5f5','200':'#eeeeee','300':'#e0e0e0','400':'#bdbdbd','500':'#9e9e9e','600':'#757575','700':'#616161','800':'#424242','900':'#212121','A100':'#f5f5f5','A200':'#eeeeee','A400':'#bdbdbd','A700':'#616161' },
    indigo:       { '50':'#e8eaf6','100':'#c5cae9','200':'#9fa8da','300':'#7986cb','400':'#5c6bc0','500':'#3f51b5','600':'#3949ab','700':'#303f9f','800':'#283593','900':'#1a237e','A100':'#8c9eff','A200':'#536dfe','A400':'#3d5afe','A700':'#304ffe' },
    'light-blue': { '50':'#e1f5fe','100':'#b3e5fc','200':'#81d4fa','300':'#4fc3f7','400':'#29b6f6','500':'#03a9f4','600':'#039be5','700':'#0288d1','800':'#0277bd','900':'#01579b','A100':'#80d8ff','A200':'#40c4ff','A400':'#00b0ff','A700':'#0091ea' },
  },
}
```

---

## Typography System

### Variants

20 named variants. Font sizes are designed from scratch (not copied from MUI):

| Variant | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `h1` | 3.5rem | 800 | 1.2 | Hero headings |
| `h2` | 2.75rem | 800 | 1.25 | Section headings |
| `h3` | 2rem | 700 | 1.3 | Sub-section headings |
| `h4` | 1.5rem | 700 | 1.35 | Card headings |
| `h5` | 1.25rem | 600 | 1.4 | Small headings |
| `h6` | 1rem | 600 | 1.5 | Smallest heading |
| `subtitle1` | 1rem | 500 | 1.75 | Supporting headline |
| `subtitle2` | 0.875rem | 500 | 1.57 | Secondary subtitle |
| `body1` | 1rem | 400 | 1.75 | Default body text |
| `body2` | 0.875rem | 400 | 1.43 | Compact body text |
| `body-bold-1` | 1rem | 600 | 1.75 | Emphasized body |
| `body-bold-2` | 0.875rem | 600 | 1.43 | Emphasized compact |
| `caption` | 0.75rem | 400 | 1.66 | Labels, timestamps |
| `overline` | 0.75rem | 400 | 2.66 | Uppercase category label |
| `button-lg` | 0.9375rem | 500 | 1.73 | Large button label |
| `button-md` | 0.875rem | 500 | 1.71 | Default button label |
| `button-sm` | 0.8125rem | 500 | 1.69 | Small button label |
| `input-label` | 0.75rem | 400 | 1.5 | Form field label |
| `helper-text` | 0.75rem | 400 | 1.66 | Form hint / validation |
| `chip` | 0.8125rem | 400 | 1.38 | Chip/tag text |
| `tooltip` | 0.625rem | 500 | 1.4 | Tooltip content |
| `alert-title` | 1rem | 600 | 1.5 | Alert/banner heading |
| `table-header` | 0.875rem | 500 | 1.71 | Table column heading |
| `badge-label` | 0.75rem | 500 | 1.66 | Badge/notification count |

### Implementation: CSS variables → Tailwind plugin

Each variant is a set of CSS custom properties on `:root`. A Tailwind plugin generates `.text-variant-{name}` utility classes.

```css
:root {
  --typography-h1-size: 3.5rem;
  --typography-h1-weight: 800;
  --typography-h1-leading: 1.2;
  --typography-h1-tracking: -0.02em;
  /* ... repeat for all 24 variants */
}
```

```ts
// Tailwind plugin (in tailwind-preset.ts)
plugin(({ addUtilities }) => {
  addUtilities({
    '.text-variant-h1': {
      fontSize: 'var(--typography-h1-size)',
      fontWeight: 'var(--typography-h1-weight)',
      lineHeight: 'var(--typography-h1-leading)',
      letterSpacing: 'var(--typography-h1-tracking, 0em)',
    },
    // ... all variants
  })
})
```

### Typography component

```tsx
// packages/styled/src/typography/index.tsx
<Typography variant="h1">Heading</Typography>
<Typography variant="body2" color="text-secondary">Muted</Typography>
<Typography as="span" variant="caption">Label</Typography>
```

Props:
- `variant` — one of the 24 variant names (default: `body1`)
- `color` — any Tailwind text color class suffix (`"primary"`, `"text-secondary"`, `"error"`, etc.)
- `as` / `asChild` — polymorphic element
- `truncate` — boolean
- `noWrap` — boolean

---

## `color` Prop on Components

### Type

```ts
type SemanticColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default' | 'inherit'
```

- `default` → uses neutral surface + `fg` text tokens
- `inherit` → `currentColor` / inherits from parent

### Button API change

```tsx
// variant controls shape, color controls semantic color
<Button variant="contained" color="primary">Save</Button>
<Button variant="outlined" color="error">Delete</Button>
<Button variant="ghost" color="success">Approve</Button>
```

Compound variants in `tailwind-variants`:
```ts
compoundVariants: [
  { variant: 'contained', color: 'primary',   class: 'bg-primary text-primary-contrast hover:bg-primary-dark active:bg-primary-dark' },
  { variant: 'contained', color: 'error',     class: 'bg-error text-error-contrast hover:bg-error-dark' },
  { variant: 'outlined',  color: 'primary',   class: 'border-primary text-primary hover:bg-primary-shade-12' },
  { variant: 'ghost',     color: 'primary',   class: 'text-primary hover:bg-primary-shade-12' },
  // ... all 6 semantic × 4 variant combinations = 24 compound entries per component
]
```

### Components receiving `color` prop

| Component | Variants |
|---|---|
| Button | contained, outlined, ghost, link |
| Badge | filled, outlined |
| Alert | filled, outlined, soft |
| Checkbox | — |
| RadioGroup | — |
| Switch / Toggle | — |
| Slider | — |
| Progress | — |
| Spinner | — |
| Tags / Chip | filled, outlined, soft |
| Avatar | — |
| Tooltip | — |

---

## Files To Create / Modify

### New Files

```
packages/themes/src/
  palette.ts            — light/dark values for all semantic sub-tokens + static palette constants
  palette.types.ts      — PaletteColor, AlertPaletteColor, StaticPalette TypeScript types

packages/styled/src/typography/
  index.tsx             — Typography component
  typography.types.ts
  index.ts              — exports
```

### Modified Files

```
packages/themes/src/types.ts        — expand ThemeTokens with all new sub-tokens
packages/themes/src/themes.ts       — add new token values for slate, zinc, rose themes
packages/themes/src/index.ts        — export new palette types

packages/styled/src/tailwind-preset.ts  — add all new color mappings + typography plugin

packages/styled/src/button/index.tsx    — add color prop, compoundVariants
packages/styled/src/badge/index.tsx
packages/styled/src/alert/index.tsx
packages/styled/src/checkbox/index.tsx
packages/styled/src/radio-group/index.tsx
packages/styled/src/toggle/index.tsx
packages/styled/src/slider/index.tsx
packages/styled/src/progress/index.tsx
packages/styled/src/spinner/index.tsx
packages/styled/src/tags-input/index.tsx
packages/styled/src/avatar/index.tsx
packages/styled/src/tooltip/index.tsx

packages/styled/src/index.ts        — export Typography
```

---

## Backwards Compatibility

- All existing tokens (`--color-primary`, `--color-destructive`, `--color-bg`, `--color-fg`, `--color-muted`, etc.) are **kept as-is**. New tokens are additive.
- Button's existing `variant="default"` | `"destructive"` | `"secondary"` | `"outline"` | `"ghost"` | `"link"` keep working. The new `color` + `variant` API is available alongside, not a replacement.
- Three existing themes (`slate`, `zinc`, `rose`) are extended with new token values rather than replaced.

---

## Implementation Order

1. `palette.types.ts` — TypeScript types
2. `types.ts` — expand `ThemeTokens`
3. `palette.ts` — all light/dark token values + static palette constants
4. `themes.ts` — wire new tokens into slate/zinc/rose
5. `tailwind-preset.ts` — map CSS vars + static values + typography plugin
6. `Typography` component
7. `Button` — add `color` prop
8. Remaining 11 components — add `color` prop
9. Tests update
10. Changeset
