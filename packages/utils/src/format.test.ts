import { formatBytes, formatRelativeTime, formatList, pluralize } from './format';

describe('formatBytes', () => {
  it('formats zero and negatives as 0 B', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(-5)).toBe('0 B');
  });
  it('formats bytes without decimals', () => {
    expect(formatBytes(512)).toBe('512 B');
  });
  it('formats binary units by default', () => {
    expect(formatBytes(1024)).toBe('1 KiB');
    expect(formatBytes(1536)).toBe('1.5 KiB');
    expect(formatBytes(1024 * 1024)).toBe('1 MiB');
  });
  it('supports SI units', () => {
    expect(formatBytes(1000, { binary: false })).toBe('1 KB');
  });
  it('respects decimals option', () => {
    expect(formatBytes(1536, { decimals: 2 })).toBe('1.5 KiB');
    expect(formatBytes(1234567, { decimals: 2 })).toBe('1.18 MiB');
  });
});

describe('formatRelativeTime', () => {
  const now = new Date('2026-06-06T12:00:00Z').getTime();
  it('formats seconds ago', () => {
    expect(formatRelativeTime(now - 30_000, { from: now })).toBe('30 seconds ago');
  });
  it('formats hours in the future', () => {
    expect(formatRelativeTime(now + 2 * 3600_000, { from: now })).toBe('in 2 hours');
  });
  it('formats days', () => {
    expect(formatRelativeTime(now - 3 * 86_400_000, { from: now })).toBe('3 days ago');
  });
  it('accepts Date instances', () => {
    expect(formatRelativeTime(new Date(now - 60_000), { from: new Date(now) })).toBe('1 minute ago');
  });
});

describe('formatList', () => {
  it('joins with conjunction by default', () => {
    expect(formatList(['A', 'B', 'C'])).toBe('A, B, and C');
  });
  it('handles a single item', () => {
    expect(formatList(['A'])).toBe('A');
  });
  it('supports disjunction', () => {
    expect(formatList(['A', 'B'], { type: 'disjunction' })).toBe('A or B');
  });
});

describe('pluralize', () => {
  it('returns singular for 1 and -1', () => {
    expect(pluralize(1, 'item')).toBe('item');
    expect(pluralize(-1, 'item')).toBe('item');
  });
  it('defaults plural to +s', () => {
    expect(pluralize(0, 'item')).toBe('items');
    expect(pluralize(2, 'item')).toBe('items');
  });
  it('uses explicit plural when given', () => {
    expect(pluralize(3, 'person', 'people')).toBe('people');
  });
});
