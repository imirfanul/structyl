/**
 * Color utilities. Pure functions, no dependencies.
 * Parsing, conversion (hex ↔ rgb ↔ hsl), alpha, and WCAG contrast helpers.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));
const clampByte = (v: number): number => Math.max(0, Math.min(255, Math.round(v)));

/**
 * Parse a hex color (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`) into RGB.
 * Returns `null` for malformed input.
 */
export const hexToRgb = (hex: string): RGB | null => {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3 || h.length === 4) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (h.length !== 6 && h.length !== 8) return null;
  if (!/^[0-9a-fA-F]+$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

/** Convert RGB to a `#rrggbb` hex string. */
export const rgbToHex = ({ r, g, b }: RGB): string => {
  const toHex = (v: number) => clampByte(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/** Convert RGB (0–255) to HSL (h: 0–360, s/l: 0–100). */
export const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

/** Convert HSL (h: 0–360, s/l: 0–100) to RGB (0–255). */
export const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const sn = clamp01(s / 100);
  const ln = clamp01(l / 100);
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = ln - c / 2;
  return { r: clampByte((r + m) * 255), g: clampByte((g + m) * 255), b: clampByte((b + m) * 255) };
};

/**
 * Parse a color string into RGB. Accepts `#hex`, `rgb()/rgba()`, and `hsl()/hsla()`.
 * Returns `null` if the string can't be parsed.
 */
export const parseColor = (color: string): RGB | null => {
  const c = color.trim();
  if (c.startsWith('#')) return hexToRgb(c);

  const rgbMatch = c.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1]!.split(/[,\s/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const [r, g, b] = parts;
    return { r: clampByte(parseFloat(r!)), g: clampByte(parseFloat(g!)), b: clampByte(parseFloat(b!)) };
  }

  const hslMatch = c.match(/^hsla?\(([^)]+)\)$/i);
  if (hslMatch) {
    const parts = hslMatch[1]!.split(/[,\s/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const [h, s, l] = parts;
    return hslToRgb({ h: parseFloat(h!), s: parseFloat(s!.replace('%', '')), l: parseFloat(l!.replace('%', '')) });
  }

  return null;
};

/**
 * Return a color string with the given alpha (0–1) applied as `rgba()`.
 * Accepts any input `parseColor` understands. Returns the input unchanged if unparseable.
 */
export const withAlpha = (color: string, alpha: number): string => {
  const rgb = parseColor(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp01(alpha)})`;
};

/** Relative luminance (0–1) per WCAG 2.x, for a color string or RGB object. */
export const luminance = (color: string | RGB): number => {
  const rgb = typeof color === 'string' ? parseColor(color) : color;
  if (!rgb) return 0;
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
};

/**
 * Pick a readable foreground (`#000000` or `#ffffff`) for a given background,
 * using WCAG relative luminance. Defaults to white text on parse failure.
 */
export const getContrastColor = (background: string | RGB, dark = '#000000', light = '#ffffff'): string =>
  luminance(background) > 0.179 ? dark : light;
