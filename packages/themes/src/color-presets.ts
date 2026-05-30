/**
 * Color accent presets for @aura-ui/themes.
 *
 * Built-in presets cover 10 common accent colors. Users can extend the list
 * by creating additional `ColorPreset` objects and passing them to
 * `useColorPreset({ extraPresets: [...] })` or calling `applyColorPreset`
 * with any arbitrary hex color.
 */

/* ── Types ─────────────────────────────────────────────────────────────────── */

/** A single accent-color preset. */
export interface ColorPreset {
  /** Unique machine-readable identifier. */
  id: string;
  /** Human-readable display name. */
  name: string;
  /** Primary hex color value (e.g. `'#6366f1'`). */
  hex: string;
}

/* ── Built-in catalogue ─────────────────────────────────────────────────────── */

/**
 * The 10 built-in accent presets shipped with @aura-ui/themes.
 * Typed `as const` so that `ColorPresetId` is a precise union of literal IDs.
 */
export const COLOR_PRESETS = [
  { id: 'aura',   name: 'Aura',   hex: '#5754a3' },
  { id: 'indigo', name: 'Indigo', hex: '#6366f1' },
  { id: 'ocean',  name: 'Ocean',  hex: '#0284c7' },
  { id: 'rose',   name: 'Rose',   hex: '#e11d48' },
  { id: 'forest', name: 'Forest', hex: '#16a34a' },
  { id: 'sunset', name: 'Sunset', hex: '#f97316' },
  { id: 'violet', name: 'Violet', hex: '#7c3aed' },
  { id: 'slate',  name: 'Slate',  hex: '#475569' },
  { id: 'ember',  name: 'Ember',  hex: '#be123c' },
  { id: 'zinc',   name: 'Zinc',   hex: '#71717a' },
] as const satisfies ReadonlyArray<ColorPreset>;

/** Union of all built-in preset IDs (e.g. `'aura' | 'indigo' | 'ocean' | ...`). */
export type ColorPresetId = (typeof COLOR_PRESETS)[number]['id'];

/**
 * Create a custom preset object. Useful for building typed preset lists
 * that will be passed to `useColorPreset({ extraPresets: [...] })`.
 *
 * @example
 * const myPreset = createColorPreset('brand', 'My Brand', '#ff5500');
 */
export function createColorPreset(id: string, name: string, hex: string): ColorPreset {
  return { id, name, hex };
}

/* ── HSL utilities (zero deps) ──────────────────────────────────────────────── */

function hexToHslParts(hex: string): { h: number; s: number; l: number } {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;
  let sat = 0;
  const lum = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = lum > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r)      hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else                hue = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(hue * 360), s: Math.round(sat * 100), l: Math.round(lum * 100) };
}

function hslStr({ h, s, l }: { h: number; s: number; l: number }): string {
  return `${h} ${s}% ${l}%`;
}

function shiftL(p: { h: number; s: number; l: number }, d: number) {
  return { ...p, l: Math.max(2, Math.min(97, p.l + d)) };
}

function relativeLuminance(hex: string): number {
  const h = hex.replace('#', '');
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * lin(parseInt(h.slice(0, 2), 16)) +
    0.7152 * lin(parseInt(h.slice(2, 4), 16)) +
    0.0722 * lin(parseInt(h.slice(4, 6), 16))
  );
}

/* ── DOM utilities ──────────────────────────────────────────────────────────── */

/** CSS custom properties overridden by `applyColorPreset`. */
const PRESET_CSS_VARS = [
  '--color-primary',
  '--color-ring',
  '--color-primary-hover',
  '--color-primary-active',
  '--color-primary-fg',
] as const;

/**
 * Apply an accent preset to the document root by overriding the five
 * primary-color CSS custom properties.  Safe to call on every theme/mode
 * change — the ThemeProvider will reset base vars first, then this re-applies.
 *
 * No-op in SSR environments.
 *
 * @param hex - The hex color string (e.g. `'#6366f1'`).
 */
export function applyColorPreset(hex: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const p    = hexToHslParts(hex);
  const fg   = relativeLuminance(hex) > 0.179 ? '222 47% 11%' : '0 0% 100%';
  root.style.setProperty('--color-primary',        hslStr(p));
  root.style.setProperty('--color-ring',            hslStr(p));
  root.style.setProperty('--color-primary-hover',  hslStr(shiftL(p,  6)));
  root.style.setProperty('--color-primary-active', hslStr(shiftL(p, -8)));
  root.style.setProperty('--color-primary-fg',     fg);
}

/**
 * Remove all CSS custom properties applied by `applyColorPreset`,
 * restoring whatever values the active ThemeProvider theme supplies.
 *
 * No-op in SSR environments.
 */
export function clearColorPreset(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  PRESET_CSS_VARS.forEach(k => root.style.removeProperty(k));
}
