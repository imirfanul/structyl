import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const animate = require('tailwindcss-animate');
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const twPlugin = require('tailwindcss/plugin');

const preset = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [],
  theme: {
    extend: {
      colors: {
        // ── Existing base tokens (backwards-compatible) ─────────────────────
        bg: 'hsl(var(--color-bg) / <alpha-value>)',
        fg: 'hsl(var(--color-fg) / <alpha-value>)',
        background: 'hsl(var(--color-bg) / <alpha-value>)',
        foreground: 'hsl(var(--color-fg) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
          foreground: 'hsl(var(--color-card-fg) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
          foreground: 'hsl(var(--color-popover-fg) / <alpha-value>)',
        },

        // ── Primary — extended with palette sub-tokens ──────────────────────
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-fg) / <alpha-value>)',
          hover: 'hsl(var(--color-primary-hover) / <alpha-value>)',
          active: 'hsl(var(--color-primary-active) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-primary-contrast) / <alpha-value>)',
          'dark-bg': 'rgb(var(--color-primary-dark-bg) / <alpha-value>)',
          'state-contained': 'var(--color-primary-state-contained)',
          'state-outlined': 'var(--color-primary-state-outlined)',
          'state-resting': 'var(--color-primary-state-resting)',
          'shade-12': 'var(--color-primary-shade-12)',
          'shade-16': 'var(--color-primary-shade-16)',
        },

        // ── Secondary — extended ────────────────────────────────────────────
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-secondary-fg) / <alpha-value>)',
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-secondary-contrast) / <alpha-value>)',
          'dark-bg': 'rgb(var(--color-secondary-dark-bg) / <alpha-value>)',
          'state-contained': 'var(--color-secondary-state-contained)',
          'state-outlined': 'var(--color-secondary-state-outlined)',
          'state-resting': 'var(--color-secondary-state-resting)',
          'shade-12': 'var(--color-secondary-shade-12)',
          'shade-16': 'var(--color-secondary-shade-16)',
        },

        muted: {
          DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
          foreground: 'hsl(var(--color-muted-fg) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          foreground: 'hsl(var(--color-accent-fg) / <alpha-value>)',
        },

        // ── Destructive — extended (alias for error) ────────────────────────
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
          foreground: 'hsl(var(--color-destructive-fg) / <alpha-value>)',
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
          dark: 'rgb(var(--color-error-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-error-contrast) / <alpha-value>)',
          'shade-12': 'var(--color-error-shade-12)',
          'shade-16': 'var(--color-error-shade-16)',
          'state-contained': 'var(--color-error-state-contained)',
          'state-outlined': 'var(--color-error-state-outlined)',
          'state-resting': 'var(--color-error-state-resting)',
          'alert-bg': 'var(--color-error-alert-bg)',
          'alert-content': 'var(--color-error-alert-content)',
        },

        // ── Error — alias for destructive, for the new color prop ───────────
        error: {
          DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
          foreground: 'hsl(var(--color-destructive-fg) / <alpha-value>)',
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
          dark: 'rgb(var(--color-error-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-error-contrast) / <alpha-value>)',
          'shade-12': 'var(--color-error-shade-12)',
          'shade-16': 'var(--color-error-shade-16)',
          'state-contained': 'var(--color-error-state-contained)',
          'state-outlined': 'var(--color-error-state-outlined)',
          'state-resting': 'var(--color-error-state-resting)',
          'alert-bg': 'var(--color-error-alert-bg)',
          'alert-content': 'var(--color-error-alert-content)',
        },

        // ── Success — extended ──────────────────────────────────────────────
        success: {
          DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
          foreground: 'hsl(var(--color-success-fg) / <alpha-value>)',
          light: 'rgb(var(--color-success-light) / <alpha-value>)',
          dark: 'rgb(var(--color-success-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-success-contrast) / <alpha-value>)',
          'shade-12': 'var(--color-success-shade-12)',
          'shade-16': 'var(--color-success-shade-16)',
          'state-contained': 'var(--color-success-state-contained)',
          'state-outlined': 'var(--color-success-state-outlined)',
          'state-resting': 'var(--color-success-state-resting)',
          'alert-bg': 'var(--color-success-alert-bg)',
          'alert-content': 'var(--color-success-alert-content)',
        },

        // ── Warning — extended ──────────────────────────────────────────────
        warning: {
          DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
          foreground: 'hsl(var(--color-warning-fg) / <alpha-value>)',
          light: 'rgb(var(--color-warning-light) / <alpha-value>)',
          dark: 'rgb(var(--color-warning-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-warning-contrast) / <alpha-value>)',
          'shade-12': 'var(--color-warning-shade-12)',
          'shade-16': 'var(--color-warning-shade-16)',
          'state-contained': 'var(--color-warning-state-contained)',
          'state-outlined': 'var(--color-warning-state-outlined)',
          'state-resting': 'var(--color-warning-state-resting)',
          'alert-bg': 'var(--color-warning-alert-bg)',
          'alert-content': 'var(--color-warning-alert-content)',
        },

        // ── Info — extended ─────────────────────────────────────────────────
        info: {
          DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
          foreground: 'hsl(var(--color-info-fg) / <alpha-value>)',
          light: 'rgb(var(--color-info-light) / <alpha-value>)',
          dark: 'rgb(var(--color-info-dark) / <alpha-value>)',
          contrast: 'rgb(var(--color-info-contrast) / <alpha-value>)',
          'shade-12': 'var(--color-info-shade-12)',
          'shade-16': 'var(--color-info-shade-16)',
          'state-contained': 'var(--color-info-state-contained)',
          'state-outlined': 'var(--color-info-state-outlined)',
          'state-resting': 'var(--color-info-state-resting)',
          'alert-bg': 'var(--color-info-alert-bg)',
          'alert-content': 'var(--color-info-alert-content)',
        },

        // ── Existing misc tokens ────────────────────────────────────────────
        border: 'hsl(var(--color-border) / <alpha-value>)',
        'border-strong': 'hsl(var(--color-border-strong) / <alpha-value>)',
        input: 'hsl(var(--color-input) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        overlay: 'hsl(var(--color-overlay) / <alpha-value>)',

        // ── New: text sub-tokens ────────────────────────────────────────────
        'fg-secondary': 'var(--color-text-secondary)',
        'fg-disabled': 'var(--color-text-disabled)',
        'fg-info': 'rgb(var(--color-text-info) / <alpha-value>)',
        'fg-fill': 'rgb(var(--color-text-fill) / <alpha-value>)',
        'fg-shade-12': 'var(--color-text-shade-12)',
        'fg-shade-16': 'var(--color-text-shade-16)',

        // ── New: surface ────────────────────────────────────────────────────
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          paper: 'rgb(var(--color-surface-paper) / <alpha-value>)',
        },

        // ── New: divider / borders ──────────────────────────────────────────
        divider: 'var(--color-divider)',
        'outlined-border': 'var(--color-outlined-border)',
        'input-line': 'var(--color-input-line)',

        // ── New: action tokens ──────────────────────────────────────────────
        action: {
          active: 'var(--color-action-active)',
          hover: 'var(--color-action-hover)',
          selected: 'var(--color-action-selected)',
          disabled: 'var(--color-action-disabled)',
          'disabled-bg': 'var(--color-action-disabled-bg)',
          focus: 'var(--color-action-focus)',
        },

        // ── New: misc tokens ────────────────────────────────────────────────
        backdrop: 'var(--color-backdrop, rgba(0, 0, 0, 0.5))',
        'rating-active': 'rgb(var(--color-rating-active, 250 176 5) / <alpha-value>)',
        'snackbar-bg': 'rgb(var(--color-snackbar-bg) / <alpha-value>)',

        // ── New: table tokens ───────────────────────────────────────────────
        table: {
          'top-header': 'rgb(var(--color-table-top-header) / <alpha-value>)',
          header: 'rgb(var(--color-table-header) / <alpha-value>)',
          row: 'rgb(var(--color-table-row) / <alpha-value>)',
          'col-border': 'rgb(var(--color-table-col-border) / <alpha-value>)',
          border: 'var(--color-table-border)',
        },

        // ── General named colors (static rgba, no CSS var) ──────────────────
        general: {
          'yellow-golden': 'rgba(255, 215, 0, 0.6)',
          'yellow-pale': 'rgba(255, 255, 153, 0.4)',
          'yellow-amber': 'rgba(255, 191, 0, 0.7)',
          'yellow-sunshine': 'rgba(255, 239, 0, 0.5)',
          'yellow-light': 'rgba(255, 255, 0, 0.5)',
          'yellow-warm': 'rgba(255, 204, 0, 0.8)',
          'yellow-soft': 'rgba(255, 229, 153, 0.7)',
          'red-rose': 'rgba(255, 51, 51, 0.5)',
          'red-crimson': 'rgba(220, 20, 60, 0.6)',
          'red-light-coral': 'rgba(240, 128, 128, 0.5)',
          'red-fire-brick': 'rgba(178, 34, 34, 0.8)',
          'red-bright': 'rgba(255, 0, 0, 0.7)',
          'red-soft-coral': 'rgba(255, 102, 102, 0.6)',
          'red-dark': 'rgba(204, 0, 0, 0.8)',
          'blue-turquoise': 'rgba(64, 224, 208, 0.6)',
          'blue-dodger': 'rgba(30, 144, 255, 0.5)',
          'blue-navy': 'rgba(0, 0, 128, 0.8)',
          'blue-steel': 'rgba(70, 130, 180, 0.7)',
          'blue-sky': 'rgba(0, 153, 255, 0.5)',
          'blue-light': 'rgba(51, 204, 255, 0.7)',
          'blue-deep': 'rgba(0, 51, 204, 0.8)',
          'green-lime': 'rgba(50, 205, 50, 0.5)',
          'green-pale': 'rgba(152, 251, 152, 0.4)',
          'green-forest': 'rgba(34, 139, 34, 0.7)',
          'green-olive': 'rgba(128, 128, 0, 0.6)',
          'green-fresh': 'rgba(0, 204, 0, 0.6)',
          'green-soft-mint': 'rgba(102, 255, 153, 0.7)',
          'green-dark': 'rgba(0, 153, 76, 0.8)',
          'orange-tangerine': 'rgba(255, 140, 0, 0.6)',
          'orange-apricot': 'rgba(251, 206, 177, 0.5)',
          'orange-burnt': 'rgba(204, 85, 0, 0.7)',
          'orange-carrot': 'rgba(237, 145, 33, 0.6)',
          'orange-bright': 'rgba(255, 102, 0, 0.7)',
          'orange-soft-peach': 'rgba(255, 178, 102, 0.6)',
          'orange-deep': 'rgba(204, 85, 0, 0.8)',
        },

        // ── Material palette scales (static hex, no CSS var) ─────────────────
        palette: {
          yellow: { '50': '#fffde7', '100': '#fff9c4', '200': '#fff59d', '300': '#fff176', '400': '#ffee58', '500': '#ffeb3b', '600': '#fdd835', '700': '#fbc02d', '800': '#f9a825', '900': '#f57f17', A100: '#ffff8d', A200: '#ffff00', A400: '#ffea00', A700: '#ffd600' },
          amber: { '50': '#fff8e1', '100': '#ffecb3', '200': '#ffe082', '300': '#ffd54f', '400': '#ffca28', '500': '#ffc107', '600': '#ffb300', '700': '#ffa000', '800': '#ff8f00', '900': '#ff6f00', A100: '#ffe57f', A200: '#ffd740', A400: '#ffc400', A700: '#ffab00' },
          blue: { '50': '#e3f2fd', '100': '#bbdefb', '200': '#90caf9', '300': '#64b5f6', '400': '#42a5f5', '500': '#2196f3', '600': '#1e88e5', '700': '#1976d2', '800': '#1565c0', '900': '#0d47a1', A100: '#82b1ff', A200: '#448aff', A400: '#2979ff', A700: '#2962ff' },
          'blue-grey': { '50': '#eceff1', '100': '#cfd8dc', '200': '#b0bec5', '300': '#90a4ae', '400': '#78909c', '500': '#607d8b', '600': '#546e7a', '700': '#455a64', '800': '#37474f', '900': '#263238', A100: '#cfd8dc', A200: '#b0bec5', A400: '#78909c', A700: '#455a64' },
          brown: { '50': '#efebe9', '100': '#d7ccc8', '200': '#bcaaa4', '300': '#a1887f', '400': '#8d6e63', '500': '#795548', '600': '#6d4c41', '700': '#5d4037', '800': '#4e342e', '900': '#3e2723', A100: '#d7ccc8', A200: '#bcaaa4', A400: '#8d6e63', A700: '#5d4037' },
          teal: { '50': '#e0f2f1', '100': '#b2dfdb', '200': '#80cbc4', '300': '#4db6ac', '400': '#26a69a', '500': '#009688', '600': '#00897b', '700': '#00796b', '800': '#00695c', '900': '#004d40', A100: '#a7ffeb', A200: '#64ffda', A400: '#1de9b6', A700: '#00bfa5' },
          red: { '50': '#ffebee', '100': '#ffcdd2', '200': '#ef9a9a', '300': '#e57373', '400': '#ef5350', '500': '#f44336', '600': '#e53935', '700': '#d32f2f', '800': '#c62828', '900': '#b71c1c', A100: '#ff8a80', A200: '#ff5252', A400: '#ff1744', A700: '#d50000' },
          purple: { '50': '#f3e5f5', '100': '#e1bee7', '200': '#ce93d8', '300': '#ba68c8', '400': '#ab47bc', '500': '#9c27b0', '600': '#8e24aa', '700': '#7b1fa2', '800': '#6a1b9a', '900': '#4a148c', A100: '#ea80fc', A200: '#e040fb', A400: '#d500f9', A700: '#aa00ff' },
          pink: { '50': '#fce4ec', '100': '#f8bbd0', '200': '#f48fb1', '300': '#f06292', '400': '#ec407a', '500': '#e91e63', '600': '#d81b60', '700': '#c2185b', '800': '#ad1457', '900': '#880e4f', A100: '#ff80ab', A200: '#ff4081', A400: '#f50057', A700: '#c51162' },
          orange: { '50': '#fff3e0', '100': '#ffe0b2', '200': '#ffcc80', '300': '#ffb74d', '400': '#ffa726', '500': '#ff9800', '600': '#fb8c00', '700': '#f57c00', '800': '#ef6c00', '900': '#e65100', A100: '#ffd180', A200: '#ffab40', A400: '#ff9100', A700: '#ff6d00' },
          lime: { '50': '#f9fbe7', '100': '#f0f4c3', '200': '#e6ee9c', '300': '#dce775', '400': '#d4e157', '500': '#cddc39', '600': '#c0ca33', '700': '#afb42b', '800': '#9e9d24', '900': '#827717', A100: '#f4ff81', A200: '#eeff41', A400: '#c6ff00', A700: '#aeea00' },
          'light-green': { '50': '#f1f8e9', '100': '#dcedc8', '200': '#c5e1a5', '300': '#aed581', '400': '#9ccc65', '500': '#8bc34a', '600': '#7cb342', '700': '#689f38', '800': '#558b2f', '900': '#33691e', A100: '#ccff90', A200: '#b2ff59', A400: '#76ff03', A700: '#64dd17' },
          cyan: { '50': '#e0f7fa', '100': '#b2ebf2', '200': '#80deea', '300': '#4dd0e1', '400': '#26c6da', '500': '#00bcd4', '600': '#00acc1', '700': '#0097a7', '800': '#00838f', '900': '#006064', A100: '#84ffff', A200: '#18ffff', A400: '#00e5ff', A700: '#00b8d4' },
          'deep-orange': { '50': '#fbe9e7', '100': '#ffccbc', '200': '#ffab91', '300': '#ff8a65', '400': '#ff7043', '500': '#ff5722', '600': '#f4511e', '700': '#e64a19', '800': '#d84315', '900': '#bf360c', A100: '#ff9e80', A200: '#ff6e40', A400: '#ff3d00', A700: '#dd2c00' },
          'deep-purple': { '50': '#ede7f6', '100': '#d1c4e9', '200': '#b39ddb', '300': '#9575cd', '400': '#7e57c2', '500': '#673ab7', '600': '#5e35b1', '700': '#512da8', '800': '#4527a0', '900': '#311b92', A100: '#b388ff', A200: '#7c4dff', A400: '#651fff', A700: '#6200ea' },
          green: { '50': '#e8f5e9', '100': '#c8e6c9', '200': '#a5d6a7', '300': '#81c784', '400': '#66bb6a', '500': '#4caf50', '600': '#43a047', '700': '#388e3c', '800': '#2e7d32', '900': '#1b5e20', A100: '#b9f6ca', A200: '#69f0ae', A400: '#00e676', A700: '#00c853' },
          grey: { '50': '#fafafa', '100': '#f5f5f5', '200': '#eeeeee', '300': '#e0e0e0', '400': '#bdbdbd', '500': '#9e9e9e', '600': '#757575', '700': '#616161', '800': '#424242', '900': '#212121', A100: '#f5f5f5', A200: '#eeeeee', A400: '#bdbdbd', A700: '#616161' },
          indigo: { '50': '#e8eaf6', '100': '#c5cae9', '200': '#9fa8da', '300': '#7986cb', '400': '#5c6bc0', '500': '#3f51b5', '600': '#3949ab', '700': '#303f9f', '800': '#283593', '900': '#1a237e', A100: '#8c9eff', A200: '#536dfe', A400: '#3d5afe', A700: '#304ffe' },
          'light-blue': { '50': '#e1f5fe', '100': '#b3e5fc', '200': '#81d4fa', '300': '#4fc3f7', '400': '#29b6f6', '500': '#03a9f4', '600': '#039be5', '700': '#0288d1', '800': '#0277bd', '900': '#01579b', A100: '#80d8ff', A200: '#40c4ff', A400: '#00b0ff', A700: '#0091ea' },
        },
      },

      borderRadius: {
        '2xl': 'calc(var(--radius, 0.5rem) + 8px)',
        xl: 'calc(var(--radius, 0.5rem) + 4px)',
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
        xs: 'calc(var(--radius, 0.5rem) - 6px)',
      },

      boxShadow: {
        xs: 'var(--shadow-xs, 0 1px 2px 0 hsl(var(--color-shadow) / 0.04))',
        sm: 'var(--shadow-sm, 0 1px 2px 0 hsl(var(--color-shadow) / 0.05), 0 1px 3px 0 hsl(var(--color-shadow) / 0.06))',
        DEFAULT: 'var(--shadow, 0 1px 2px 0 hsl(var(--color-shadow) / 0.06), 0 4px 8px -2px hsl(var(--color-shadow) / 0.08))',
        md: 'var(--shadow-md, 0 4px 8px -1px hsl(var(--color-shadow) / 0.08), 0 2px 4px -2px hsl(var(--color-shadow) / 0.08))',
        lg: 'var(--shadow-lg, 0 10px 24px -3px hsl(var(--color-shadow) / 0.12), 0 4px 8px -4px hsl(var(--color-shadow) / 0.10))',
        xl: 'var(--shadow-xl, 0 20px 32px -5px hsl(var(--color-shadow) / 0.14), 0 8px 16px -6px hsl(var(--color-shadow) / 0.12))',
        '2xl': 'var(--shadow-2xl, 0 32px 64px -12px hsl(var(--color-shadow) / 0.22))',
        inner: 'var(--shadow-inner, inset 0 2px 4px 0 hsl(var(--color-shadow) / 0.05))',
        button: '0 0.5px 1px 0 hsl(var(--color-shadow) / 0.10), 0 1px 2px 0 hsl(var(--color-shadow) / 0.08), inset 0 1px 0 0 hsl(0 0% 100% / 0.10)',
        'button-active': 'inset 0 1px 2px 0 hsl(var(--color-shadow) / 0.12)',
        overlay: '0 10px 38px -10px hsl(var(--color-shadow) / 0.35), 0 10px 20px -15px hsl(var(--color-shadow) / 0.20)',
        ring: '0 0 0 2px hsl(var(--color-bg)), 0 0 0 4px hsl(var(--color-ring) / 0.45)',
      },

      transitionTimingFunction: {
        'ease-out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)',
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        instant: '50ms',
        snappy: '120ms',
        smooth: '180ms',
        comfortable: '240ms',
        relaxed: '320ms',
      },

      backdropBlur: {
        xs: '2px',
        glass: '10px',
      },

      fontFamily: {
        sans: ['var(--font-sans, -apple-system)', 'BlinkMacSystemFont', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono, ui-monospace)', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },

      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'zoom-in': { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        'zoom-out': { from: { opacity: '1', transform: 'scale(1)' }, to: { opacity: '0', transform: 'scale(0.96)' } },
        'slide-in-from-top': { from: { transform: 'translateY(-12px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-out-to-top': { from: { transform: 'translateY(0)', opacity: '1' }, to: { transform: 'translateY(-12px)', opacity: '0' } },
        'slide-in-from-bottom': { from: { transform: 'translateY(12px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-out-to-bottom': { from: { transform: 'translateY(0)', opacity: '1' }, to: { transform: 'translateY(12px)', opacity: '0' } },
        'slide-in-from-left': { from: { transform: 'translateX(-12px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-out-to-left': { from: { transform: 'translateX(0)', opacity: '1' }, to: { transform: 'translateX(-12px)', opacity: '0' } },
        'slide-in-from-right': { from: { transform: 'translateX(12px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-out-to-right': { from: { transform: 'translateX(0)', opacity: '1' }, to: { transform: 'translateX(12px)', opacity: '0' } },
        'sheet-in-from-top': { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(0)' } },
        'sheet-out-to-top': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-100%)' } },
        'sheet-in-from-bottom': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        'sheet-out-to-bottom': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(100%)' } },
        'sheet-in-from-left': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'sheet-out-to-left': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'sheet-in-from-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        'sheet-out-to-right': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(100%)' } },
        'collapsible-down': { from: { height: '0', opacity: '0' }, to: { height: 'var(--aura-ui-collapsible-content-height)', opacity: '1' } },
        'collapsible-up': { from: { height: 'var(--aura-ui-collapsible-content-height)', opacity: '1' }, to: { height: '0', opacity: '0' } },
        'progress-indeterminate': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(200%)' } },
        'skeleton-pulse': { '0%, 100%': { opacity: '0.5' }, '50%': { opacity: '0.8' } },
        'spring-press': { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(0.97)' }, '100%': { transform: 'scale(1)' } },
        'toast-in': { from: { transform: 'translateY(calc(100% + 1rem))', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'toast-out': { from: { transform: 'translateX(0)', opacity: '1' }, to: { transform: 'translateX(calc(100% + 1rem))', opacity: '0' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'progress-stripes': { '0%': { backgroundPosition: '1rem 0' }, '100%': { backgroundPosition: '0 0' } },
        bars: { '0%': { transform: 'scaleY(0.4)' }, '100%': { transform: 'scaleY(1.0)' } },
      },

      animation: {
        'fade-in': 'fade-in 180ms cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-out': 'fade-out 120ms cubic-bezier(0.4, 0, 1, 1)',
        'zoom-in': 'zoom-in 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        'zoom-out': 'zoom-out 120ms cubic-bezier(0.4, 0, 1, 1)',
        'collapsible-down': 'collapsible-down 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        'collapsible-up': 'collapsible-up 180ms cubic-bezier(0.4, 0, 0.2, 1)',
        'progress-indeterminate': 'progress-indeterminate 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-stripes': 'progress-stripes 1s linear infinite',
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
        'spring-press': 'spring-press 180ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'toast-in': 'toast-in 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-out': 'toast-out 180ms cubic-bezier(0.4, 0, 1, 1)',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        bars: 'bars 1s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    animate,
    twPlugin(({
      addBase,
      addUtilities,
    }: {
      addBase: (b: Record<string, Record<string, string>>) => void;
      addUtilities: (u: Record<string, Record<string, string>>) => void;
    }) => {
      // ── Typography CSS custom properties ─────────────────────────────────
      // Injected into :root so any theme or user CSS can override a single var
      // to restyle the entire variant (e.g. `--typography-h1-size: 4rem`).
      addBase({
        ':root': {
          // Headings
          '--typography-h1-size': '3.5rem',           '--typography-h1-weight': '800',  '--typography-h1-line-height': '1.2',   '--typography-h1-letter-spacing': '-0.02em',
          '--typography-h2-size': '2.75rem',          '--typography-h2-weight': '800',  '--typography-h2-line-height': '1.25', '--typography-h2-letter-spacing': '-0.01em',
          '--typography-h3-size': '2rem',             '--typography-h3-weight': '700',  '--typography-h3-line-height': '1.3',
          '--typography-h4-size': '1.5rem',           '--typography-h4-weight': '700',  '--typography-h4-line-height': '1.35',
          '--typography-h5-size': '1.25rem',          '--typography-h5-weight': '600',  '--typography-h5-line-height': '1.4',
          '--typography-h6-size': '1rem',             '--typography-h6-weight': '600',  '--typography-h6-line-height': '1.5',  '--typography-h6-letter-spacing': '0.0075em',
          // Subtitles
          '--typography-subtitle1-size': '1rem',      '--typography-subtitle1-weight': '500', '--typography-subtitle1-line-height': '1.75', '--typography-subtitle1-letter-spacing': '0.009em',
          '--typography-subtitle2-size': '0.875rem',  '--typography-subtitle2-weight': '500', '--typography-subtitle2-line-height': '1.57', '--typography-subtitle2-letter-spacing': '0.006em',
          // Body
          '--typography-body1-size': '1rem',          '--typography-body1-weight': '400',     '--typography-body1-line-height': '1.75',
          '--typography-body2-size': '0.875rem',      '--typography-body2-weight': '400',     '--typography-body2-line-height': '1.43',
          '--typography-body-bold-1-size': '1rem',    '--typography-body-bold-1-weight': '600', '--typography-body-bold-1-line-height': '1.75',
          '--typography-body-bold-2-size': '0.875rem','--typography-body-bold-2-weight': '600', '--typography-body-bold-2-line-height': '1.43',
          // Small scale
          '--typography-caption-size': '0.75rem',     '--typography-caption-weight': '400',   '--typography-caption-line-height': '1.66',  '--typography-caption-letter-spacing': '0.033em',
          '--typography-overline-size': '0.75rem',    '--typography-overline-weight': '400',  '--typography-overline-line-height': '2.66', '--typography-overline-letter-spacing': '0.083em',
          // Buttons
          '--typography-button-lg-size': '0.9375rem', '--typography-button-lg-weight': '500', '--typography-button-lg-line-height': '1.73', '--typography-button-lg-letter-spacing': '0.046em',
          '--typography-button-md-size': '0.875rem',  '--typography-button-md-weight': '500', '--typography-button-md-line-height': '1.71', '--typography-button-md-letter-spacing': '0.046em',
          '--typography-button-sm-size': '0.8125rem', '--typography-button-sm-weight': '500', '--typography-button-sm-line-height': '1.69', '--typography-button-sm-letter-spacing': '0.046em',
          // Form / UI chrome
          '--typography-input-label-size': '0.75rem',  '--typography-input-label-weight': '400', '--typography-input-label-line-height': '1.5',   '--typography-input-label-letter-spacing': '0.009em',
          '--typography-helper-text-size': '0.75rem',  '--typography-helper-text-weight': '400', '--typography-helper-text-line-height': '1.66',  '--typography-helper-text-letter-spacing': '0.033em',
          '--typography-chip-size': '0.8125rem',        '--typography-chip-weight': '400',        '--typography-chip-line-height': '1.38',         '--typography-chip-letter-spacing': '0.016em',
          '--typography-tooltip-size': '0.625rem',      '--typography-tooltip-weight': '500',     '--typography-tooltip-line-height': '1.4',
          '--typography-alert-title-size': '1rem',      '--typography-alert-title-weight': '600', '--typography-alert-title-line-height': '1.5',   '--typography-alert-title-letter-spacing': '0.009em',
          '--typography-table-header-size': '0.875rem', '--typography-table-header-weight': '500','--typography-table-header-line-height': '1.71', '--typography-table-header-letter-spacing': '0.017em',
          '--typography-badge-label-size': '0.75rem',   '--typography-badge-label-weight': '500', '--typography-badge-label-line-height': '1.66',  '--typography-badge-label-letter-spacing': '0.014em',
        },
      });

      // ── Color foreground alias vars ───────────────────────────────────────
      // Theme tokens use the short -fg suffix; these aliases let plain CSS also
      // use the longer -foreground convention (var(--color-primary-foreground)).
      addBase({
        ':root': {
          '--color-primary-foreground':     'var(--color-primary-fg)',
          '--color-secondary-foreground':   'var(--color-secondary-fg)',
          '--color-destructive-foreground': 'var(--color-destructive-fg)',
          '--color-success-foreground':     'var(--color-success-fg)',
          '--color-warning-foreground':     'var(--color-warning-fg)',
          '--color-info-foreground':        'var(--color-info-fg)',
          '--color-muted-foreground':       'var(--color-muted-fg)',
          '--color-accent-foreground':      'var(--color-accent-fg)',
          '--color-card-foreground':        'var(--color-card-fg)',
          '--color-popover-foreground':     'var(--color-popover-fg)',
        },
      });

      // ── Typography variant utilities (use CSS custom properties) ─────────
      addUtilities({
        '.text-variant-h1':          { fontSize: 'var(--typography-h1-size)',         fontWeight: 'var(--typography-h1-weight)',         lineHeight: 'var(--typography-h1-line-height)',         letterSpacing: 'var(--typography-h1-letter-spacing)' },
        '.text-variant-h2':          { fontSize: 'var(--typography-h2-size)',         fontWeight: 'var(--typography-h2-weight)',         lineHeight: 'var(--typography-h2-line-height)',         letterSpacing: 'var(--typography-h2-letter-spacing)' },
        '.text-variant-h3':          { fontSize: 'var(--typography-h3-size)',         fontWeight: 'var(--typography-h3-weight)',         lineHeight: 'var(--typography-h3-line-height)' },
        '.text-variant-h4':          { fontSize: 'var(--typography-h4-size)',         fontWeight: 'var(--typography-h4-weight)',         lineHeight: 'var(--typography-h4-line-height)' },
        '.text-variant-h5':          { fontSize: 'var(--typography-h5-size)',         fontWeight: 'var(--typography-h5-weight)',         lineHeight: 'var(--typography-h5-line-height)' },
        '.text-variant-h6':          { fontSize: 'var(--typography-h6-size)',         fontWeight: 'var(--typography-h6-weight)',         lineHeight: 'var(--typography-h6-line-height)',         letterSpacing: 'var(--typography-h6-letter-spacing)' },
        '.text-variant-subtitle1':   { fontSize: 'var(--typography-subtitle1-size)',  fontWeight: 'var(--typography-subtitle1-weight)',  lineHeight: 'var(--typography-subtitle1-line-height)',  letterSpacing: 'var(--typography-subtitle1-letter-spacing)' },
        '.text-variant-subtitle2':   { fontSize: 'var(--typography-subtitle2-size)',  fontWeight: 'var(--typography-subtitle2-weight)',  lineHeight: 'var(--typography-subtitle2-line-height)',  letterSpacing: 'var(--typography-subtitle2-letter-spacing)' },
        '.text-variant-body1':       { fontSize: 'var(--typography-body1-size)',      fontWeight: 'var(--typography-body1-weight)',      lineHeight: 'var(--typography-body1-line-height)' },
        '.text-variant-body2':       { fontSize: 'var(--typography-body2-size)',      fontWeight: 'var(--typography-body2-weight)',      lineHeight: 'var(--typography-body2-line-height)' },
        '.text-variant-body-bold-1': { fontSize: 'var(--typography-body-bold-1-size)',fontWeight: 'var(--typography-body-bold-1-weight)',lineHeight: 'var(--typography-body-bold-1-line-height)' },
        '.text-variant-body-bold-2': { fontSize: 'var(--typography-body-bold-2-size)',fontWeight: 'var(--typography-body-bold-2-weight)',lineHeight: 'var(--typography-body-bold-2-line-height)' },
        '.text-variant-caption':     { fontSize: 'var(--typography-caption-size)',    fontWeight: 'var(--typography-caption-weight)',    lineHeight: 'var(--typography-caption-line-height)',    letterSpacing: 'var(--typography-caption-letter-spacing)' },
        '.text-variant-overline':    { fontSize: 'var(--typography-overline-size)',   fontWeight: 'var(--typography-overline-weight)',   lineHeight: 'var(--typography-overline-line-height)',   letterSpacing: 'var(--typography-overline-letter-spacing)', textTransform: 'uppercase' },
        '.text-variant-button-lg':   { fontSize: 'var(--typography-button-lg-size)',  fontWeight: 'var(--typography-button-lg-weight)',  lineHeight: 'var(--typography-button-lg-line-height)',  letterSpacing: 'var(--typography-button-lg-letter-spacing)' },
        '.text-variant-button-md':   { fontSize: 'var(--typography-button-md-size)',  fontWeight: 'var(--typography-button-md-weight)',  lineHeight: 'var(--typography-button-md-line-height)',  letterSpacing: 'var(--typography-button-md-letter-spacing)' },
        '.text-variant-button-sm':   { fontSize: 'var(--typography-button-sm-size)',  fontWeight: 'var(--typography-button-sm-weight)',  lineHeight: 'var(--typography-button-sm-line-height)',  letterSpacing: 'var(--typography-button-sm-letter-spacing)' },
        '.text-variant-input-label': { fontSize: 'var(--typography-input-label-size)',fontWeight: 'var(--typography-input-label-weight)',lineHeight: 'var(--typography-input-label-line-height)', letterSpacing: 'var(--typography-input-label-letter-spacing)' },
        '.text-variant-helper-text': { fontSize: 'var(--typography-helper-text-size)',fontWeight: 'var(--typography-helper-text-weight)',lineHeight: 'var(--typography-helper-text-line-height)', letterSpacing: 'var(--typography-helper-text-letter-spacing)' },
        '.text-variant-chip':        { fontSize: 'var(--typography-chip-size)',       fontWeight: 'var(--typography-chip-weight)',       lineHeight: 'var(--typography-chip-line-height)',       letterSpacing: 'var(--typography-chip-letter-spacing)' },
        '.text-variant-tooltip':     { fontSize: 'var(--typography-tooltip-size)',    fontWeight: 'var(--typography-tooltip-weight)',    lineHeight: 'var(--typography-tooltip-line-height)' },
        '.text-variant-alert-title': { fontSize: 'var(--typography-alert-title-size)',fontWeight: 'var(--typography-alert-title-weight)',lineHeight: 'var(--typography-alert-title-line-height)', letterSpacing: 'var(--typography-alert-title-letter-spacing)' },
        '.text-variant-table-header':{ fontSize: 'var(--typography-table-header-size)',fontWeight:'var(--typography-table-header-weight)',lineHeight:'var(--typography-table-header-line-height)', letterSpacing: 'var(--typography-table-header-letter-spacing)' },
        '.text-variant-badge-label': { fontSize: 'var(--typography-badge-label-size)',fontWeight: 'var(--typography-badge-label-weight)',lineHeight: 'var(--typography-badge-label-line-height)', letterSpacing: 'var(--typography-badge-label-letter-spacing)' },
      });
    }),
  ],
} satisfies Partial<Config>;

export default preset;
