import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const animate = require('tailwindcss-animate');

/**
 * Tailwind preset for @aura-ui/styled.
 *
 * Apple-grade design tokens: semantic colors with alpha support, multi-layered
 * shadows, spring easing curves, full keyframe library (fade/zoom/slide/spring),
 * and a granular radius scale.
 *
 * @example
 * // tailwind.config.ts
 * import auraUiPreset from '@aura-ui/styled/tailwind-preset';
 * export default { presets: [auraUiPreset] } satisfies Config;
 */
const preset = {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [],
  theme: {
    extend: {
      colors: {
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
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-fg) / <alpha-value>)',
          hover: 'hsl(var(--color-primary-hover) / <alpha-value>)',
          active: 'hsl(var(--color-primary-active) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-secondary-fg) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
          foreground: 'hsl(var(--color-muted-fg) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          foreground: 'hsl(var(--color-accent-fg) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
          foreground: 'hsl(var(--color-destructive-fg) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
          foreground: 'hsl(var(--color-success-fg) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
          foreground: 'hsl(var(--color-warning-fg) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'hsl(var(--color-info) / <alpha-value>)',
          foreground: 'hsl(var(--color-info-fg) / <alpha-value>)',
        },
        border: 'hsl(var(--color-border) / <alpha-value>)',
        'border-strong': 'hsl(var(--color-border-strong) / <alpha-value>)',
        input: 'hsl(var(--color-input) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        overlay: 'hsl(var(--color-overlay) / <alpha-value>)',
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
        // Apple-style multi-layer shadows; rely on theme tokens for color
        xs: 'var(--shadow-xs, 0 1px 2px 0 hsl(var(--color-shadow) / 0.04))',
        sm: 'var(--shadow-sm, 0 1px 2px 0 hsl(var(--color-shadow) / 0.05), 0 1px 3px 0 hsl(var(--color-shadow) / 0.06))',
        DEFAULT:
          'var(--shadow, 0 1px 2px 0 hsl(var(--color-shadow) / 0.06), 0 4px 8px -2px hsl(var(--color-shadow) / 0.08))',
        md: 'var(--shadow-md, 0 4px 8px -1px hsl(var(--color-shadow) / 0.08), 0 2px 4px -2px hsl(var(--color-shadow) / 0.08))',
        lg: 'var(--shadow-lg, 0 10px 24px -3px hsl(var(--color-shadow) / 0.12), 0 4px 8px -4px hsl(var(--color-shadow) / 0.10))',
        xl: 'var(--shadow-xl, 0 20px 32px -5px hsl(var(--color-shadow) / 0.14), 0 8px 16px -6px hsl(var(--color-shadow) / 0.12))',
        '2xl': 'var(--shadow-2xl, 0 32px 64px -12px hsl(var(--color-shadow) / 0.22))',
        inner: 'var(--shadow-inner, inset 0 2px 4px 0 hsl(var(--color-shadow) / 0.05))',
        // Subtle pressable surfaces (Apple HIG style)
        button:
          '0 0.5px 1px 0 hsl(var(--color-shadow) / 0.10), 0 1px 2px 0 hsl(var(--color-shadow) / 0.08), inset 0 1px 0 0 hsl(0 0% 100% / 0.10)',
        'button-active': 'inset 0 1px 2px 0 hsl(var(--color-shadow) / 0.12)',
        // Glassy overlays (Popover/Tooltip/DropdownMenu)
        overlay:
          '0 10px 38px -10px hsl(var(--color-shadow) / 0.35), 0 10px 20px -15px hsl(var(--color-shadow) / 0.20)',
        // Focus ring (used everywhere)
        ring: '0 0 0 2px hsl(var(--color-bg)), 0 0 0 4px hsl(var(--color-ring) / 0.45)',
      },
      transitionTimingFunction: {
        // Apple's preferred easing curves
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
        sans: [
          'var(--font-sans, -apple-system)',
          'BlinkMacSystemFont',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono, ui-monospace)',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      keyframes: {
        // Fade
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        // Zoom (spring-ish)
        'zoom-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.96)' },
        },
        // Slide
        'slide-in-from-top': {
          from: { transform: 'translateY(-12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out-to-top': {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(-12px)', opacity: '0' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(12px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-out-to-bottom': {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(12px)', opacity: '0' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-12px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-to-left': {
          from: { transform: 'translateX(0)', opacity: '1' },
          to: { transform: 'translateX(-12px)', opacity: '0' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(12px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-to-right': {
          from: { transform: 'translateX(0)', opacity: '1' },
          to: { transform: 'translateX(12px)', opacity: '0' },
        },
        // Sheet/drawer full-edge slides
        'sheet-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'sheet-out-to-top': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'sheet-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'sheet-out-to-bottom': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        'sheet-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'sheet-out-to-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'sheet-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'sheet-out-to-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
        // Collapsible
        'collapsible-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--aura-ui-collapsible-content-height)', opacity: '1' },
        },
        'collapsible-up': {
          from: { height: 'var(--aura-ui-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        // Indeterminate progress
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        // Spinner pulse for skeleton
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        // Spring scale tap (Apple-style press)
        'spring-press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        // Toast slide in
        'toast-in': {
          from: { transform: 'translateY(calc(100% + 1rem))', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'toast-out': {
          from: { transform: 'translateX(0)', opacity: '1' },
          to: { transform: 'translateX(calc(100% + 1rem))', opacity: '0' },
        },
        // Shimmer sweep — translateX so the after::pseudo-element slides across
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // Striped progress bar animation
        'progress-stripes': {
          '0%':   { backgroundPosition: '1rem 0' },
          '100%': { backgroundPosition: '0 0' },
        },
        // Bars spinner — scales each bar up/down
        bars: {
          '0%':   { transform: 'scaleY(0.4)' },
          '100%': { transform: 'scaleY(1.0)' },
        },
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
  plugins: [animate],
} satisfies Partial<Config>;

export default preset;
