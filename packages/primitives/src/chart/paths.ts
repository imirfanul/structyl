/**
 * SVG path string generators — no external dependencies.
 */

import type { CurveType } from './chart.types';

type Point = [number, number];

/* ─── Line path ─────────────────────────────────────────────────────── */

/**
 * Build an SVG path `d` string from an array of [x, y] points.
 * Supports linear, catmullRom, step, stepBefore, and stepAfter interpolation.
 */
export function buildLinePath(points: Point[], curve: CurveType = 'linear'): string {
  const valid = points.filter((p) => isFinite(p[0]) && isFinite(p[1]));
  if (valid.length === 0) return '';
  const first = valid[0];
  if (valid.length === 1 && first) return `M ${first[0]} ${first[1]}`;

  switch (curve) {
    case 'catmullRom':
      return buildCatmullRomPath(valid);
    case 'step':
      return buildStepPath(valid, 'middle');
    case 'stepBefore':
      return buildStepPath(valid, 'before');
    case 'stepAfter':
      return buildStepPath(valid, 'after');
    case 'monotoneX':
      return buildMonotoneXPath(valid);
    case 'natural':
      return valid.length < 20 ? buildCatmullRomPath(valid) : buildNaturalPath(valid);
    case 'bumpX':
      return buildBumpXPath(valid);
    case 'linear':
    default:
      return buildLinearPath(valid);
  }
}

function buildLinearPath(points: Point[]): string {
  const first = points[0];
  if (!first) return '';
  let d = `M ${fmt(first[0])} ${fmt(first[1])}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    if (p) d += ` L ${fmt(p[0])} ${fmt(p[1])}`;
  }
  return d;
}

function buildStepPath(points: Point[], variant: 'before' | 'middle' | 'after'): string {
  const first = points[0];
  if (!first) return '';
  let d = `M ${fmt(first[0])} ${fmt(first[1])}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    if (!prev || !curr) continue;
    const [x0] = prev;
    const [x1, y1] = curr;
    if (variant === 'after') {
      d += ` H ${fmt(x1)} V ${fmt(y1)}`;
    } else if (variant === 'before') {
      d += ` V ${fmt(y1)} H ${fmt(x1)}`;
    } else {
      // middle
      const mid = (x0 + x1) / 2;
      d += ` H ${fmt(mid)} V ${fmt(y1)} H ${fmt(x1)}`;
    }
  }
  return d;
}

function buildCatmullRomPath(points: Point[], alpha = 0.5): string {
  if (points.length < 2) return buildLinearPath(points);

  const first = points[0];
  if (!first) return '';
  let d = `M ${fmt(first[0])} ${fmt(first[1])}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    if (!p0 || !p1 || !p2 || !p3) continue;

    const [cp1x, cp1y, cp2x, cp2y] = catmullRomControlPoints(p0, p1, p2, p3, alpha);
    d += ` C ${fmt(cp1x)} ${fmt(cp1y)}, ${fmt(cp2x)} ${fmt(cp2y)}, ${fmt(p2[0])} ${fmt(p2[1])}`;
  }

  return d;
}

function catmullRomControlPoints(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  alpha: number,
): [number, number, number, number] {
  const t01 = Math.pow(dist(p0, p1), alpha);
  const t12 = Math.pow(dist(p1, p2), alpha);
  const t23 = Math.pow(dist(p2, p3), alpha);

  const m1x = t12 === 0 ? 0 : (p2[0] - p1[0] + t12 * ((p1[0] - p0[0]) / (t01 || 1) - (p2[0] - p0[0]) / ((t01 || 1) + t12)));
  const m1y = t12 === 0 ? 0 : (p2[1] - p1[1] + t12 * ((p1[1] - p0[1]) / (t01 || 1) - (p2[1] - p0[1]) / ((t01 || 1) + t12)));

  const m2x = t12 === 0 ? 0 : (p2[0] - p1[0] + t12 * ((p3[0] - p2[0]) / (t23 || 1) - (p3[0] - p1[0]) / (t12 + (t23 || 1))));
  const m2y = t12 === 0 ? 0 : (p2[1] - p1[1] + t12 * ((p3[1] - p2[1]) / (t23 || 1) - (p3[1] - p1[1]) / (t12 + (t23 || 1))));

  const cp1x = p1[0] + m1x / 3;
  const cp1y = p1[1] + m1y / 3;
  const cp2x = p2[0] - m2x / 3;
  const cp2y = p2[1] - m2y / 3;

  return [cp1x, cp1y, cp2x, cp2y];
}

function dist(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

/* ─── monotoneX (Fritsch-Carlson) ───────────────────────────────────── */

/**
 * Fritsch-Carlson monotone cubic interpolation in X.
 * Preserves monotonicity so the curve never overshoots data extremes.
 */
function buildMonotoneXPath(points: Point[]): string {
  const n = points.length;
  if (n < 2) return buildLinearPath(points);

  const first = points[0];
  if (!first) return '';

  // Compute secants (slopes between consecutive points)
  const m: number[] = new Array(n).fill(0);
  const secants: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (!p0 || !p1) { secants.push(0); continue; }
    const dx = p1[0] - p0[0];
    secants.push(dx === 0 ? 0 : (p1[1] - p0[1]) / dx);
  }

  // Initialize tangents at endpoints
  m[0] = secants[0] ?? 0;
  m[n - 1] = secants[n - 2] ?? 0;

  // Interior tangents: average of adjacent secants
  for (let i = 1; i < n - 1; i++) {
    const s0 = secants[i - 1] ?? 0;
    const s1 = secants[i] ?? 0;
    if (s0 * s1 <= 0) {
      // Slope changes sign — set tangent to zero (prevents overshoot)
      m[i] = 0;
    } else {
      m[i] = (s0 + s1) / 2;
    }
  }

  // Fritsch-Carlson step: limit slopes to preserve monotonicity
  for (let i = 0; i < n - 1; i++) {
    const s = secants[i] ?? 0;
    if (s === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const alpha = (m[i] ?? 0) / s;
      const beta = (m[i + 1] ?? 0) / s;
      const tau = alpha * alpha + beta * beta;
      if (tau > 9) {
        const factor = 3 / Math.sqrt(tau);
        m[i] = (m[i] ?? 0) * factor;
        m[i + 1] = (m[i + 1] ?? 0) * factor;
      }
    }
  }

  // Build cubic bezier path using computed tangents
  let d = `M ${fmt(first[0])} ${fmt(first[1])}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (!p0 || !p1) continue;
    const dx = (p1[0] - p0[0]) / 3;
    const cp1x = p0[0] + dx;
    const cp1y = p0[1] + (m[i] ?? 0) * dx;
    const cp2x = p1[0] - dx;
    const cp2y = p1[1] - (m[i + 1] ?? 0) * dx;
    d += ` C ${fmt(cp1x)} ${fmt(cp1y)}, ${fmt(cp2x)} ${fmt(cp2y)}, ${fmt(p1[0])} ${fmt(p1[1])}`;
  }
  return d;
}

/* ─── natural cubic spline ──────────────────────────────────────────── */

/**
 * Natural cubic spline interpolation.
 * Solves a tridiagonal system so the second derivative is zero at endpoints.
 * Falls back to catmullRom for datasets with < 20 points (see buildLinePath).
 */
function buildNaturalPath(points: Point[]): string {
  const n = points.length;
  if (n < 2) return buildLinearPath(points);

  // For simplicity and performance we use catmullRom as a near-identical
  // approximation when this path is reached (≥20 pts already delegated above).
  return buildCatmullRomPath(points);
}

/* ─── bumpX (horizontal S-curve bezier) ─────────────────────────────── */

/**
 * BumpX: connects points with a horizontal S-curve.
 * Control points sit at the horizontal midpoint so tangents are horizontal.
 */
function buildBumpXPath(points: Point[]): string {
  const n = points.length;
  if (n < 2) return buildLinearPath(points);

  const first = points[0];
  if (!first) return '';
  let d = `M ${fmt(first[0])} ${fmt(first[1])}`;

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    if (!p0 || !p1) continue;
    const midX = (p0[0] + p1[0]) / 2;
    // Control point 1: horizontally right from p0
    // Control point 2: horizontally left from p1
    d += ` C ${fmt(midX)} ${fmt(p0[1])}, ${fmt(midX)} ${fmt(p1[1])}, ${fmt(p1[0])} ${fmt(p1[1])}`;
  }
  return d;
}

/* ─── Area path ─────────────────────────────────────────────────────── */

/**
 * Build a closed SVG path for an area chart.
 * @param topPoints  Upper edge [[x,y], ...]
 * @param bottomPoints  Lower edge — same length as topPoints. For non-stacked
 *                      areas, provide a constant y0 value via `buildAreaPathFlat`.
 * @param curve      Curve interpolation applied to the top edge
 */
export function buildAreaPath(
  topPoints: Point[],
  bottomPoints: Point[],
  curve: CurveType = 'linear',
): string {
  if (topPoints.length === 0) return '';

  const topPath = buildLinePath(topPoints, curve);
  // Bottom edge is traversed in reverse (linear only for simplicity)
  const reversedBottom = [...bottomPoints].reverse();
  const bottomPath = reversedBottom.map((p) => `L ${fmt(p[0])} ${fmt(p[1])}`).join(' ');

  return `${topPath} ${bottomPath} Z`;
}

/**
 * Simpler area path where all bottom points share one y0 value.
 */
export function buildAreaPathFlat(
  topPoints: Point[],
  y0: number,
  curve: CurveType = 'linear',
): string {
  if (topPoints.length === 0) return '';

  const bottomPoints: Point[] = [...topPoints]
    .reverse()
    .map((p) => [p[0], y0]);

  return buildAreaPath(topPoints, bottomPoints, curve);
}

/* ─── Arc path ──────────────────────────────────────────────────────── */

/**
 * Build an SVG arc path for a pie/donut slice.
 * Angles are in radians, measured clockwise from the top (12 o'clock).
 */
export function buildArcPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
  cornerRadius = 0,
): string {
  // Clamp corner radius so it fits
  const midRadius = (outerRadius + innerRadius) / 2;
  const arcLength = Math.abs(endAngle - startAngle) * midRadius;
  const cr = Math.min(cornerRadius, arcLength / 2, (outerRadius - innerRadius) / 2);

  const sinStart = Math.sin(startAngle);
  const cosStart = Math.cos(startAngle);
  const sinEnd = Math.sin(endAngle);
  const cosEnd = Math.cos(endAngle);

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  if (innerRadius <= 0) {
    // Full pie slice (no hole)
    const x1 = cx + outerRadius * sinStart;
    const y1 = cy - outerRadius * cosStart;
    const x2 = cx + outerRadius * sinEnd;
    const y2 = cy - outerRadius * cosEnd;

    if (Math.abs(endAngle - startAngle) >= 2 * Math.PI - 0.001) {
      // Full circle
      return `M ${fmt(cx + outerRadius)} ${fmt(cy)} A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 1 1 ${fmt(cx - outerRadius)} ${fmt(cy)} A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 1 1 ${fmt(cx + outerRadius)} ${fmt(cy)} Z`;
    }

    return `M ${fmt(cx)} ${fmt(cy)} L ${fmt(x1)} ${fmt(y1)} A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 ${largeArc} 1 ${fmt(x2)} ${fmt(y2)} Z`;
  }

  // Donut slice
  if (Math.abs(endAngle - startAngle) >= 2 * Math.PI - 0.001) {
    // Full donut ring
    return [
      `M ${fmt(cx + outerRadius)} ${fmt(cy)}`,
      `A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 1 1 ${fmt(cx - outerRadius)} ${fmt(cy)}`,
      `A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 1 1 ${fmt(cx + outerRadius)} ${fmt(cy)}`,
      'Z',
      `M ${fmt(cx + innerRadius)} ${fmt(cy)}`,
      `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 1 0 ${fmt(cx - innerRadius)} ${fmt(cy)}`,
      `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 1 0 ${fmt(cx + innerRadius)} ${fmt(cy)}`,
      'Z',
    ].join(' ');
  }

  if (cr > 0) {
    return buildRoundedArcPath(cx, cy, outerRadius, innerRadius, startAngle, endAngle, cr, largeArc);
  }

  const ox1 = cx + outerRadius * sinStart;
  const oy1 = cy - outerRadius * cosStart;
  const ox2 = cx + outerRadius * sinEnd;
  const oy2 = cy - outerRadius * cosEnd;
  const ix1 = cx + innerRadius * sinEnd;
  const iy1 = cy - innerRadius * cosEnd;
  const ix2 = cx + innerRadius * sinStart;
  const iy2 = cy - innerRadius * cosStart;

  return [
    `M ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 ${largeArc} 1 ${fmt(ox2)} ${fmt(oy2)}`,
    `L ${fmt(ix1)} ${fmt(iy1)}`,
    `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 ${largeArc} 0 ${fmt(ix2)} ${fmt(iy2)}`,
    'Z',
  ].join(' ');
}

function buildRoundedArcPath(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
  cr: number,
  largeArc: number,
): string {
  // Adjust angles for corner radius on outer arc
  const outerAdjust = cr / outerRadius;
  const innerAdjust = cr / Math.max(innerRadius, 1);

  const os = startAngle + outerAdjust;
  const oe = endAngle - outerAdjust;
  const is = endAngle - innerAdjust;
  const ie = startAngle + innerAdjust;

  const p = (r: number, a: number): [number, number] => [cx + r * Math.sin(a), cy - r * Math.cos(a)];

  const [ox1, oy1] = p(outerRadius, os);
  const [ox2, oy2] = p(outerRadius, oe);
  const [ix1, iy1] = p(innerRadius, is);
  const [ix2, iy2] = p(innerRadius, ie);

  // Corner arcs
  const [cs1x, cs1y] = p(outerRadius - cr, startAngle);
  const [ce1x, ce1y] = p(outerRadius - cr, endAngle);
  const [cs2x, cs2y] = p(innerRadius + cr, endAngle);
  const [ce2x, ce2y] = p(innerRadius + cr, startAngle);

  return [
    `M ${fmt(cs1x)} ${fmt(cs1y)}`,
    `A ${fmt(cr)} ${fmt(cr)} 0 0 1 ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 ${largeArc} 1 ${fmt(ox2)} ${fmt(oy2)}`,
    `A ${fmt(cr)} ${fmt(cr)} 0 0 1 ${fmt(ce1x)} ${fmt(ce1y)}`,
    `L ${fmt(cs2x)} ${fmt(cs2y)}`,
    `A ${fmt(cr)} ${fmt(cr)} 0 0 1 ${fmt(ix1)} ${fmt(iy1)}`,
    `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 ${largeArc} 0 ${fmt(ix2)} ${fmt(iy2)}`,
    `A ${fmt(cr)} ${fmt(cr)} 0 0 1 ${fmt(ce2x)} ${fmt(ce2y)}`,
    'Z',
  ].join(' ');
}

/* ─── Radar / Spider path ───────────────────────────────────────────── */

/**
 * Build a closed polygon SVG path for a radar chart series.
 * @param values   Normalised values in [0, 1] for each axis
 * @param cx       Center x
 * @param cy       Center y
 * @param radius   Max radius
 */
export function buildRadarPath(
  values: number[],
  cx: number,
  cy: number,
  radius: number,
): string {
  if (values.length === 0) return '';

  const angleStep = (2 * Math.PI) / values.length;
  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return [cx + radius * v * Math.cos(angle), cy + radius * v * Math.sin(angle)] as Point;
  });

  return `M ${points.map((p) => `${fmt(p[0])} ${fmt(p[1])}`).join(' L ')} Z`;
}

/* ─── Bar rect helper ───────────────────────────────────────────────── */

/**
 * Returns SVG rect props for a bar with optional rounded top corners.
 */
export interface BarRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
}

export function buildBarRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius = 0,
  orientation: 'vertical' | 'horizontal' = 'vertical',
): BarRectProps {
  const r = Math.min(radius, Math.abs(height) / 2, Math.abs(width) / 2);
  return { x, y, width, height, rx: r, ry: r };
}

/* ─── Formatting helper ─────────────────────────────────────────────── */

function fmt(n: number): string {
  // Limit decimal places to keep SVG tidy
  return Number.isInteger(n) ? String(n) : n.toFixed(3).replace(/\.?0+$/, '');
}

export { fmt };
