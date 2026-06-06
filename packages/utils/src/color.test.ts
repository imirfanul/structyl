import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  parseColor,
  withAlpha,
  luminance,
  getContrastColor,
} from './color';

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#ff8800')).toEqual({ r: 255, g: 136, b: 0 });
  });
  it('parses 3-digit shorthand', () => {
    expect(hexToRgb('#f80')).toEqual({ r: 255, g: 136, b: 0 });
  });
  it('parses without leading #', () => {
    expect(hexToRgb('00ff00')).toEqual({ r: 0, g: 255, b: 0 });
  });
  it('parses 8-digit hex (alpha ignored for rgb)', () => {
    expect(hexToRgb('#ff8800cc')).toEqual({ r: 255, g: 136, b: 0 });
  });
  it('returns null for malformed input', () => {
    expect(hexToRgb('#zzz')).toBeNull();
    expect(hexToRgb('#ff888')).toBeNull(); // 5 chars: not a valid length
    expect(hexToRgb('#gg8800')).toBeNull(); // non-hex chars
  });
});

describe('rgbToHex', () => {
  it('round-trips with hexToRgb', () => {
    expect(rgbToHex({ r: 255, g: 136, b: 0 })).toBe('#ff8800');
  });
  it('pads single digits and clamps out-of-range', () => {
    expect(rgbToHex({ r: 1, g: 0, b: 300 })).toBe('#0100ff');
  });
});

describe('rgb ↔ hsl', () => {
  it('converts pure red to hsl', () => {
    expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
  });
  it('converts grayscale (no saturation)', () => {
    expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toMatchObject({ s: 0 });
  });
  it('hslToRgb inverts rgbToHsl approximately', () => {
    const original = { r: 64, g: 128, b: 192 };
    const back = hslToRgb(rgbToHsl(original));
    expect(Math.abs(back.r - original.r)).toBeLessThanOrEqual(2);
    expect(Math.abs(back.g - original.g)).toBeLessThanOrEqual(2);
    expect(Math.abs(back.b - original.b)).toBeLessThanOrEqual(2);
  });
});

describe('parseColor', () => {
  it('parses hex', () => {
    expect(parseColor('#000')).toEqual({ r: 0, g: 0, b: 0 });
  });
  it('parses rgb() and rgba()', () => {
    expect(parseColor('rgb(255, 136, 0)')).toEqual({ r: 255, g: 136, b: 0 });
    expect(parseColor('rgba(255 136 0 / 0.5)')).toEqual({ r: 255, g: 136, b: 0 });
  });
  it('parses hsl()', () => {
    expect(parseColor('hsl(0, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('returns null for unknown formats', () => {
    expect(parseColor('papayawhip')).toBeNull();
  });
});

describe('withAlpha', () => {
  it('applies alpha as rgba', () => {
    expect(withAlpha('#ff8800', 0.5)).toBe('rgba(255, 136, 0, 0.5)');
  });
  it('clamps alpha to [0,1]', () => {
    expect(withAlpha('#000', 2)).toBe('rgba(0, 0, 0, 1)');
  });
  it('returns input unchanged when unparseable', () => {
    expect(withAlpha('nope', 0.5)).toBe('nope');
  });
});

describe('luminance / getContrastColor', () => {
  it('white is brighter than black', () => {
    expect(luminance('#ffffff')).toBeGreaterThan(luminance('#000000'));
  });
  it('picks dark text on light background', () => {
    expect(getContrastColor('#ffffff')).toBe('#000000');
  });
  it('picks light text on dark background', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
  });
  it('accepts an RGB object', () => {
    expect(getContrastColor({ r: 250, g: 250, b: 250 })).toBe('#000000');
  });
});
