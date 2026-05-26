/**
 * Minimal scale implementations — no d3 dependency.
 * Each scale maps a domain value to a range pixel value.
 */

/* ─── Linear scale ─────────────────────────────────────────────────── */

/**
 * Maps a continuous numeric domain to a continuous numeric range.
 */
export function linearScale(
  domain: [number, number],
  range: [number, number],
): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const domainSpan = d1 - d0;
  const rangeSpan = r1 - r0;

  if (domainSpan === 0) {
    return () => (r0 + r1) / 2;
  }

  return (value: number): number => r0 + ((value - d0) / domainSpan) * rangeSpan;
}

/* ─── Log scale ─────────────────────────────────────────────────────── */

/**
 * Logarithmic (base-10) scale. Domain must be > 0.
 */
export function logScale(
  domain: [number, number],
  range: [number, number],
): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const logD0 = Math.log10(Math.max(d0, 1e-10));
  const logD1 = Math.log10(Math.max(d1, 1e-10));
  const domainSpan = logD1 - logD0;
  const rangeSpan = r1 - r0;

  if (domainSpan === 0) {
    return () => (r0 + r1) / 2;
  }

  return (value: number): number => {
    const logVal = Math.log10(Math.max(value, 1e-10));
    return r0 + ((logVal - logD0) / domainSpan) * rangeSpan;
  };
}

/* ─── Band scale ────────────────────────────────────────────────────── */

export interface BandScale {
  /** Maps a domain value to the start pixel of its band */
  scale: (value: string) => number;
  /** The width of each band (after inner padding) */
  bandwidth: number;
  /** The step size from one band start to the next */
  step: number;
}

/**
 * Divides a range evenly among discrete domain values with optional padding.
 *
 * @param domain     Ordered list of category strings
 * @param range      [start, end] pixel range
 * @param paddingInner  Gap between bands as a fraction of step (0–1)
 * @param paddingOuter  Gap at range edges as a fraction of step (0–1)
 */
export function bandScale(
  domain: string[],
  range: [number, number],
  paddingInner = 0.1,
  paddingOuter = 0.05,
): BandScale {
  const n = domain.length;
  if (n === 0) {
    return { scale: () => 0, bandwidth: 0, step: 0 };
  }

  const [r0, r1] = range;
  const rangeLen = r1 - r0;

  // step = rangeLen / (n + paddingOuter * 2 + paddingInner * (n - 1))
  const step = rangeLen / (n + paddingOuter * 2 + paddingInner * (n - 1));
  const bandwidth = step * (1 - paddingInner);
  const start = r0 + step * paddingOuter;

  const indexMap = new Map<string, number>();
  domain.forEach((d, i) => indexMap.set(d, i));

  const scale = (value: string): number => {
    const i = indexMap.get(value);
    if (i === undefined) return 0;
    return start + i * (step + step * paddingInner);
  };

  return { scale, bandwidth, step };
}

/* ─── Ordinal scale ─────────────────────────────────────────────────── */

/**
 * Maps domain strings to range values (usually colors) by cycling.
 */
export function ordinalScale(domain: string[], range: string[]): (value: string) => string {
  const indexMap = new Map<string, number>();
  domain.forEach((d, i) => indexMap.set(d, i));

  return (value: string): string => {
    const i = indexMap.get(value) ?? 0;
    return range[i % range.length] ?? range[0] ?? '';
  };
}

/* ─── Tick generation ───────────────────────────────────────────────── */

/**
 * Generate "nice" linear tick values spanning [min, max].
 * Returns approximately `count` ticks on round numbers.
 */
export function niceLinearTicks(
  min: number,
  max: number,
  count = 5,
): number[] {
  if (min === max) {
    return [min];
  }

  const rawStep = (max - min) / (count - 1);

  // Round step to a "nice" value
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalised = rawStep / magnitude;

  let niceStep: number;
  if (normalised <= 1) niceStep = magnitude;
  else if (normalised <= 2) niceStep = 2 * magnitude;
  else if (normalised <= 5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;

  const ticks: number[] = [];
  let tick = niceMin;
  while (tick <= niceMax + niceStep * 0.001) {
    ticks.push(parseFloat(tick.toPrecision(12)));
    tick += niceStep;
  }

  return ticks;
}

/**
 * Round a domain extent to nice bounds for display.
 */
export function niceDomain(min: number, max: number, count = 5): [number, number] {
  const ticks = niceLinearTicks(min, max, count);
  return [ticks[0] ?? min, ticks[ticks.length - 1] ?? max];
}

/* ─── Extent helpers ────────────────────────────────────────────────── */

/**
 * Returns [min, max] of a numeric array.
 */
export function extent(values: number[]): [number, number] {
  if (values.length === 0) return [0, 1];
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return [min, max];
}

/**
 * Computes y-domain from a data array using multiple data keys.
 * If any series has a stackId, domains are summed per index.
 */
export function computeYDomain(
  data: Record<string, unknown>[],
  dataKeys: string[],
  stackIds: (string | undefined)[],
  includeZero = true,
): [number, number] {
  if (data.length === 0 || dataKeys.length === 0) return [0, 100];

  // Group keys by stackId
  const stackGroups = new Map<string, string[]>();
  const unstacked: string[] = [];

  dataKeys.forEach((key, i) => {
    const sid = stackIds[i];
    if (sid !== undefined) {
      const group = stackGroups.get(sid) ?? [];
      group.push(key);
      stackGroups.set(sid, group);
    } else {
      unstacked.push(key);
    }
  });

  const allValues: number[] = [];

  // For unstacked series: just collect values
  for (const key of unstacked) {
    for (const row of data) {
      const v = row[key];
      if (typeof v === 'number' && isFinite(v)) {
        allValues.push(v);
      }
    }
  }

  // For stacked groups: sum per row
  stackGroups.forEach((keys) => {
    for (const row of data) {
      let sum = 0;
      for (const key of keys) {
        const v = row[key];
        if (typeof v === 'number' && isFinite(v)) sum += v;
      }
      allValues.push(sum);
    }
  });

  if (allValues.length === 0) return [0, 100];

  let [min, max] = extent(allValues);
  if (includeZero) {
    min = Math.min(0, min);
    max = Math.max(0, max);
  }

  // Ensure domain has some height
  if (min === max) {
    min = min - 1;
    max = max + 1;
  }

  return niceDomain(min, max);
}
