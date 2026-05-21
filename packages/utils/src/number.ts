/** Clamp a number between min and max. */
export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/** Round to N decimal places. */
export const roundTo = (value: number, decimals = 0): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/** Linear interpolation between two values. */
export const lerp = (start: number, end: number, t: number): number => start + (end - start) * t;

/** Format a number using Intl. */
export const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale = 'en-US',
): string => new Intl.NumberFormat(locale, options).format(value);

export const formatCurrency = (
  value: number,
  currency = 'USD',
  locale = 'en-US',
): string => formatNumber(value, { style: 'currency', currency }, locale);

export const formatPercent = (
  value: number,
  decimals = 0,
  locale = 'en-US',
): string =>
  formatNumber(
    value,
    { style: 'percent', minimumFractionDigits: decimals, maximumFractionDigits: decimals },
    locale,
  );
