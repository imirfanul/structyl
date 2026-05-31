'use client';

/**
 * @structyl/styled — Chart
 *
 * Tailwind-styled wrappers around the headless chart primitives.
 * Applies CSS variable–based color tokens and Tailwind classes.
 *
 * Chart colors rely on CSS variables --chart-1 through --chart-5 which
 * should be defined in your global stylesheet.
 *
 * NOTE: Requires `pnpm build` in packages/primitives before typechecking.
 *
 * @example
 * ```tsx
 * import * as Chart from '@structyl/styled';
 *
 * function MyChart() {
 *   return (
 *     <Chart.Chart.Root data={data} height={300}>
 *       <Chart.Chart.Grid />
 *       <Chart.Chart.XAxis dataKey="month" />
 *       <Chart.Chart.YAxis />
 *       <Chart.Chart.Bar dataKey="revenue" name="Revenue" />
 *       <Chart.Chart.Tooltip />
 *     </Chart.Chart.Root>
 *   );
 * }
 * ```
 */

import * as React from 'react';
import { cn } from '@structyl/utils';
// Chart components are imported from the primitives package.
// Run `pnpm build` in packages/primitives to generate the dist before typechecking this file.
import * as Primitives from '@structyl/primitives';

// The Chart namespace is re-exported from primitives as `export * as Chart from './chart'`
type ChartNS = typeof Primitives.Chart;

/* ─── Pass-through components (SVG children; no styling needed) ──────── */
// These are SVG group elements that use context from Root — styling is minimal
export const Grid: ChartNS['Grid'] = Primitives.Chart.Grid;
export const XAxis: ChartNS['XAxis'] = Primitives.Chart.XAxis;
export const YAxis: ChartNS['YAxis'] = Primitives.Chart.YAxis;
export const Bar: ChartNS['Bar'] = Primitives.Chart.Bar;
export const Line: ChartNS['Line'] = Primitives.Chart.Line;
export const Area: ChartNS['Area'] = Primitives.Chart.Area;
export const Scatter: ChartNS['Scatter'] = Primitives.Chart.Scatter;
export const Bubble: ChartNS['Bubble'] = Primitives.Chart.Bubble;
export const Pie: ChartNS['Pie'] = Primitives.Chart.Pie;
export const PieCenterLabel: ChartNS['PieCenterLabel'] = Primitives.Chart.PieCenterLabel;
export const PolarGrid: ChartNS['PolarGrid'] = Primitives.Chart.PolarGrid;
export const PolarAngleAxis: ChartNS['PolarAngleAxis'] = Primitives.Chart.PolarAngleAxis;
export const Radar: ChartNS['Radar'] = Primitives.Chart.Radar;
export const RangeBar: ChartNS['RangeBar'] = Primitives.Chart.RangeBar;
export const RangeArea: ChartNS['RangeArea'] = Primitives.Chart.RangeArea;
export const ReferenceLine: ChartNS['ReferenceLine'] = Primitives.Chart.ReferenceLine;
export const ReferenceArea: ChartNS['ReferenceArea'] = Primitives.Chart.ReferenceArea;
export const RadialBar: ChartNS['RadialBar'] = Primitives.Chart.RadialBar;
export const RadialLine: ChartNS['RadialLine'] = Primitives.Chart.RadialLine;
// Gauge composition components
export const GaugeValueArc: ChartNS['GaugeValueArc'] = Primitives.Chart.GaugeValueArc;
export const GaugeReferenceArc: ChartNS['GaugeReferenceArc'] = Primitives.Chart.GaugeReferenceArc;
export const GaugePointer: ChartNS['GaugePointer'] = Primitives.Chart.GaugePointer;

/* ─── Root (cartesian) ──────────────────────────────────────────────── */

export interface StyledChartRootProps extends Primitives.ChartRootProps {
  /** Additional class name on the outer wrapper div */
  wrapperClassName?: string;
}

const Root = React.forwardRef<HTMLDivElement, StyledChartRootProps>(
  ({ className, wrapperClassName, ...props }, ref) => (
    <Primitives.Chart.Root
      ref={ref}
      className={cn('text-foreground', wrapperClassName, className)}
      {...props}
    />
  ),
);
Root.displayName = 'Chart.Root';

/* ─── PieRoot ───────────────────────────────────────────────────────── */

const PieRoot = React.forwardRef<HTMLDivElement, Primitives.ChartPieRootProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.PieRoot
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
PieRoot.displayName = 'Chart.PieRoot';

/* ─── RadarRoot ─────────────────────────────────────────────────────── */

const RadarRoot = React.forwardRef<HTMLDivElement, Primitives.ChartRadarRootProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.RadarRoot
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
RadarRoot.displayName = 'Chart.RadarRoot';

/* ─── Tooltip — styled with Tailwind ───────────────────────────────── */

export interface StyledTooltipProps extends Primitives.ChartTooltipProps {
  /** Additional class on the tooltip card */
  boxClassName?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, StyledTooltipProps>(
  ({ className, boxClassName, content, ...props }, ref) => {
    const defaultContent = (state: Primitives.TooltipState) => (
      <div
        className={cn(
          'border-border bg-popover text-popover-foreground shadow-overlay',
          'z-50 min-w-[120px] rounded-xl border p-3 text-xs',
          boxClassName,
        )}
      >
        {state.label && (
          <p className="mb-1.5 font-semibold text-foreground/80">{state.label}</p>
        )}
        {state.payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {typeof entry.value === 'number'
                ? entry.value.toLocaleString()
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );

    return (
      <Primitives.Chart.Tooltip
        ref={ref}
        content={content ?? defaultContent}
        className={cn('pointer-events-none', className)}
        {...props}
      />
    );
  },
);
Tooltip.displayName = 'Chart.Tooltip';

/* ─── Legend ────────────────────────────────────────────────────────── */

const Legend = React.forwardRef<HTMLDivElement, Primitives.ChartLegendProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Legend
      ref={ref}
      className={cn(
        'flex flex-wrap items-center justify-center gap-3 py-2 text-xs text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);
Legend.displayName = 'Chart.Legend';

/* ─── Heatmap ───────────────────────────────────────────────────────── */

const Heatmap = React.forwardRef<HTMLDivElement, Primitives.ChartHeatmapProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Heatmap
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Heatmap.displayName = 'Chart.Heatmap';

/* ─── Treemap ───────────────────────────────────────────────────────── */

const Treemap = React.forwardRef<HTMLDivElement, Primitives.ChartTreemapProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Treemap
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Treemap.displayName = 'Chart.Treemap';

/* ─── Funnel ────────────────────────────────────────────────────────── */

const Funnel = React.forwardRef<HTMLDivElement, Primitives.ChartFunnelProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Funnel
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Funnel.displayName = 'Chart.Funnel';

/* ─── Gauge ─────────────────────────────────────────────────────────── */

const Gauge = React.forwardRef<HTMLDivElement, Primitives.ChartGaugeProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Gauge
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Gauge.displayName = 'Chart.Gauge';

/* ─── GaugeContainer ────────────────────────────────────────────────── */

const GaugeContainer = React.forwardRef<HTMLDivElement, Primitives.ChartGaugeContainerProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.GaugeContainer
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
GaugeContainer.displayName = 'Chart.GaugeContainer';

/* ─── Candlestick ───────────────────────────────────────────────────── */

const Candlestick = React.forwardRef<HTMLDivElement, Primitives.ChartCandlestickProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Candlestick
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Candlestick.displayName = 'Chart.Candlestick';

/* ─── SparkLine ─────────────────────────────────────────────────────── */

const SparkLine = React.forwardRef<SVGSVGElement, Primitives.ChartSparkLineProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.SparkLine ref={ref} className={cn('text-foreground', className)} {...props} />
  ),
);
SparkLine.displayName = 'Chart.SparkLine';

/* ─── RadialBarRoot ─────────────────────────────────────────────────── */

const RadialBarRoot = React.forwardRef<HTMLDivElement, Primitives.ChartRadialBarRootProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.RadialBarRoot
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
RadialBarRoot.displayName = 'Chart.RadialBarRoot';

/* ─── Waterfall ─────────────────────────────────────────────────────── */

const Waterfall = React.forwardRef<HTMLDivElement, Primitives.ChartWaterfallProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Waterfall
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Waterfall.displayName = 'Chart.Waterfall';

/* ─── Sankey ────────────────────────────────────────────────────────── */

const Sankey = React.forwardRef<HTMLDivElement, Primitives.ChartSankeyProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Sankey
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Sankey.displayName = 'Chart.Sankey';

/* ─── Pyramid ───────────────────────────────────────────────────────── */

const Pyramid = React.forwardRef<HTMLDivElement, Primitives.ChartPyramidProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Pyramid
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Pyramid.displayName = 'Chart.Pyramid';

/* ─── Gantt ─────────────────────────────────────────────────────────── */

const Gantt = React.forwardRef<HTMLDivElement, Primitives.ChartGanttProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Gantt
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Gantt.displayName = 'Chart.Gantt';

/* ─── RadialLineRoot ─────────────────────────────────────────────────── */

const RadialLineRoot = React.forwardRef<HTMLDivElement, Primitives.ChartRadialLineRootProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.RadialLineRoot
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
RadialLineRoot.displayName = 'Chart.RadialLineRoot';

/* ─── Histogram ─────────────────────────────────────────────────────── */

const Histogram = React.forwardRef<HTMLDivElement, Primitives.ChartHistogramProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Histogram
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Histogram.displayName = 'Chart.Histogram';

/* ─── Boxplot ───────────────────────────────────────────────────────── */

const Boxplot = React.forwardRef<HTMLDivElement, Primitives.ChartBoxplotProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Boxplot
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Boxplot.displayName = 'Chart.Boxplot';

/* ─── Sunburst ──────────────────────────────────────────────────────── */

const Sunburst = React.forwardRef<HTMLDivElement, Primitives.ChartSunburstProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Sunburst
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Sunburst.displayName = 'Chart.Sunburst';

/* ─── Chord ─────────────────────────────────────────────────────────── */

const Chord = React.forwardRef<HTMLDivElement, Primitives.ChartChordProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.Chord
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
Chord.displayName = 'Chart.Chord';

/* ─── LinearGauge ───────────────────────────────────────────────────── */

const LinearGauge = React.forwardRef<HTMLDivElement, Primitives.ChartLinearGaugeProps>(
  ({ className, ...props }, ref) => (
    <Primitives.Chart.LinearGauge
      ref={ref}
      className={cn('text-foreground', className)}
      {...props}
    />
  ),
);
LinearGauge.displayName = 'Chart.LinearGauge';

/* ─── Named component exports ───────────────────────────────────────── */
export {
  Root,
  PieRoot,
  RadarRoot,
  Tooltip,
  Legend,
  Heatmap,
  Treemap,
  Funnel,
  Gauge,
  GaugeContainer,
  Candlestick,
  SparkLine,
  RadialBarRoot,
  RadialLineRoot,
  Waterfall,
  Sankey,
  Pyramid,
  Gantt,
  Histogram,
  Boxplot,
  Sunburst,
  Chord,
  LinearGauge,
};

/* ─── Type re-exports ───────────────────────────────────────────────── */
export type {
  ChartRootProps,
  ChartPieRootProps,
  ChartRadarRootProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartGridProps,
  ChartBarProps,
  ChartLineProps,
  ChartAreaProps,
  ChartScatterProps,
  ChartBubbleProps,
  ChartPieProps,
  ChartPieCenterLabelProps,
  ChartPolarGridProps,
  ChartPolarAngleAxisProps,
  ChartRadarProps,
  ChartHeatmapProps,
  ChartTreemapProps,
  ChartFunnelProps,
  ChartGaugeProps,
  ChartGaugeContainerProps,
  ChartGaugeValueArcProps,
  ChartGaugeReferenceArcProps,
  ChartGaugePointerProps,
  GaugeContextValue,
  ChartCandlestickProps,
  ChartTooltipProps,
  ChartLegendProps,
  HighlightScope,
  MarkShape,
  ScatterMarkerShape,
  TooltipState,
  ChartSparkLineProps,
  ChartRangeBarProps,
  ChartRangeAreaProps,
  ChartReferenceLineProps,
  ChartReferenceAreaProps,
  ChartRadialBarRootProps,
  ChartRadialBarProps,
  ChartRadialLineRootProps,
  ChartRadialLineProps,
  ChartWaterfallProps,
  ChartSankeyProps,
  ChartPyramidProps,
  ChartGanttProps,
  ChartHistogramProps,
  ChartBoxplotProps,
  BoxplotEntry,
  ChartSunburstProps,
  SunburstNode,
  ChartChordProps,
  ChartLinearGaugeProps,
  WaterfallEntry,
  SankeyNode,
  SankeyLink,
  GanttTask,
} from '@structyl/primitives';
