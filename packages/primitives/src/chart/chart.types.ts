import type * as React from 'react';

/* ─── Shared primitives ─────────────────────────────────────────────── */

export type CurveType =
  | 'linear'
  | 'catmullRom'
  | 'step'
  | 'stepBefore'
  | 'stepAfter'
  | 'monotoneX'
  | 'natural'
  | 'bumpX';
export type AxisScale = 'linear' | 'log' | 'band';
export type LegendPosition = 'top' | 'bottom' | 'left' | 'right';
export type LabelPosition = 'top' | 'center' | 'inside' | 'outside';

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: ChartMargin;
  innerWidth: number;
  innerHeight: number;
}

export interface TooltipPayloadEntry {
  name: string;
  value: number | string;
  color: string;
  dataKey: string;
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  payload: TooltipPayloadEntry[];
  label: string;
}

/* ─── Highlight scope ───────────────────────────────────────────────── */

export interface HighlightScope {
  /** Which items to highlight on hover */
  highlight?: 'none' | 'item' | 'series';
  /** Which items to fade on hover */
  fade?: 'none' | 'series' | 'global';
}

/* ─── Root props ────────────────────────────────────────────────────── */

export interface ChartRootProps {
  /** Data array for the chart */
  data: object[];
  /** Total width of the SVG (omit for responsive) */
  width?: number;
  /** Total height of the SVG */
  height?: number;
  /** Outer margins around the plot area */
  margin?: Partial<ChartMargin>;
  /** CSS class on the wrapper div */
  className?: string;
  /** Accessible label for screen readers */
  accessibilityLabel?: string;
  /** Enable colorblind-accessible pattern fills */
  accessibilityMode?: boolean;
  // TODO(stacking): stackOffset ('none'|'expand'|'diverging') and stackOrder
  // ('none'|'reverse'|'ascending'|'descending') are planned but not yet implemented.
  // Do not add them to the public API until computeYDomain and the Bar/Area renderers
  // actually consume them; exposing props that silently do nothing misleads consumers.
  children?: React.ReactNode;
}

export interface ChartPieRootProps {
  data: object[];
  width?: number;
  height?: number;
  className?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

export interface ChartRadarRootProps {
  data: object[];
  width?: number;
  height?: number;
  className?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

/* ─── Axis props ────────────────────────────────────────────────────── */

export interface ChartXAxisProps {
  /** Key in data objects for x values */
  dataKey?: string;
  /** Axis label */
  label?: string;
  /** Tick count hint */
  tickCount?: number;
  /** Custom tick formatter */
  tickFormatter?: (value: unknown) => string;
  /** Hide the axis line */
  hideLine?: boolean;
  /** Hide ticks */
  hideTicks?: boolean;
  /** Scale type */
  scale?: AxisScale;
  /** CSS class */
  className?: string;
}

export interface ChartYAxisProps {
  /** Axis label */
  label?: string;
  /** Tick count hint */
  tickCount?: number;
  /** Custom tick formatter */
  tickFormatter?: (value: unknown) => string;
  /** Override domain [min, max] */
  domain?: [number | 'auto', number | 'auto'];
  /** Hide the axis line */
  hideLine?: boolean;
  /** Hide ticks */
  hideTicks?: boolean;
  /** CSS class */
  className?: string;
}

/* ─── Grid props ────────────────────────────────────────────────────── */

export interface ChartGridProps {
  /** Show horizontal lines */
  horizontal?: boolean;
  /** Show vertical lines */
  vertical?: boolean;
  /** Stroke color/class override */
  strokeDasharray?: string;
  className?: string;
}

/* ─── Bar props ─────────────────────────────────────────────────────── */

export interface ChartBarProps {
  /** Key in data for bar values */
  dataKey: string;
  /** Bar fill color (falls back to palette) */
  color?: string;
  /** Label for legend/tooltip */
  name?: string;
  /** Stack group id — bars with same id are stacked */
  stackId?: string;
  /** 'vertical' (default) or 'horizontal' */
  orientation?: 'vertical' | 'horizontal';
  /** Corner radius */
  radius?: number;
  /** Show a label on each bar */
  showLabel?: boolean;
  /** Where to place the label relative to the bar */
  labelPosition?: 'inside' | 'outside' | 'center';
  /** Custom label text formatter */
  labelFormatter?: (value: number) => string;
  /** Highlight scope for hover interactions */
  highlightScope?: HighlightScope;
  /** Click handler per bar rect */
  onClick?: (entry: Record<string, unknown>, index: number) => void;
  className?: string;
}

/* ─── Line props ────────────────────────────────────────────────────── */

export type MarkShape = 'circle' | 'square' | 'diamond' | 'cross' | 'star' | 'triangle';

export interface ChartLineProps {
  dataKey: string;
  color?: string;
  name?: string;
  curve?: CurveType;
  /** Show dots at data points (alias: showDot) */
  dot?: boolean;
  /** Alias for dot — use either */
  showDot?: boolean;
  /** Dot radius */
  dotRadius?: number;
  /** Shape of the mark at each data point */
  markShape?: MarkShape;
  /** Connect null/undefined data points by skipping them */
  connectNulls?: boolean;
  strokeWidth?: number;
  strokeDasharray?: string;
  /** Highlight scope for hover interactions */
  highlightScope?: HighlightScope;
  onClick?: (entry: Record<string, unknown>, index: number) => void;
  className?: string;
}

/* ─── Area props ────────────────────────────────────────────────────── */

export interface ChartAreaProps {
  dataKey: string;
  color?: string;
  name?: string;
  curve?: CurveType;
  /** Fill opacity */
  fillOpacity?: number;
  /** Stack group id */
  stackId?: string;
  strokeWidth?: number;
  /**
   * Baseline y value for the area fill.
   * - number: use yScale(baseline) as the bottom edge
   * - 'auto': use the chart bottom (innerHeight) — same as default
   */
  baseline?: number | 'auto';
  /** Connect null/undefined data points by skipping them */
  connectNulls?: boolean;
  /** Highlight scope for hover interactions */
  highlightScope?: HighlightScope;
  /**
   * If true, use a gradient fill: above-zero uses chart-1 color,
   * below-zero uses chart-3 color.
   */
  fillByValue?: boolean;
  className?: string;
}

/* ─── Scatter / Bubble props ────────────────────────────────────────── */

export type ScatterMarkerShape = 'circle' | 'square' | 'diamond' | 'cross' | 'triangle';

export interface ChartScatterProps {
  xKey: string;
  yKey: string;
  name?: string;
  color?: string;
  /** Point radius */
  radius?: number;
  /** Shape rendered at each point */
  markerShape?: ScatterMarkerShape;
  /** Highlight scope for hover interactions */
  highlightScope?: HighlightScope;
  onClick?: (entry: Record<string, unknown>, index: number) => void;
  className?: string;
}

export interface ChartBubbleProps extends ChartScatterProps {
  /** Data key for bubble size */
  sizeKey: string;
  /** Min rendered bubble radius */
  minRadius?: number;
  /** Max rendered bubble radius */
  maxRadius?: number;
}

/* ─── Pie props ─────────────────────────────────────────────────────── */

export interface ChartPieProps {
  dataKey: string;
  nameKey?: string;
  /** Inner radius for donut (0 = pie) */
  innerRadius?: number;
  /** Outer radius (default: min(w,h)/2 * 0.8) */
  outerRadius?: number;
  /** Gap between slices in degrees */
  padAngle?: number;
  /** Corner radius on slices */
  cornerRadius?: number;
  /** Colors array override */
  colors?: string[];
  /**
   * Start angle of the arc distribution in degrees.
   * Default: -90 (top / 12 o'clock).
   */
  startAngle?: number;
  /**
   * End angle of the arc distribution in degrees.
   * Default: 270 (full circle clockwise).
   */
  endAngle?: number;
  /**
   * Label rendered at the midpoint of each arc.
   * - 'value': raw numeric value
   * - 'percentage': percentage of total rounded to nearest integer
   * - function: custom label — receives { name, value, total }
   */
  arcLabel?: 'value' | 'percentage' | ((entry: { name: string; value: number; total: number }) => string);
  /**
   * Minimum arc angle (degrees) required before a label is rendered.
   * Prevents label clutter on very small slices. Default: 5.
   */
  arcLabelMinAngle?: number;
  onClick?: (entry: Record<string, unknown>, index: number) => void;
  className?: string;
}

/* ─── Radar props ───────────────────────────────────────────────────── */

export interface ChartPolarGridProps {
  /** Number of rings */
  rings?: number;
  /**
   * Ring shape:
   * - 'sharp' (default): polygon connecting spoke endpoints
   * - 'circular': concentric circles
   */
  shape?: 'circular' | 'sharp';
  className?: string;
}

export interface ChartPolarAngleAxisProps {
  dataKey: string;
  className?: string;
}

export interface ChartRadarProps {
  dataKey: string;
  color?: string;
  name?: string;
  fillOpacity?: number;
  /** Fill the radar polygon area with semi-transparent color */
  fillArea?: boolean;
  /** Show dot marks at each data point (alias: dot) */
  showMark?: boolean;
  /** Alias for showMark — use either */
  dot?: boolean;
  className?: string;
}

/* ─── Heatmap props ─────────────────────────────────────────────────── */

export interface ChartHeatmapProps {
  data: object[];
  xKey: string;
  yKey: string;
  valueKey: string;
  /** Colors from low→high */
  colorRange?: [string, string];
  /** Width of the SVG */
  width?: number;
  /** Height of the SVG */
  height?: number;
  margin?: Partial<ChartMargin>;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Treemap props ─────────────────────────────────────────────────── */

export interface TreemapNode {
  name: string;
  value?: number;
  children?: TreemapNode[];
  color?: string;
}

export interface ChartTreemapProps {
  data: TreemapNode[];
  width?: number;
  height?: number;
  padding?: number;
  /** Color palette override */
  colors?: string[];
  className?: string;
  accessibilityLabel?: string;
  onNodeClick?: (node: TreemapNode) => void;
}

/* ─── Funnel props ──────────────────────────────────────────────────── */

export interface FunnelEntry {
  name: string;
  value: number;
  color?: string;
}

export interface ChartFunnelProps {
  data: FunnelEntry[];
  width?: number;
  height?: number;
  /** Label position */
  labelPosition?: LabelPosition;
  /**
   * Visual variant:
   * - 'filled' (default): solid fill
   * - 'outlined': transparent fill with colored stroke
   */
  variant?: 'filled' | 'outlined';
  /**
   * Edge interpolation:
   * - 'linear' (default): straight trapezoid edges
   * - 'linear-sharp': alias for 'linear'
   * - 'bump': smooth S-curve bezier on each side
   * - 'step': flat top, vertical drop, flat bottom
   */
  curve?: 'linear' | 'linear-sharp' | 'bump' | 'step';
  /** Pixel gap between sections. Default: 0 */
  gap?: number;
  className?: string;
  accessibilityLabel?: string;
  onSegmentClick?: (entry: FunnelEntry, index: number) => void;
}

/* ─── Gauge props ───────────────────────────────────────────────────── */

export interface ChartGaugeProps {
  value: number;
  min?: number;
  max?: number;
  /** Start angle in degrees (from 12 o'clock, clockwise) */
  startAngle?: number;
  /** End angle in degrees */
  endAngle?: number;
  /** Arc thickness as fraction of radius */
  thickness?: number;
  /** Color stops: [[percentage, color], ...] */
  colorStops?: [number, string][];
  /** Show numeric label in center */
  showLabel?: boolean;
  /** Custom label render */
  label?: string | ((value: number, min: number, max: number) => string);
  width?: number;
  height?: number;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Gauge composition props ───────────────────────────────────────── */

/** Shared context provided by GaugeContainer to child arc components */
export interface GaugeContextValue {
  value: number;
  min: number;
  max: number;
  /** Start angle in degrees, clockwise from top */
  startAngle: number;
  /** End angle in degrees, clockwise from top */
  endAngle: number;
  cx: number;
  cy: number;
  outerRadius: number;
  innerRadius: number;
  fraction: number;
}

/**
 * Root wrapper for gauge composition.
 * Provides a shared GaugeContext consumed by GaugeValueArc and GaugeReferenceArc.
 */
export interface ChartGaugeContainerProps {
  value: number;
  min?: number;
  max?: number;
  /** Start angle in degrees (clockwise from top / 12 o'clock). Default: -135 */
  startAngle?: number;
  /** End angle in degrees. Default: 135 */
  endAngle?: number;
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Arc thickness in pixels */
  thickness?: number;
  className?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

/** The colored value arc inside a GaugeContainer */
export interface ChartGaugeValueArcProps {
  /** Fill color — defaults to chart-1 CSS variable */
  color?: string;
  /** Color stops: [[percentage, color], ...] */
  colorStops?: [number, string][];
  className?: string;
}

/** The gray background track arc inside a GaugeContainer */
export interface ChartGaugeReferenceArcProps {
  /** Fill color for the background track */
  color?: string;
  className?: string;
}

/* ─── Candlestick / OHLC props ──────────────────────────────────────── */

export interface OhlcEntry {
  date: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface ChartCandlestickProps {
  data: OhlcEntry[];
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  /** Color for bullish candles (close > open) */
  bullColor?: string;
  /** Color for bearish candles (close < open) */
  bearColor?: string;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Tooltip props ─────────────────────────────────────────────────── */

export interface ChartTooltipProps {
  /** Fully replace the tooltip — receives the current tooltip state */
  content?: (state: TooltipState) => React.ReactNode;
  /** Extra class on the tooltip wrapper */
  className?: string;
  /** Override background color */
  background?: string;
  /** Override border color */
  border?: string;
  /** Override border radius in px */
  borderRadius?: number;
  /** Override box shadow */
  boxShadow?: string;
  /** Override font size in px */
  fontSize?: number;
}

/* ─── Legend entry (public) ─────────────────────────────────────────── */

export interface ChartLegendEntry {
  name: string;
  color: string;
  dataKey: string;
}

/* ─── Legend props ──────────────────────────────────────────────────── */

export interface ChartLegendProps {
  /** Where to position the legend relative to the chart */
  position?: LegendPosition;
  /** Fully replace legend rendering */
  content?: (entries: ChartLegendEntry[]) => React.ReactNode;
  /** Render a single entry — wrap each item with custom JSX */
  renderEntry?: (entry: ChartLegendEntry, index: number) => React.ReactNode;
  /** Icon shape: 'square' (default) | 'circle' | 'line' */
  iconType?: 'square' | 'circle' | 'line';
  /** Icon size in px, default 12 */
  iconSize?: number;
  /** Extra class on the legend wrapper */
  className?: string;
}

/* ─── Internal context shapes ───────────────────────────────────────── */

export interface CartesianContextValue {
  data: Record<string, unknown>[];
  dimensions: ChartDimensions;
  xScale: (value: unknown) => number;
  yScale: (value: number) => number;
  yDomain: [number, number];
  xDomain: unknown[];
  xDataKey: string;
  isBand: boolean;
  bandWidth: number;
  palette: string[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  tooltip: TooltipState;
  setTooltip: (state: TooltipState) => void;
  seriesCount: number;
  registerSeries: (dataKey: string) => number;
  accessibilityMode: boolean;
}

export interface PieContextValue {
  data: Record<string, unknown>[];
  cx: number;
  cy: number;
  palette: string[];
  tooltip: TooltipState;
  setTooltip: (state: TooltipState) => void;
}

export interface RadarContextValue {
  data: Record<string, unknown>[];
  cx: number;
  cy: number;
  radius: number;
  angleKeys: string[];
  palette: string[];
}

/* ─── SparkLine props ───────────────────────────────────────────────── */

export interface ChartSparkLineProps {
  /** Array of numeric values */
  data: number[];
  /** 'line' or 'bar' sparkline */
  type?: 'line' | 'bar';
  /** SVG width */
  width?: number;
  /** SVG height */
  height?: number;
  /** Stroke / fill color */
  color?: string;
  /** Stroke width (line mode only) */
  strokeWidth?: number;
  /** Fill area under the line with a semi-transparent color */
  area?: boolean;
  /** Show a floating value label on hover (line mode only) */
  showTooltip?: boolean;
  /** Highlight the nearest data point with a dot on hover (line mode only) */
  showHighlight?: boolean;
  /** Fixed y-axis minimum (overrides auto-computed domain) */
  yMin?: number;
  /** Fixed y-axis maximum (overrides auto-computed domain) */
  yMax?: number;
  /** CSS class on the SVG element */
  className?: string;
}

/* ─── RangeBar props ────────────────────────────────────────────────── */

export interface ChartRangeBarProps {
  /** Data key for the low value */
  lowKey: string;
  /** Data key for the high value */
  highKey: string;
  /** Fill color */
  color?: string;
  /** Legend / tooltip label */
  name?: string;
  /** Corner radius */
  radius?: number;
  className?: string;
}

/* ─── ReferenceLine props ───────────────────────────────────────────── */

export interface ChartReferenceLineProps {
  /** Horizontal reference value (y) */
  y?: number;
  /** Vertical reference value (x) */
  x?: string | number;
  /** Label text */
  label?: string;
  /** Line stroke color */
  stroke?: string;
  /** Dash pattern */
  strokeDasharray?: string;
  className?: string;
}

/* ─── ReferenceArea props ───────────────────────────────────────────── */

export interface ChartReferenceAreaProps {
  /** Low y bound */
  y1?: number;
  /** High y bound */
  y2?: number;
  /** Left x bound */
  x1?: string | number;
  /** Right x bound */
  x2?: string | number;
  /** Fill color */
  fill?: string;
  /** Fill opacity */
  fillOpacity?: number;
  className?: string;
}

/* ─── RadialBarRoot + RadialBar props ───────────────────────────────── */

export interface ChartRadialBarRootProps {
  data: object[];
  width?: number;
  height?: number;
  /** Gap between bars in px */
  gap?: number;
  className?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

export interface ChartRadialBarProps {
  /** Data key for arc length values */
  dataKey: string;
  /** Key for slice labels */
  nameKey?: string;
  /** Color overrides */
  colors?: string[];
  /** Inner radius fraction of min(w,h)/2 */
  innerRadius?: number;
  /** Outer radius fraction of min(w,h)/2 */
  outerRadius?: number;
  /**
   * 'vertical' (default): radius encodes value
   * 'horizontal': angle sweeps encode value
   */
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

/* ─── Waterfall props ───────────────────────────────────────────────── */

export interface WaterfallEntry {
  name: string;
  value: number;
  color?: string;
}

export interface ChartWaterfallProps {
  data: WaterfallEntry[];
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Sankey props ──────────────────────────────────────────────────── */

export interface SankeyNode {
  id: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface ChartSankeyProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  width?: number;
  height?: number;
  nodePadding?: number;
  nodeWidth?: number;
  /** Node alignment strategy. Default: 'justify' */
  nodeAlignment?: 'left' | 'right' | 'justify' | 'center';
  /** Show value labels on links */
  showLinkValues?: boolean;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Pyramid props ─────────────────────────────────────────────────── */

export interface ChartPyramidProps {
  data: Array<{ name: string; value: number; color?: string }>;
  width?: number;
  height?: number;
  labelPosition?: LabelPosition;
  className?: string;
  accessibilityLabel?: string;
  onSegmentClick?: (entry: { name: string; value: number; color?: string }, index: number) => void;
}

/* ─── Gantt props ───────────────────────────────────────────────────── */

export interface GanttTask {
  id: string;
  name: string;
  start: number;
  end: number;
  color?: string;
  group?: string;
}

export interface ChartGanttProps {
  tasks: GanttTask[];
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── RadialLine props ──────────────────────────────────────────────── */

export interface ChartRadialLineRootProps {
  data: object[];
  width?: number;
  height?: number;
  className?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

export interface ChartRadialLineProps {
  dataKey: string;
  nameKey?: string;
  color?: string;
  curve?: CurveType;
  closePath?: boolean;
  area?: boolean;
  fillOpacity?: number;
  dot?: boolean;
  dotRadius?: number;
  strokeWidth?: number;
  className?: string;
}

/* ─── Histogram props ───────────────────────────────────────────────── */

export interface ChartHistogramProps {
  data: number[];
  bins?: number;
  color?: string;
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  showGrid?: boolean;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Boxplot props ─────────────────────────────────────────────────── */

export interface BoxplotEntry {
  name: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  color?: string;
  outliers?: number[];
}

export interface ChartBoxplotProps {
  data: BoxplotEntry[];
  width?: number;
  height?: number;
  margin?: Partial<ChartMargin>;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  accessibilityLabel?: string;
}

/* ─── Sunburst props ────────────────────────────────────────────────── */

export interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
  color?: string;
}

export interface ChartSunburstProps {
  data: SunburstNode;
  width?: number;
  height?: number;
  innerRadius?: number;
  className?: string;
  accessibilityLabel?: string;
  onNodeClick?: (node: SunburstNode) => void;
}

/* ─── Chord props ───────────────────────────────────────────────────── */

export interface ChartChordProps {
  data: number[][];
  labels: string[];
  colors?: string[];
  width?: number;
  height?: number;
  padAngle?: number;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── RangeArea props ───────────────────────────────────────────────── */

export interface ChartRangeAreaProps {
  lowKey: string;
  highKey: string;
  color?: string;
  name?: string;
  fillOpacity?: number;
  curve?: CurveType;
  className?: string;
}

/* ─── LinearGauge props ─────────────────────────────────────────────── */

export interface ChartLinearGaugeProps {
  value: number;
  min?: number;
  max?: number;
  width?: number;
  height?: number;
  thickness?: number;
  colorStops?: [number, string][];
  showLabel?: boolean;
  label?: string | ((v: number, min: number, max: number) => string);
  cornerRadius?: number;
  className?: string;
  accessibilityLabel?: string;
}

/* ─── PieCenterLabel props ──────────────────────────────────────────── */

export interface ChartPieCenterLabelProps {
  children: React.ReactNode;
  className?: string;
}

/* ─── GaugePointer props ────────────────────────────────────────────── */

export interface ChartGaugePointerProps {
  color?: string;
  length?: number;
  width?: number;
  className?: string;
}

/* ─── Enhanced RadialBar props (additions) ──────────────────────────── */
// layout and gap are added to the existing types via declaration merge below

/* ─── Enhanced Area props (fillByValue) — added to ChartAreaProps above */

/* ─── Enhanced SparkLine (yMin/yMax) — added to ChartSparkLineProps above */

/* ─── Enhanced Sankey (nodeAlignment/showLinkValues) — added to ChartSankeyProps above */
