/**
 * Formatting utilities. Pure functions, no dependencies.
 * Complements `number.ts` (formatNumber/Currency/Percent) and `string.ts` (truncate/slugify)
 * — these cover bytes, relative time, lists, and pluralization.
 */

/**
 * Format a byte count as a human-readable string (e.g. `1.5 MB`).
 * Uses binary units (1024) by default; pass `{ binary: false }` for SI (1000).
 */
export const formatBytes = (
  bytes: number,
  options: { decimals?: number; binary?: boolean } = {},
): string => {
  const { decimals = 1, binary = true } = options;
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const base = binary ? 1024 : 1000;
  const units = binary
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
    : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(base)), units.length - 1);
  const value = bytes / base ** i;
  const rounded = i === 0 ? Math.round(value) : Number(value.toFixed(decimals));
  return `${rounded} ${units[i]}`;
};

const RELATIVE_DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: 'second' },
  { amount: 60, unit: 'minute' },
  { amount: 24, unit: 'hour' },
  { amount: 7, unit: 'day' },
  { amount: 4.34524, unit: 'week' },
  { amount: 12, unit: 'month' },
  { amount: Number.POSITIVE_INFINITY, unit: 'year' },
];

/**
 * Format a date relative to now (e.g. `3 hours ago`, `in 2 days`) via `Intl.RelativeTimeFormat`.
 * `from` defaults to the current time.
 */
export const formatRelativeTime = (
  date: Date | number,
  options: { locale?: string; from?: Date | number; style?: Intl.RelativeTimeFormatStyle } = {},
): string => {
  const { locale = 'en-US', from = Date.now(), style = 'long' } = options;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style });
  const target = date instanceof Date ? date.getTime() : date;
  const base = from instanceof Date ? from.getTime() : from;
  let duration = (target - base) / 1000;
  for (const division of RELATIVE_DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return rtf.format(Math.round(duration), 'year');
};

/**
 * Join a list into a grammatical string (e.g. `A, B, and C`) via `Intl.ListFormat`.
 */
export const formatList = (
  items: readonly string[],
  options: { locale?: string; type?: Intl.ListFormatType; style?: Intl.ListFormatStyle } = {},
): string => {
  const { locale = 'en-US', type = 'conjunction', style = 'long' } = options;
  return new Intl.ListFormat(locale, { type, style }).format(items);
};

/**
 * Pick the singular or plural form based on `count`. If `plural` is omitted,
 * appends `s` to the singular. Does not include the count itself.
 */
export const pluralize = (count: number, singular: string, plural?: string): string =>
  Math.abs(count) === 1 ? singular : (plural ?? `${singular}s`);
