/**
 * Layout algorithms: Squarified Treemap, Funnel layout.
 * No external dependencies.
 */

/* ─── Treemap ───────────────────────────────────────────────────────── */

export interface TreemapLayoutNode {
  name: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  color?: string;
  children?: TreemapLayoutNode[];
}

interface RawNode {
  name: string;
  value?: number;
  children?: RawNode[];
  color?: string;
}

/**
 * Compute a squarified treemap layout.
 * Returns a flat list of leaf nodes with computed x/y/width/height.
 */
export function squarifyTreemap(
  nodes: RawNode[],
  x: number,
  y: number,
  width: number,
  height: number,
  padding = 2,
  depth = 0,
): TreemapLayoutNode[] {
  const prepared = prepareNodes(nodes, padding, depth);
  if (prepared.length === 0) return [];

  const totalValue = prepared.reduce((s, n) => s + n.value, 0);
  const result: TreemapLayoutNode[] = [];

  squarify(prepared, totalValue, x, y, width, height, padding, result);
  return result;
}

interface PreparedNode {
  name: string;
  value: number;
  color?: string;
  children?: RawNode[];
  depth: number;
}

function prepareNodes(nodes: RawNode[], padding: number, depth: number): PreparedNode[] {
  return nodes
    .map((n) => {
      let value = n.value ?? 0;
      if (n.children && n.children.length > 0) {
        value = sumChildren(n.children);
      }
      return { name: n.name, value, color: n.color, children: n.children, depth };
    })
    .filter((n) => n.value > 0)
    .sort((a, b) => b.value - a.value);
}

function sumChildren(nodes: RawNode[]): number {
  return nodes.reduce((s, n) => {
    if (n.children && n.children.length > 0) return s + sumChildren(n.children);
    return s + (n.value ?? 0);
  }, 0);
}

function squarify(
  nodes: PreparedNode[],
  totalValue: number,
  x: number,
  y: number,
  width: number,
  height: number,
  padding: number,
  result: TreemapLayoutNode[],
): void {
  if (nodes.length === 0 || width <= 0 || height <= 0) return;
  if (nodes.length === 1) {
    const only = nodes[0];
    if (only) placeNode(only, x, y, width, height, padding, result);
    return;
  }

  let remaining = [...nodes];
  let rx = x;
  let ry = y;
  let rw = width;
  let rh = height;
  let remainingValue = totalValue;

  while (remaining.length > 0) {
    const isWide = rw >= rh;
    const stripe = isWide ? rh : rw;

    // Find optimal row/column via worst-aspect-ratio minimization
    let row: PreparedNode[] = [];
    let rowValue = 0;
    let bestWorst = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining.slice(0, i + 1);
      const candValue = candidate.reduce((s, n) => s + n.value, 0);
      const worst = worstAspectRatio(candidate, candValue, remainingValue, stripe, rw * rh);

      if (worst <= bestWorst) {
        bestWorst = worst;
        row = candidate;
        rowValue = candValue;
      } else {
        break; // Aspect ratio is worsening — stop
      }
    }

    // Place the row
    const rowFraction = rowValue / remainingValue;
    const rowSize = isWide ? rw * rowFraction : rh * rowFraction;
    let offset = isWide ? ry : rx;

    for (const node of row) {
      const nodeFraction = node.value / rowValue;
      const nodeSize = stripe * nodeFraction;
      if (isWide) {
        placeNode(node, rx, offset, rowSize, nodeSize, padding, result);
        offset += nodeSize;
      } else {
        placeNode(node, offset, ry, nodeSize, rowSize, padding, result);
        offset += nodeSize;
      }
    }

    // Shrink remaining rectangle
    if (isWide) {
      rx += rowSize;
      rw -= rowSize;
    } else {
      ry += rowSize;
      rh -= rowSize;
    }

    remainingValue -= rowValue;
    remaining = remaining.slice(row.length);
  }
}

function worstAspectRatio(
  row: PreparedNode[],
  rowValue: number,
  totalValue: number,
  stripe: number,
  area: number,
): number {
  if (row.length === 0 || rowValue === 0 || totalValue === 0) return Infinity;

  const rowArea = (rowValue / totalValue) * area;
  const rowWidth = rowArea / stripe;

  let worst = 0;
  for (const node of row) {
    const nodeArea = (node.value / rowValue) * rowArea;
    const nodeHeight = nodeArea / rowWidth;
    const aspect = Math.max(rowWidth / nodeHeight, nodeHeight / rowWidth);
    if (aspect > worst) worst = aspect;
  }
  return worst;
}

function placeNode(
  node: PreparedNode,
  x: number,
  y: number,
  width: number,
  height: number,
  padding: number,
  result: TreemapLayoutNode[],
): void {
  const px = x + padding;
  const py = y + padding;
  const pw = Math.max(0, width - padding * 2);
  const ph = Math.max(0, height - padding * 2);

  if (node.children && node.children.length > 0) {
    // Recurse into children
    const children = squarifyTreemap(node.children, px, py, pw, ph, padding, node.depth + 1);
    result.push({
      name: node.name,
      value: node.value,
      x: px,
      y: py,
      width: pw,
      height: ph,
      depth: node.depth,
      color: node.color,
      children,
    });
  } else {
    result.push({
      name: node.name,
      value: node.value,
      x: px,
      y: py,
      width: pw,
      height: ph,
      depth: node.depth,
      color: node.color,
    });
  }
}

/* ─── Funnel layout ─────────────────────────────────────────────────── */

export interface FunnelLayoutSegment {
  name: string;
  value: number;
  color?: string;
  /** Trapezoid top-left x */
  x1: number;
  /** Trapezoid top-right x */
  x2: number;
  /** Trapezoid bottom-left x */
  x3: number;
  /** Trapezoid bottom-right x */
  x4: number;
  /** Top y */
  y1: number;
  /** Bottom y */
  y2: number;
  /** SVG path string */
  path: string;
  /** Percentage of first item */
  percentage: number;
}

/**
 * Compute funnel trapezoid positions.
 * Each segment is a trapezoid that narrows from top to bottom proportionally.
 */
export function computeFunnelLayout(
  data: Array<{ name: string; value: number; color?: string }>,
  x: number,
  y: number,
  width: number,
  height: number,
  gap = 4,
): FunnelLayoutSegment[] {
  if (data.length === 0) return [];

  const maxValue = Math.max(...data.map((d) => d.value));
  if (maxValue === 0) return [];

  const segmentHeight = (height - gap * (data.length - 1)) / data.length;
  const cx = x + width / 2;

  return data.map((item, i) => {
    const ratio = item.value / maxValue;
    const nextItem = i < data.length - 1 ? data[i + 1] : undefined;
    const nextRatio = nextItem ? nextItem.value / maxValue : ratio;

    const topHalfWidth = (width / 2) * ratio;
    const bottomHalfWidth = (width / 2) * nextRatio;

    const segY1 = y + i * (segmentHeight + gap);
    const segY2 = segY1 + segmentHeight;

    const x1 = cx - topHalfWidth;
    const x2 = cx + topHalfWidth;
    const x3 = cx + bottomHalfWidth;
    const x4 = cx - bottomHalfWidth;

    const path = [
      `M ${fmt(x1)} ${fmt(segY1)}`,
      `L ${fmt(x2)} ${fmt(segY1)}`,
      `L ${fmt(x3)} ${fmt(segY2)}`,
      `L ${fmt(x4)} ${fmt(segY2)}`,
      'Z',
    ].join(' ');

    return {
      name: item.name,
      value: item.value,
      color: item.color,
      x1,
      x2,
      x3,
      x4,
      y1: segY1,
      y2: segY2,
      path,
      percentage: (item.value / maxValue) * 100,
    };
  });
}

/* ─── Gauge arc ─────────────────────────────────────────────────────── */

export interface GaugeArcData {
  /** Background (track) arc path */
  trackPath: string;
  /** Filled arc path */
  fillPath: string;
  /** Center x */
  cx: number;
  /** Center y */
  cy: number;
  /** Outer radius */
  outerRadius: number;
  /** Inner radius */
  innerRadius: number;
  /** Normalised value [0, 1] */
  fraction: number;
}

/**
 * Compute paths for an arc-style gauge.
 * Angles use SVG convention: measured clockwise from top (12 o'clock).
 *
 * @param value         Current value
 * @param min           Minimum value
 * @param max           Maximum value
 * @param startDeg      Start angle in degrees (clockwise from top)
 * @param endDeg        End angle in degrees
 * @param outerRadius   Outer edge radius
 * @param thickness     Arc thickness (pixels)
 */
export function computeGaugeArcs(
  value: number,
  min: number,
  max: number,
  startDeg: number,
  endDeg: number,
  outerRadius: number,
  thickness: number,
): GaugeArcData {
  const fraction = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const innerRadius = outerRadius - thickness;
  const cx = outerRadius;
  const cy = outerRadius;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const startRad = toRad(startDeg);
  const endRad = toRad(endDeg);
  const fillEndRad = startRad + (endRad - startRad) * fraction;

  const trackPath = buildGaugeArcPath(cx, cy, outerRadius, innerRadius, startRad, endRad);
  const fillPath =
    fraction > 0
      ? buildGaugeArcPath(cx, cy, outerRadius, innerRadius, startRad, fillEndRad)
      : '';

  return { trackPath, fillPath, cx, cy, outerRadius, innerRadius, fraction };
}

function buildGaugeArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number,
): string {
  // SVG arc angles: 0 = right (3 o'clock). We use clockwise from top.
  // Convert "clockwise from top" to standard SVG angles.
  const toSvgAngle = (rad: number) => rad - Math.PI / 2;

  const s = toSvgAngle(startRad);
  const e = toSvgAngle(endRad);

  const sweep = Math.abs(endRad - startRad);
  const largeArc = sweep > Math.PI ? 1 : 0;

  const ox1 = cx + outerR * Math.cos(s);
  const oy1 = cy + outerR * Math.sin(s);
  const ox2 = cx + outerR * Math.cos(e);
  const oy2 = cy + outerR * Math.sin(e);
  const ix1 = cx + innerR * Math.cos(e);
  const iy1 = cy + innerR * Math.sin(e);
  const ix2 = cx + innerR * Math.cos(s);
  const iy2 = cy + innerR * Math.sin(s);

  return [
    `M ${fmt(ox1)} ${fmt(oy1)}`,
    `A ${fmt(outerR)} ${fmt(outerR)} 0 ${largeArc} 1 ${fmt(ox2)} ${fmt(oy2)}`,
    `L ${fmt(ix1)} ${fmt(iy1)}`,
    `A ${fmt(innerR)} ${fmt(innerR)} 0 ${largeArc} 0 ${fmt(ix2)} ${fmt(iy2)}`,
    'Z',
  ].join(' ');
}

/* ─── Candlestick layout ────────────────────────────────────────────── */

export interface CandlestickBar {
  x: number;
  candleWidth: number;
  openY: number;
  closeY: number;
  highY: number;
  lowY: number;
  bullish: boolean;
}

/**
 * Compute candlestick bar positions from OHLC data.
 */
export function computeCandlestickBars(
  data: Array<{ open: number; high: number; low: number; close: number }>,
  xScale: (index: number) => number,
  yScale: (value: number) => number,
  bandWidth: number,
): CandlestickBar[] {
  return data.map((d, i) => ({
    x: xScale(i),
    candleWidth: bandWidth * 0.8,
    openY: yScale(d.open),
    closeY: yScale(d.close),
    highY: yScale(d.high),
    lowY: yScale(d.low),
    bullish: d.close >= d.open,
  }));
}

/* ─── Heatmap layout ────────────────────────────────────────────────── */

export interface HeatmapCell {
  xValue: string;
  yValue: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  normalised: number;
}

/**
 * Compute heatmap cell positions.
 */
export function computeHeatmapCells(
  data: Record<string, unknown>[],
  xKey: string,
  yKey: string,
  valueKey: string,
  xScale: (v: string) => number,
  yScale: (v: string) => number,
  cellWidth: number,
  cellHeight: number,
): HeatmapCell[] {
  const values = data.map((d) => {
    const v = d[valueKey];
    return typeof v === 'number' ? v : 0;
  });
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  return data.map((d) => {
    const xVal = String(d[xKey] ?? '');
    const yVal = String(d[yKey] ?? '');
    const value = typeof d[valueKey] === 'number' ? (d[valueKey] as number) : 0;

    return {
      xValue: xVal,
      yValue: yVal,
      value,
      x: xScale(xVal),
      y: yScale(yVal),
      width: cellWidth,
      height: cellHeight,
      normalised: (value - minVal) / range,
    };
  });
}

/* ─── Internal helper ───────────────────────────────────────────────── */

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(3).replace(/\.?0+$/, '');
}
